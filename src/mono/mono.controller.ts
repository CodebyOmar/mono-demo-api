import { Controller, Get, Param } from '@nestjs/common';
import { MonoService } from './mono.service';
import { Observable } from 'rxjs';
import { BalanceResponse, TransactionResponse, AuthResponse } from './interfaces/response.interface';

@Controller('from-mono')
export class MonoController {
    constructor(private readonly monoService: MonoService) {}

    @Get('/user/:code')
    getUser(@Param('code') code: string): Observable<AuthResponse> {
      return this.monoService.authenticateUser(code)
    }

    @Get('/:id/balance')
    getBalance(@Param('id') id: string): Observable<BalanceResponse> {
      return this.monoService.getBalance(id);
    }

    @Get('/:id/credits')
    getCredits(@Param('id') id: string): Observable<TransactionResponse> {
      return this.monoService.getUserCredits(id);
    }

    @Get('/:id/debits')
    getDebits(@Param('id') id: string): Observable<TransactionResponse> {
      return this.monoService.getUserDebits(id);
    }
}
