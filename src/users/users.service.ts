import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import  * as bcrypt  from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) : Promise<User> {
    const { email, password, ...detailsUserDto } = createUserDto;
    const newUser = new this.userModel({
      ...detailsUserDto,
      email,
      password: await bcrypt.hash(password, 10)
    });
    
    const existUser = await this.userModel.findOne({ email }).exec();
    if(existUser) {
      throw new HttpException('El correo electrónico ya está registrado', HttpStatus.BAD_REQUEST);
    }
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if(!user) {
      throw new NotFoundException('El usuario no existe');
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new BadRequestException('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }


  /*
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
