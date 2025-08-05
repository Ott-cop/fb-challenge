import { User } from "generated/prisma";
import { SafeUser } from "../application/dto/safe-user.dto";
import { Role } from "../role/role.enum";

export class UserMapper {
    static DbtoSafe(user: User): SafeUser {
        let safeUser: SafeUser = {
            id: user.id,
            name: user.name,
            password: user.password
        };
        return safeUser;
    }
}