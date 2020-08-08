import { Injectable, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MonoService } from './mono/mono.service';
import { CreditScoreRequest } from './interfaces/creditscore.interface';
import { map, catchError } from 'rxjs/operators';
import { CreditScoreResponse } from './interfaces/response.interface';

@Injectable()
export class AppService {
  private logger: Logger = new Logger();

  constructor(private readonly monoService: MonoService) {}

  getAverageIncome(history: {amount: number; period: string}[]): number {
    const totalIncome = history.reduce((prev, cur) => {
      return cur.amount + prev
    }, 0)

    return totalIncome/history.length
  }

  calculateCreditScore(data: CreditScoreRequest): Observable<CreditScoreResponse> {
      const { amount, monoId } = data
      let score: number;

      return this.monoService.getUserDebits(monoId)
        .pipe(
            map(response => {
                if(response.status === 'success') {
                    const averageIncome = this.getAverageIncome(response.data.history)
                    const avgIncome = response.data.total/response.data.history.length

                    const payable = averageIncome * 0.2 * 3
                    if(amount > payable) {
                        score = payable
                    } else if(amount < payable) {
                        score = amount
                    }
                    
                    this.logger.log(`calculated average: ${averageIncome}`)
                    this.logger.log(`derived average: ${avgIncome}`)

                    return {status: 'success', data: {...data, score}}
                }else {
                  throw new Error(`failed to fetch user debits`)
                }
            }),
            catchError(err => of({
                status: 'error',
                data: {...data, score: 0},
                message: `${err}`
            }))
        )
  }
}
