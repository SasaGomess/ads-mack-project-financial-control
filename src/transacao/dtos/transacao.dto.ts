import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { Tipo } from '../enums/tipo.enum';

export class TransacaoRequestDto {
  @IsString()
  descricao?: string;
  @IsNumber()
  valor?: number;
  @IsEnum(Tipo)
  tipo?: string;
  @IsString()
  categoria?: string;
  @IsBoolean()
  consumoConsciente?: boolean;
}

export class TransacaoResponseDto {
  id?: string;
  descricao?: string;
  valor?: number;
  tipo?: string;
  categoria?: string;
  consumoConsciente?: boolean;

  constructor(valor: Partial<TransacaoResponseDto>) {
    this.id = valor.id;
    this.descricao = valor.descricao;
    this.valor = valor.valor;
    this.tipo = valor.tipo;
    this.categoria = valor.categoria;
    this.consumoConsciente = valor.consumoConsciente;
  }
}

export class ResumoTransacoesDto {
  historico?: Array<TransacaoResponseDto>;
  metricas?: MetricasTransacoesDto;
}

export class MetricasTransacoesDto {
  saldoTotal?: number;
  totalDespesas?: number;
  totalGastoImpulso?: number;
}
