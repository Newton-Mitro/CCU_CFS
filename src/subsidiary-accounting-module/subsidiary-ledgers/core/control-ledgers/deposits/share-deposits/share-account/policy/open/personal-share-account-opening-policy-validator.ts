import { BadRequestException } from '@nestjs/common';
import { CustomerType } from 'src/subsidiary-accounting-module/kyc/core/enum/customer-type.enum';
import { Religion } from 'src/subsidiary-accounting-module/kyc/core/enum/religion.enum';
import { AccountType } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/enum/account-type.enum';
import { Branch } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/enum/branch.enum';
import { ControlLedger } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/enum/control-ledger';
import { CustomerSubstitute } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/enum/customer-substitute.enum';
import { IPolicyValidator } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/interface/policy-validators/policy-validator.interface';
import { BaseCustomerModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/base-customer.model';
import { CollateralModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/collateral.model';
import { HumanCustomerModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/human-customer.model';
import { IntroducerModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/introducer.model';
import { NomineeModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/nominee.model';
import { OperatorModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/operator.model';
import { ScheduleModel } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/model/schedule.model';
import { CustomerPolicy } from 'src/subsidiary-accounting-module/subsidiary-ledgers/core/policy/human-customer-policy';

export class PersonalShareAccountOpeningPolicyValidator
  implements IPolicyValidator
{
  private anyService?: any;

  constructor(anyService?: any) {
    this.anyService = anyService;
  }

  public ValidatePolicy(
    accountType: AccountType,
    controlLedger: ControlLedger,
    accountName: string,
    branch: Branch,
    holders: BaseCustomerModel[],
    operators: OperatorModel[],
    interestRate?: number,
    duration?: number,
    protectionSchemePercent?: number,
    openingAmount?: number,
    installmentAmount?: number,
    numberOfInstallment?: number,
    stock?: number,
    nominees?: NomineeModel[],
    introducers?: IntroducerModel[],
    collaterals?: CollateralModel[],
    schedules?: ScheduleModel[],
  ) {
    // [ ] 01. At least two introducer needed.
    if (introducers.length < 2) {
      throw new BadRequestException('At least two introducer needed.');
    }

    introducers.forEach((introducer) => {
      // [ ] 02. Introducer need to be a person.
      CustomerPolicy.CustomerTypeCheck(
        introducer,
        CustomerType.Person,
        CustomerSubstitute.AccountIntroducer,
      );

      if (introducer instanceof HumanCustomerModel) {
        // [ ] 03. Introducer need to be christian?
        CustomerPolicy.ReligionCheck(
          introducer,
          Religion.Christian,
          CustomerSubstitute.AccountIntroducer,
        );

        // [ ] 04. Introducer must provide NID or BRN number.
        CustomerPolicy.NIDandBRNCheck(
          introducer,
          CustomerSubstitute.AccountIntroducer,
        );

        // [ ] 05. Introducer need to be a saving account holder
        CustomerPolicy.HasSavingAccountCheck(
          introducer,
          this.anyService,
          CustomerSubstitute.AccountIntroducer,
        );
      }
    });

    // [ ] 06. An account holder needed.
    if (holders.length !== 1) {
      throw new BadRequestException('An account holder needed.');
    }

    holders.forEach((holder) => {
      // [ ] 07. Account holder must be a person.
      CustomerPolicy.CustomerTypeCheck(
        holder,
        CustomerType.Person,
        CustomerSubstitute.AccountHolder,
      );

      if (holder instanceof HumanCustomerModel) {
        // [ ] 08. Account holder must be christian.
        CustomerPolicy.ReligionCheck(
          holder,
          Religion.Christian,
          CustomerSubstitute.AccountHolder,
        );

        // [ ] 09. Account holder date of birth, NID or BNR number needed and age must be greater or equal to eighteen?
        CustomerPolicy.AgeCheck(holder, 18, CustomerSubstitute.AccountHolder);

        // [ ] 10. Account holder need to be a saving account holder
        CustomerPolicy.HasSavingAccountCheck(
          holder,
          this.anyService,
          CustomerSubstitute.AccountHolder,
        );
      }
    });

    // [ ] 11. An operator needed.
    if (operators.length !== 1) {
      throw new BadRequestException('An operator needed.');
    }

    operators.forEach((operator) => {
      // [ ] 12. Only selected account holder can be account operator.
      if (
        !holders.some(
          (holder) =>
            operator.IdentificationNumber === holder.IdentificationNumber,
        )
      ) {
        throw new BadRequestException(
          'Only selected account holder can be account operator.',
        );
      }

      // [ ] 13. Account operator need to be a person.
      CustomerPolicy.CustomerTypeCheck(
        operator,
        CustomerType.Person,
        CustomerSubstitute.AccountOperator,
      );

      if (operator instanceof HumanCustomerModel) {
        // [ ] 14. Account operator must be christian
        CustomerPolicy.ReligionCheck(
          operator,
          Religion.Christian,
          CustomerSubstitute.AccountOperator,
        );

        // [ ] 15. Account operator date of birth, NID or BNR number needed and age must be greater or equal to eighteen?
        CustomerPolicy.AgeCheck(
          operator,
          18,
          CustomerSubstitute.AccountOperator,
        );
      }
    });

    // [ ] 16. At least one nominee needed
    if (nominees.length < 1) {
      throw new BadRequestException('At least one nominee needed.');
    }

    // [ ] 17. Nominees total percent need to be equal to 100%
    CustomerPolicy.NomineesPercentCheck(
      nominees,
      CustomerSubstitute.AccountNominee,
    );
  }
}
