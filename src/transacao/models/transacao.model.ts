import mongoose from 'mongoose';

export const TransacaoModel = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: { type: String, required: true, enum: ['receita', 'despesa'] },
  categoria: { type: String },
  consumoConsciente: { type: Boolean },
});

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  consumoConsciente: boolean;
}
