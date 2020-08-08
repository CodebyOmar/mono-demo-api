import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonoModule } from './mono/mono.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MonoModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
