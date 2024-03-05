import { Relationship } from 'src/kyc/core/enum/relationship.enum';
import { HumanCustomerModel } from './human-customer.model';

export class NomineeModel extends HumanCustomerModel {
  Relationship: Relationship;
  Percent: number;
}
