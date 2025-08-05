import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/persistence/prisma/prisma.service";
import { SafeUser } from "../application/dto/safe-user.dto";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class PrismaAuthRepository {
    constructor(private prismaService: PrismaService) {}

    async findOneByEmail(email: string): Promise<SafeUser | null> {
        let user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        });

        if (!user) return null;
        
        return UserMapper.DbtoSafe(user);
    }
}