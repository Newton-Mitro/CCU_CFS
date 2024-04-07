import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from '../enums/account-type.enum';

export class SubLedgerProps {
  accountId: string;
  accountType: AccountType;
  controlLedger: string;
  accountNumber: string;
  accountName: string;
  branch: string;
  openingDate: string;
  closingDate: string;
  accountStatus: AccountStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
