import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CUSTOMER_MODEL,
  CustomerDocument,
} from '../infrastructure/schema/customer.schema';
import { FindAllQueryDTO } from '../presentation/contract/find-all-query.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(CUSTOMER_MODEL)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async search(searchText: string, findAllQueryDto: FindAllQueryDTO) {
    // {
    //   $and: [
    //     { $or: [{ nameEn: regex }, { description: regex }] },
    //     { category: value.category },
    //     { city: value.city },
    //   ],
    // }

    const { order_by, limit, page, sort_by } = findAllQueryDto;
    const regex = new RegExp(searchText, 'i');
    const customers = await this.customerModel
      .find({
        $or: [
          { nameEn: regex },
          { identificationNumber: regex },
          { nid: regex },
          { birthRegistrationNumber: regex },
        ],
      })
      .select([
        '_id',
        'identificationNumber',
        'nameEn',
        'nameBn',
        'registeredEmail',
        'alternateEmail',
        'registeredMobile',
        'alternateContactNumber',
        'emergencyContactNumber',
        'dateOfBirth',
        'nid',
        'birthRegistrationNumber',
        'bloodGroup',
        'gender',
        'religion',
        'profession',
        'maritalStatus',
        'customerType',
      ])
      .sort({ [sort_by]: order_by })
      .limit(limit)
      .skip(limit * (page - 1));

    return customers;
  }

  async findAll(findAllQueryDto: FindAllQueryDTO) {
    const { order_by, limit, page, sort_by } = findAllQueryDto;

    const customers = await this.customerModel
      .find()
      .select([
        '_id',
        'identificationNumber',
        'nameEn',
        'nameBn',
        'registeredEmail',
        'alternateEmail',
        'registeredMobile',
        'alternateContactNumber',
        'emergencyContactNumber',
        'dateOfBirth',
        'nid',
        'birthRegistrationNumber',
        'bloodGroup',
        'gender',
        'religion',
        'profession',
        'maritalStatus',
        'customerType',
      ])
      .sort({ [sort_by]: order_by })
      .limit(limit)
      .skip(limit * (page - 1));
    return customers;
  }

  async findOne(id: string) {
    const existingCustomer = await this.customerModel.findById(id);
    if (!existingCustomer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return existingCustomer;
  }

  async remove(id: string) {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id);
    if (!deletedCustomer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return deletedCustomer;
  }
}
