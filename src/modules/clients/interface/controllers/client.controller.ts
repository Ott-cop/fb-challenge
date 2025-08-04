import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ClientService } from '../../domain/services/client.service';
import { CreateClientDto } from '../../application/dto/create-client.dto/create-client.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';


@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Request() req: any) {
        return await this.clientService.findAll(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Request() req: any, @Param('id') id: string) {
        return await this.clientService.findOneById(id, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Request() req: any, @Body() createClientDto: CreateClientDto) {
        return await this.clientService.create(createClientDto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async remove(@Request() req: any, @Param('id') id: string) {
        return await this.clientService.remove(id, req.user.sub)
    }
}
