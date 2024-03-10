import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BankAccount {
  @Prop({ require: true })
  BankName: string;

  @Prop({ require: true })
  Branch: string;

  @Prop()
  RoutingNumber: string;

  @Prop({ require: true })
  AccountNumber: string;

  @Prop()
  AccountName: string;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
