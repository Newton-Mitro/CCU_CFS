import { OrganizationalDocumentType } from 'src/kyc/domain/enums/kyc-attachment-type.enum';

export class OrganizationAttachmentDTO {
  constructor(
    readonly attachment_id: string,
    readonly document_title: OrganizationalDocumentType,
    readonly file_url: string,
    readonly created_at: string,
    readonly updated_at: string,
    readonly created_by: string,
    readonly updated_by: string,
  ) {}
}
