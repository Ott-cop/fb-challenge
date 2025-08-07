import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ContactService } from '../../domain/services/contact.service';
import { CreateContactDto } from '../../application/dto/create-contact.dto';
import { UpdateContactDto } from '../../application/dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactService: ContactService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Request() req: any) {
        return await this.contactService.findAll(req.user.sub);
    }

    @Get('client/:id')
    @UseGuards(AuthGuard)
    async findAllByClient(@Request() req: any, @Param('id') id: string) {
        return await this.contactService.findAllByClient(id, req.user.sub);
    }

    @Post('client/:id')
    @UseGuards(AuthGuard)
    async create(@Request() req: any, @Param('id') id: string, @Body() dto: CreateContactDto) {
        return await this.contactService.create(id, dto, req.user.sub);
    }

    @Patch('client/:client_id/contact/:contact_id')
    @UseGuards(AuthGuard)
    async update(@Request() req: any, @Param('client_id') client_id: string, @Param('contact_id') contact_id: string, @Body() dto: UpdateContactDto) {
        return await this.contactService.update(client_id, contact_id, dto, req.user.sub);
    }

    @Delete('client/:client_id/contact/:contact_id')
    @UseGuards(AuthGuard)
    async remove(@Request() req: any, @Param('client_id') client_id: string, @Param('contact_id') contact_id: string) {
        return await this.contactService.remove(client_id, contact_id, req.user.sub);
    }
}
