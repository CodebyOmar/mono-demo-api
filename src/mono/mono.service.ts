import { Injectable, HttpService, Logger } from '@nestjs/common';
import Axios from 'axios'
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {BalanceResponse, TransactionResponse, AuthResponse } from './interfaces/response.interface'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MonoService {
    private readonly httpService: HttpService;
    private logger: Logger = new Logger();

    constructor(private readonly configService: ConfigService) {
        const monoInstance = Axios.create({
          baseURL: this.configService.get<string>('MONO_BASE_URL'),
          headers: {
              "mono-sec-key": this.configService.get<string>('MONO_SECRET_KEY'),
          },
        });

        this.httpService = new HttpService(monoInstance);
    }

    authenticateUser(code: string): Observable<AuthResponse> {
      return this.httpService.post('account/auth', { code })
        .pipe(
          map(response => ({status: 'success', data: {...response.data}})),
          catchError(err => {
            this.logger.error(err)
            return of({status: 'error', data: null, message: `${err}`})
          })
        )
    }

    getBalance(id: string): Observable<BalanceResponse> {
      return this.httpService.get(`accounts/${id}`)
        .pipe(
          map(response => ({status: 'success', data: {...response.data}})),
          catchError(err => {
            this.logger.error(err)
            return of({status: 'error', data: null, message: `${err}`})
          })
        )
    }

    getUserCredits(id: string): Observable<TransactionResponse> {
      return this.httpService.get(`accounts/${id}/credits`)
        .pipe(
          map(response => ({status: 'success', data: {...response.data}})),
          catchError(err => {
            this.logger.error(err)
            return of({status: 'error', data: null, message: `${err}`})
          })
        )
    }

    getUserDebits(id: string): Observable<TransactionResponse>{
        return this.httpService.get(`accounts/${id}/debits`)
          .pipe(
            map(response => ({status: 'success', data: {...response.data}})),
            catchError(err => {
              this.logger.error(err)
              return of({status: 'error', data: null, message: `${err}`})
            })
          )
    }
}
