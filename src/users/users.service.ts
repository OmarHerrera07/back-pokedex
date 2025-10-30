import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService
  ) { }


  create(data: CreateUserDto): Promise<User> {
    try {
      return this.prisma.user.create({
        data
      })
    } catch (error) {
      throw error
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany()
    } catch (error) {
      throw error
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: {
          id
        }
      })
    } catch (error) {
      throw error
    }
  }

  update(id: number, data: UpdateUserDto): Promise<User | null> {
    try {
      return this.prisma.user.update({
        where: {
          id
        },
        data
      })
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    try {
      return this.prisma.user.delete({
        where: {
          id
        },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontro el usuario con id: ${id}`);
      }
      throw error;
    }
  }
}
