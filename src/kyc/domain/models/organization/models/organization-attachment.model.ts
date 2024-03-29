import { OrganizationalDocumentType } from 'src/kyc/domain/enums/kyc-attachment-type.enum';

export type OrganizationAttachmentProps = {
  attachmentId: string;
  documentTitle: OrganizationalDocumentType;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
};

export class OrganizationAttachmentModel {
  readonly attachmentId: string;
  readonly documentTitle: OrganizationalDocumentType;
  readonly fileUrl: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: string;
  readonly updatedBy: string;

  constructor(organizationAttachmentProps: OrganizationAttachmentProps) {
    this.attachmentId = organizationAttachmentProps.attachmentId;
    this.documentTitle = organizationAttachmentProps.documentTitle;
    this.fileUrl = organizationAttachmentProps.fileUrl;
    this.createdAt = organizationAttachmentProps.createdAt;
    this.updatedAt = organizationAttachmentProps.updatedAt;
    this.createdBy = organizationAttachmentProps.createdBy;
    this.updatedBy = organizationAttachmentProps.updatedBy;
  }
}
