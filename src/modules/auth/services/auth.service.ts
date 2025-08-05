import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/domain/services/user.service';
import { SignInAuthDto } from '../application/dto/sign-in-auth.dto';
import { ErrorMessages, NotFoundTypes } from 'src/shared/constants/error-messages';
import { JwtService } from '@nestjs/jwt';
import { PrismaAuthRepository } from '../repositories/prisma-auth.repository';
import { JwtPayload } from '../jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        private authRepository: PrismaAuthRepository,
        private jwtService: JwtService
    ) {}

    async signIn(credentials: SignInAuthDto): Promise<{ access_token: string }> {
        
        const user = await this.authRepository.findOneByEmail(credentials.email);

        if (user == null || credentials.password != user.password) {
            throw new UnauthorizedException(ErrorMessages.INCORRECT_CREDENTIALS());
        } 

        const payload: JwtPayload = {
            sub: user.id,
            username: user.name,
        };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
