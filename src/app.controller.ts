import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { CreditScoreDTO } from './dto/creditscore.dto';
import { CreditScoreResponse } from './interfaces/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/score')
  getHello(@Body() data: CreditScoreDTO): Observable<CreditScoreResponse> {
    return this.appService.calculateCreditScore(data);
  }
}
