import { v4 as uuidv4 } from 'uuid';
import { CollateralStatus } from '../../../../shared/domain/enums/collateral-status.enum';
import { CollateralType } from '../../../../shared/domain/enums/collateral-type.enum';

export class CollateralModel {
  Id: string = uuidv4();
  CollateralType: CollateralType;
  CollateralTakenFromAccount: string;
  CollateralGivenToAccount: string;
  CollateralAmount: number;
  CollateralStatus: CollateralStatus;
}
