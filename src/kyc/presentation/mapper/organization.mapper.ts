import { CreateOrganizationCommand } from 'src/kyc/application/commands/organization/create-organization/create-organization.command';
import { CreateOrganizationRequest } from '../contract/organization/request/create-organization.request';

export class PersonMapper {
  getCreateOrganizationDTO(
    createOrganizationCommand: CreateOrganizationCommand,
  ) {}
  getCreateOrganizationCommand(
    createOrganizationDTO: CreateOrganizationRequest,
  ) {}
}
