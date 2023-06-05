import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { ID } from 'src/app/types/ID';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(username: string, password: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }

  async createPatientUser(
    patientId: ID,
    username: string,
    password: string,
  ): Promise<User> {
    return this.userModel.create({
      patientId: new Types.ObjectId(patientId),
      type: 'PATIENT',
      username,
      password,
    });
  }
  async createDoctorUser(
    doctorId: ID,
    username: string,
    password: string,
  ): Promise<User> {
    return this.userModel.create({
      doctorId: new Types.ObjectId(doctorId),
      type: 'DOCTOR',
      username,
      password,
    });
  }
  async findOnePublic(ID: string): Promise<User> {
    return this.userModel.findOne(
      { _id: ID },
      {
        password: 0,
        otp: 0,
      },
    );
  }
  async createUserFromSSO(data: {
    username: string;
    password: string;
    ssoId: string;
    ssoEmail: string;
    fullName: string;
  }): Promise<User> {
    return this.userModel.create(data);
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
