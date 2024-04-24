import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AddressType } from '../../../../../common/domain/enums/address-type.enum';
import { Country } from '../../../../../common/domain/enums/country.enum';

export class CreateAddressRequest {
  @IsString()
  @IsNotEmpty()
  person_or_organization_id: string;

  @IsEnum(AddressType)
  @IsNotEmpty()
  address_type: AddressType;

  @IsString()
  @IsNotEmpty()
  address_line_one: string;

  @IsString()
  address_line_two: string;

  @IsEnum(Country)
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  division: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  sub_district: string;

  @IsString()
  @IsOptional()
  zip_code: string;
}
