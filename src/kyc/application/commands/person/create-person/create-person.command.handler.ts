import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { StoreBase64File } from 'src/common/utils/store-base64-file';
import { BirthRegistrationExistException } from 'src/kyc/application/exceptions/birth-registration-exist.exception';
import { MobileExistException } from 'src/kyc/application/exceptions/mobile-number-exist.exception';
import { NIDExistException } from 'src/kyc/application/exceptions/nid-exist.exception';
import { PeoplesRepository } from 'src/kyc/infrastructure/repositories/peoples.repository';
import { PersonAggregate } from '../../../../domain/models/person/person.aggregate';
import { CreatePersonCommand } from './create-person.command';
@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler
  implements ICommandHandler<CreatePersonCommand>
{
  constructor(private peoplesRepository: PeoplesRepository) {}

  async execute(command: CreatePersonCommand): Promise<PersonAggregate> {
    const personId = new Types.ObjectId().toHexString();
    const identificationNumber = String(Date.now());

    let fileUrl: string = '';
    if (command?.photo) {
      fileUrl = StoreBase64File.store(
        'persons/photo',
        identificationNumber,
        command.photo.fileExtension,
        command.photo.base64Document,
      );
    }

    const personModel = new PersonAggregate({
      ...command,
      personId: personId,
      identificationNumber: identificationNumber,
      photo: fileUrl,
    });

    // [ ] Check if NID already exist.
    if (personModel.nid) {
      const personWithNID = await this.peoplesRepository.findByNID(
        personModel.nid,
      );
      if (personWithNID) {
        throw new NIDExistException();
      }
    }
    // [ ] Check if birth registration number already exist.
    if (personModel.birthRegistrationNumber) {
      const personWithBNR = await this.peoplesRepository.findByBNR(
        personModel.birthRegistrationNumber,
      );
      if (personWithBNR) {
        throw new BirthRegistrationExistException();
      }
    }
    // [ ] Check if mobile number already exist.
    if (personModel.mobileNumber) {
      const personWithMobileNumber =
        await this.peoplesRepository.findByMobileNumber(
          personModel.mobileNumber,
        );
      if (personWithMobileNumber) {
        throw new MobileExistException();
      }
    }
    // [ ] Check if email already exist.
    if (personModel.email) {
      const personWithEmail = await this.peoplesRepository.findByEmail(
        personModel.email,
      );
      if (personWithEmail) {
        throw new HttpException(
          'Person with the same email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const personModelRes = this.peoplesRepository.createPerson(personModel);
    return personModelRes;
  }
}
