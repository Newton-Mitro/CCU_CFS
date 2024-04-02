import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { StoreBase64File } from 'src/common/utils/store-base64-file';
import { PeoplesRepository } from 'src/kyc/infrastructure/repositories/peoples.repository';
import { PersonAggregate } from '../../../../domain/models/person/person.aggregate';
import { UpdatePersonCommand } from './update-person.command';
@CommandHandler(UpdatePersonCommand)
export class UpdatePersonHandler
  implements ICommandHandler<UpdatePersonCommand>
{
  constructor(
    private peoplesRepository: PeoplesRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdatePersonCommand): Promise<PersonAggregate> {
    const person = await this.peoplesRepository.findById(command.personId);

    let fileUrl: string = '';
    let personModel: PersonAggregate;

    if (person) {
      this.publisher.mergeObjectContext(person);
      if (command.photo) {
        fileUrl = StoreBase64File.store(
          'persons/photo',
          person.identificationNumber,
          command.photo.fileExtension,
          command.photo.base64Document,
        );
      }

      if (fileUrl) {
        person.updatePerson({
          ...command,
          customerType: 'Person',
          personId: person.personId,
          nid: person.nid,
          mobileNumber: person.mobileNumber,
          email: person.email,
          birthRegistrationNumber: person.birthRegistrationNumber,
          identificationNumber: person.identificationNumber,
          photo: fileUrl,
        });
      } else {
        person.updatePerson({
          ...command,
          personId: person.personId,
          nid: person.nid,
          mobileNumber: person.mobileNumber,
          email: person.email,
          birthRegistrationNumber: person.birthRegistrationNumber,
          identificationNumber: person.identificationNumber,
          photo: person.photo,
          customerType: 'Person',
        });
      }

      const personModelRes = await this.peoplesRepository.findOneAndReplace(
        person.personId,
        person,
      );
      person.commit();
      return personModelRes;
    }

    throw new HttpException('Person not found', HttpStatus.BAD_REQUEST);
  }
}
