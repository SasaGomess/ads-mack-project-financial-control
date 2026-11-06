import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransacaoService } from '../services/transacao.service';
import { TransacaoRequestDto } from '../dtos/transacao.dto';

@Controller('transacoes')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  public async performsTransaction(@Body() data: TransacaoRequestDto) {
    return this.transacaoService.performsTransaction(data);
  }

  @Get()
  public async getTransactionsSummary(){
    return this.transacaoService.getTransactionsSummary()
  }
}
