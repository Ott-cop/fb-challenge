import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AddressService } from '../../domain/services/address.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Request() req: any) {
        return await this.addressService.findAll(req.user.sub);
    }
}
