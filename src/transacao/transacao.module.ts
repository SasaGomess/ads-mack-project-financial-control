import { Module } from '@nestjs/common';
import { TransacaoController } from './controllers/transacao.controller';
import { TransacaoService } from './services/transacao.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacaoModel } from './models/transacao.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transacao', schema: TransacaoModel }]),
  ],
  providers: [TransacaoService],
  controllers: [TransacaoController],
})
export class TransacaoModule {}
