import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOneById(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }
}
