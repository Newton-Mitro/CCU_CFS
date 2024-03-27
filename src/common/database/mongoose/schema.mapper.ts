import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface ISchemaMapper<
  TSchema extends IdentifiableEntitySchema,
  TModel extends AggregateRoot,
> {
  mapBusinessModelToSchema(model: TModel): TSchema;
}
