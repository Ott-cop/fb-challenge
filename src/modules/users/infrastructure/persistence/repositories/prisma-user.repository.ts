import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/domain/repositories/user.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { UserMapper } from "../../mappers/user.mapper";
import { User as UserPrisma } from "generated/prisma";
import { User } from "src/modules/users/domain/entities/user.entity";
import { UpdateUserDto } from "src/modules/users/application/dto/update-user.dto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async create(user: User): Promise<UserPrisma> {
        return await this.prismaService.user.create({ 
            data: UserMapper.toPersistence(user)
        });
    }

    async findAll(): Promise<UserPrisma[]> {
        return await this.prismaService.user.findMany();
    }

    async findOneById(id: string): Promise<UserPrisma | null> {
        return await this.prismaService.user.findFirst(
            {
                where: {
                    id
                }
            }
        );
    }

    async findOneByEmail(email: string): Promise<UserPrisma | null> {
        return await this.prismaService.user.findFirst(
            {
                where: {
                    email
                }
            }
        );
    }

    async update(id: string, partialUser: UpdateUserDto): Promise<UserPrisma> {
        return await this.prismaService.user.update(
            {
                where: { id },
                data: UserMapper.toDomainPartial(partialUser)
            }
        )
    }

    async delete(id: string): Promise<void> {
        await this.prismaService.user.delete({ 
            where: { id } 
        });
    }

    async isCpfOrEmailAlreadyInUse(cpf: string, email: string): Promise<boolean> {
        const user = await this.prismaService.user.findFirst({
            where: {
              OR: [
                { email },
                { cpf }
              ],
            }
        });
      
        return !!user;
    }   
    
}
