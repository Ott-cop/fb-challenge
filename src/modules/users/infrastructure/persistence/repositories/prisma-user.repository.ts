import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/domain/repositories/user.repository";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { UserMapper } from "../../mappers/user.mapper";
import { User } from "src/modules/users/domain/entities/user.entity";
import { UpdateUserDto } from "src/modules/users/application/dto/update-user.dto";
import { SafeUser } from "src/modules/users/application/dto/safe-user.dto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(user: User): Promise<SafeUser> {
        let created_user = await this.prismaService.user.create({ 
            data: UserMapper.toPersistence(user)
        });

        return UserMapper.toSafe(created_user);
    }

    async findAll(): Promise<SafeUser[]> {
        let users = await this.prismaService.user.findMany();
        
        return UserMapper.toSafeMany(users);
    }

    async findOneById(id: string): Promise<SafeUser | null> {
        let user = await this.prismaService.user.findFirst({
            where: {
                id
            }
        });

        if (!user) return null;
        
        return UserMapper.toSafe(user); 
    }

    async findOneByEmail(email: string): Promise<SafeUser | null> {
        let user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        });

        if (!user) return null;
        
        return UserMapper.toSafe(user);
    }

    async update(id: string, partialUser: UpdateUserDto): Promise<SafeUser> {
        let user = await this.prismaService.user.update({
                where: { id },
                data: UserMapper.toDomainPartial(partialUser)
        });

        return UserMapper.toSafe(user);
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
