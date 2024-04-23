import { Relationship } from 'src/common/enums/relationship.enum';
import { CustomerType } from '../../../../../common/enums/customer-type.enum';
import { Gender } from '../../../../../common/enums/gender.enum';
import { MaritalStatus } from '../../../../../common/enums/marital-status.enum';
import { Profession } from '../../../../../common/enums/profession.enum';
import { Religion } from '../../../../../common/enums/religion.enum';
import { AuthUserType } from '../../../../../common/types/auth-user.type';
import { IHumanCustomer } from './human-customer.interface';

export class NomineeModel implements IHumanCustomer {
  nomineeId: string;
  identificationNumber: string;
  nameEn: string;
  nameBn: string;
  email: string;
  contactNumber: string;
  mobileNumber: string;
  phoneNumber: string;
  customerType: CustomerType;
  dateOfBirth: string;
  nid: string;
  birthRegistrationNumber: string;
  gender: Gender;
  religion: Religion;
  profession: Profession;
  maritalStatus: MaritalStatus;
  relationship: Relationship;
  percent: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: AuthUserType | null;
  updatedBy: AuthUserType | null;
}
