import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/common/database/mongoose/identifiable-entity.schema';
import { PersonalDocumentType } from 'src/kyc/domain/enums/kyc-attachment-type.enum';

@Schema()
export class PersonAttachment extends IdentifiableEntitySchema {
  @Prop({
    require: true,
    enum: Object.values(PersonalDocumentType),
  })
  documentTitle: PersonalDocumentType;

  @Prop({ required: true, type: String })
  fileUrl: string;
}

export const PersonAttachmentSchema =
  SchemaFactory.createForClass(PersonAttachment);
