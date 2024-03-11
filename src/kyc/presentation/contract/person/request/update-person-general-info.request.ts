import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonRequest } from './create-person/create-person.request';

export class UpdatePeopleRequest extends PartialType(CreatePersonRequest) {}