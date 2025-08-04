import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/domain/services/user.service';
import { SignInAuthDto } from '../application/dto/sign-in-auth.dto';
import { ErrorMessages } from 'src/shared/constants/error-messages';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(credentials: SignInAuthDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(credentials.email);

        if (user == null) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND());
        }

        if (credentials.password != user.password) {
            throw new UnauthorizedException(ErrorMessages.INCORRECT_CREDENTIALS());
        } 

        const payload = { sub: user.id, username: user.name };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
