import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/config/database/mongoose/identifiable-entity.schema';

@Schema()
export class EmploymentHistory extends IdentifiableEntitySchema {
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
  Salary: number;

  @Prop({ require: true })
  StartDate: string;

  @Prop()
  EndDate: string;

  @Prop()
  TillNow: boolean;
}

export const EmploymentHistorySchema =
  SchemaFactory.createForClass(EmploymentHistory);
