import { Types } from 'mongoose';
import { SuccessLogRecordModel } from 'src/logging/domain/models/success-log-record.entity';
import { SuccessLogRecord } from '../schemas/success-log-record.schema';
import { ModelSchemaFactory } from 'src/config/database/mongoose/entity-schema.factory';

export class MapSuccessLogRecordFactory
  implements ModelSchemaFactory<SuccessLogRecord, SuccessLogRecordModel>
{
  create(entity: SuccessLogRecordModel): SuccessLogRecord {
    return {
      _id: new Types.ObjectId(),
      User: entity.User,
      UserAgent: entity.UserAgent,
      ReceivedAt: entity.ReceivedAt,
      IP: entity.IP,
      RequestMethod: entity.RequestMethod,
      Path: entity.Path,
      RequestQuery: entity.RequestQuery,
      RequestBody: entity.RequestBody,
      StatusCode: entity.StatusCode,
      RequestedAt: entity.RequestedAt,
      ResponseTime: entity.ResponseTime,
    };
  }

  createFromSchema(entitySchema: SuccessLogRecord): SuccessLogRecordModel {
    return new SuccessLogRecordModel(
      entitySchema._id.toHexString(),
      entitySchema.User,
      entitySchema.UserAgent,
      entitySchema.ReceivedAt,
      entitySchema.IP,
      entitySchema.RequestMethod,
      entitySchema.Path,
      entitySchema.RequestQuery,
      entitySchema.RequestBody,
      entitySchema.StatusCode,
      entitySchema.RequestedAt,
      entitySchema.ResponseTime,
    );
  }
}
