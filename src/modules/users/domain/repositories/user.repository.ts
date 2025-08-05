import { User } from "generated/prisma";
import { SafeUser } from "../../application/dto/safe-user.dto";

export interface UserRepository {
  create(user: User): Promise<SafeUser>;
  findAll(): Promise<SafeUser[]>;
  findOneById(id: string): Promise<SafeUser | null>;
  findOneByEmail(email: string): Promise<SafeUser | null>;
  update(id: string, user: Partial<User>): Promise<SafeUser>;
  delete(id: string): Promise<void>;
  isCpfOrEmailAlreadyInUse(cpf: string, email: string): Promise<boolean>;
}
