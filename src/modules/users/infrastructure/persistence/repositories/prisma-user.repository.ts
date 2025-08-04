import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/domain/repositories/user.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { UserMapper } from "../../mappers/user.mapper";
import { User } from "generated/prisma";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async create(user: User): Promise<User> {
        return await this.prismaService.user.create({ 
            data: UserMapper.toPersistence(user)
        });
    }

    async findAll(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }

    async findOneById(id: string): Promise<User | null> {
        return await this.prismaService.user.findFirst(
            {
                where: {
                    id
                }
            }
        );
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findFirst(
            {
                where: {
                    email
                }
            }
        );
    }

    async update(id: string, partialUser: Partial<User>): Promise<User> {
        return await this.prismaService.user.update(
            {
                where: { id },
                data: partialUser
            }
        )
    }

    async delete(id: string): Promise<void> {
        await this.prismaService.user.delete({ where: { id } });
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
