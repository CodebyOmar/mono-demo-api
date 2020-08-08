import { Module } from '@nestjs/common';
import { MonoService } from './mono.service';
import { MonoController } from './mono.controller';

@Module({
  providers: [MonoService],
  controllers: [MonoController],
  exports: [MonoService]
})
export class MonoModule {}
