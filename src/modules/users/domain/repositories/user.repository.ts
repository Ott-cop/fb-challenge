import { User } from "generated/prisma";

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<Partial<User[]>>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  isCpfOrEmailAlreadyInUse(cpf: string, email: string): Promise<boolean>;
}
