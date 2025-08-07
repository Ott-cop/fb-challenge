import { Body, Controller, Get, Param, Patch, Req, Request, UseGuards } from '@nestjs/common';
import { AddressService } from '../../domain/services/address.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { JwtPayload } from 'src/modules/auth/jwt-payload';
import { UpdateAddressDto } from '../../application/dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Request() req: any) {
        return await this.addressService.findAll(req.user.sub);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(@Request() req: any, @Param('id') id: string) {
        return await this.addressService.findOne(id, req.user.sub);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateAddressDto) {
        return await this.addressService.update(id, dto, req.user.sub);
    }
}
