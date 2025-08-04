import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUserRepository } from '../../infrastructure/persistence/repositories/prisma-user.repository';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { ErrorMessages } from 'src/shared/constants/error-messages';
import { isUUID } from 'class-validator';
import { SignInAuthDto } from 'src/modules/auth/application/dto/sign-in-auth.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: PrismaUserRepository) {}

    async create(createUserDto: CreateUserDto) {
        let user = UserMapper.userDtoToDomain(createUserDto);

        if (await this.userRepository.isCpfOrEmailAlreadyInUse(user.cpf, user.email)) {
            throw new ConflictException(ErrorMessages.CPF_OR_EMAIL_ALREADY_IN_USE());
        }

        return await this.userRepository.create(user);
    }

    async findAll() {
        let users = await this.userRepository.findAll();
        return UserMapper.toSafeMany(users);
    }

    async findOneById(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let user = await this.userRepository.findOneById(id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        return user;
    }

    async findOneByEmail(email: string) {
        let user = await this.userRepository.findOneByEmail(email);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        let user = await this.userRepository.findOneById(id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        return await this.userRepository.update(id, UserMapper.toDomainPartial(updateUserDto));
    }

    async remove(id: string) {
        let user = await this.userRepository.findOneById(id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        return await this.userRepository.delete(user.id);
    }
}
