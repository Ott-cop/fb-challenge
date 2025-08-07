import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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

        try {
            const { data } = await firstValueFrom(
                this.httpService.get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
            );

            if (data.erro) {
                throw new Error('Invalid CEP or not found.');
            }

            return {
                street: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            };
        } catch (error) {
        if (error.isAxiosError) {
            const axiosError = error as AxiosError;
            throw new InternalServerErrorException(
            `Erro ao conectar com ViaCEP: ${axiosError.message}`
            );
        }
        
        throw new InternalServerErrorException(error.message);
        }
    }
}
