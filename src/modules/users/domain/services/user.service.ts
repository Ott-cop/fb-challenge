import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUserRepository } from '../../infrastructure/persistence/repositories/prisma-user.repository';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { ErrorMessages, NotFoundTypes } from 'src/shared/constants/error-messages';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
    constructor(private userRepository: PrismaUserRepository) {}

    async create(createUserDto: CreateUserDto) {
        if (await this.userRepository.isCpfOrEmailAlreadyInUse(createUserDto.cpf, createUserDto.email)) {
            throw new ConflictException(ErrorMessages.CPF_OR_EMAIL_ALREADY_IN_USE());
        }

        let user = UserMapper.userDtoToDomain(createUserDto);

        return await this.userRepository.create(user);
    }

    async findAll() {
        return await this.userRepository.findAll();
    }

    async findOneById(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let user = await this.userRepository.findOneById(id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.USER));
        }

        return user;
    }

    async findOneByEmail(email: string) {
        let user = await this.userRepository.findOneByEmail(email);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.USER));
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let user = await this.userRepository.findOneById(id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.USER));
        }

        return await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(ErrorMessages.INVALID_UUID_FORMAT());
        }

        let user = await this.userRepository.findOneById(id);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.NOT_FOUND(NotFoundTypes.USER));
        }

        return await this.userRepository.delete(user.id);
    }
}
