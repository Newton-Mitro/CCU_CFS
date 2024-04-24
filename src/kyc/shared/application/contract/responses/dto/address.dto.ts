import { AddressType } from '../../../../../../common/domain/enums/address-type.enum';
import { Country } from '../../../../../../common/domain/enums/country.enum';
import { AuthUserType } from '../../../../../../common/domain/types/auth-user.type';

export class AddressDTO {
  constructor(
    readonly addressId: string,
    readonly addressType: AddressType,
    readonly addressLineOne: string,
    readonly addressLineTwo: string,
    readonly country: Country,
    readonly state: string,
    readonly city: string,
    readonly division: string,
    readonly district: string,
    readonly subDistrict: string,
    readonly zipCode: string,
    readonly created_at: string,
    readonly updated_at: string,
    readonly created_by: AuthUserType | null,
    readonly updated_by: AuthUserType | null,
  ) {}
}
