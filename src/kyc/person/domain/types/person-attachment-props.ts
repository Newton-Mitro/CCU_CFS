import { AuthUserType } from '../../../../common/types/auth-user.type';
import { PersonalDocumentType } from '../../../shared/domain/enums/kyc-attachment-type.enum';

export type PersonAttachmentProps = {
  attachmentId: string;
  documentTitle: PersonalDocumentType;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: AuthUserType | null;
  updatedBy: AuthUserType | null;
};
