import { Prisma } from "generated/prisma";
import { CreateUserDto } from "src/modules/users/application/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/application/dto/update-user.dto";
import { User } from "../../domain/entities/user.entity";

export class UserMapper {
    static userDtoToDomain(userDTO: CreateUserDto): User {
      return new User(
        '',
        userDTO.name,
        userDTO.email,
        userDTO.cpf,
        userDTO.password,
      );
    }

    static toDomainPartial(updateUserDto: UpdateUserDto): Partial<User> {
      const user: Partial<User> = {};
  
      if (updateUserDto.name && updateUserDto.name.trim() !== '') {
        user.name = updateUserDto.name;
      }
  
      if (updateUserDto.email && updateUserDto.email.trim() !== '') {
        user.email = updateUserDto.email;
      }
  
      if (updateUserDto.cpf && updateUserDto.cpf.trim() !== '') {
        user.cpf = updateUserDto.cpf;
      }
  
      if (updateUserDto.password && updateUserDto.password.trim() !== '') {
        user.password = updateUserDto.password;
      }
  
      return user;
    }

    static toSafe(user: User): Omit<User, 'password'> {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    static toSafeMany(users: User[]): Omit<User, 'password'>[] {
        return users.map(UserMapper.toSafe);
    }

    static toPrisma(user: Partial<User>): Prisma.UserUpdateInput {
      const data: Prisma.UserUpdateInput = {};
    
      if (user.name) data.name = user.name;
      if (user.email) data.email = user.email;
      if (user.cpf) data.cpf = user.cpf;
      if (user.password) data.password = user.password;
    
      return data;
    }

    static toPersistence(user: User): Omit<User, 'id'> {
      return {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password: user.password,
      };
    }
  }