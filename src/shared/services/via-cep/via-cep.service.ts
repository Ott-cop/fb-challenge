import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ViaCepService {
    constructor(private readonly httpService: HttpService) {}

    async getAddressByCep(cep: string): Promise<{
        street: string;
        neighborhood: string;
        city: string;
        state: string;
    }> {
        const cleanedCep = cep.replace(/\D/g, '');

        const { data } = await firstValueFrom(
            this.httpService.get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
        );

        if (data.erro) {
        throw new Error('CEP inválido ou não encontrado');
        }

        return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
        };
    }
}
