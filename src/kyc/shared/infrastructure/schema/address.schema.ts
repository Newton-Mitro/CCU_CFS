import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressType } from 'src/common/enums/address-type.enum';
import { Country } from 'src/common/enums/country.enum';
import { IdentifiableEntitySchema } from '../../../../common/schemas/identifiable-entity.schema';

@Schema()
export class Address extends IdentifiableEntitySchema {
  @Prop({
    type: String,
    enum: Object.values(AddressType),
    default: AddressType.PERMANENT_ADDRESS,
  })
  addressType: AddressType;

  @Prop({ require: true })
  addressLineOne: string;

  @Prop()
  addressLineTwo: string;

  @Prop({
    type: String,
    enum: Object.values(Country),
    default: Country.BANGLADESH,
  })
  country: Country;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  division: string;

  @Prop()
  district: string;

  @Prop()
  subDistrict: string;

  @Prop()
  zipCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
