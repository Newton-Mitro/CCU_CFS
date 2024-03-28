import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/common/database/mongoose/identifiable-entity.schema';
import { Address, AddressSchema } from './address.schema';

@Schema({
  discriminatorKey: 'CustomerType',
  collection: 'Customers',
  versionKey: false,
})
export class Customer extends IdentifiableEntitySchema {
  @Prop({
    require: true,
    unique: true,
    minLength: 6,
    maxLength: 13,
    trim: true,
  })
  identificationNumber: string;

  @Prop({ require: true, trim: true })
  nameEn: string;

  @Prop({ default: null })
  nameBn: string;

  @Prop({ trim: true })
  email: string;

  @Prop()
  contactNumber: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  mobileNumber: string;

  @Prop({
    type: Array(AddressSchema),
  })
  addresses: Address[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export type CustomerDocument = Customer & Document;
// export type CustomerDocument = HydratedDocument<Customer>;
export const CUSTOMER_MODEL = Customer.name;
