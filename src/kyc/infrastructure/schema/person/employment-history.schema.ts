import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmploymentHistory {
  @Prop({ require: true })
  OrganizationName: string;

  @Prop({ require: true })
  Position: string;

  @Prop({ require: true })
  Address: string;

  @Prop({ require: true })
  SupervisorName: string;

  @Prop({ require: true })
  SupervisorDesignation: string;

  @Prop({ require: true })
  SupervisorPhone: string;

  @Prop()
  JobResponsibilities: string;

  @Prop()
  Salary: string;

  @Prop({ require: true })
  StartDate: string;

  @Prop()
  EndDate: string;

  @Prop()
  TillNow: string;
}

export const EmploymentHistorySchema =
  SchemaFactory.createForClass(EmploymentHistory);
