import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ResumoTransacoesDto,
  TransacaoResponseDto,
} from '../dtos/transacao.dto';
import { Transacao } from '../models/transacao.model';
import { Tipo } from '../enums/tipo.enum';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectModel('Transacao') private readonly transacaoModel: Model<Transacao>,
  ) {}
  public async performsTransaction(
    data: TransacaoResponseDto,
  ): Promise<TransacaoResponseDto> {
    const transacaoModel = new this.transacaoModel({
      descricao: data.descricao,
      valor: data.valor,
      categoria: data.categoria,
      consumoConsciente: data.consumoConsciente,
      tipo: data.tipo,
    });

    return await transacaoModel.save();
  }

  public async getTransactionsSummary(): Promise<ResumoTransacoesDto> {
    const transacoes: Array<Transacao> = await this.transacaoModel
      .find()
      .exec();

    const totalReceitas = transacoes
      .filter((t) => t.tipo == Tipo.Receita)
      .map((t) => t.valor)
      .reduce((acc, current) => acc + current, 0);

    const despesas = transacoes.filter((t) => t.tipo == Tipo.Despesa);

    const totalDespesas = despesas
      .map((t) => t.valor)
      .reduce((acc, current) => acc + current, 0);

    const saldoTotal = totalReceitas - totalDespesas;

    const totalGastoImpulso = despesas
      .filter((t) => !t.consumoConsciente)
      .map((t) => t.valor)
      .reduce((acc, current) => acc + current, 0);

    return {
      historico: transacoes,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}
