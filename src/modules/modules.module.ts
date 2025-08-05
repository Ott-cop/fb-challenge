import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [AuthModule, UsersModule, ClientsModule, AddressesModule]
})
export class ModulesModule {}
