import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransacaoModule } from './transacao/transacao.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TransacaoModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
  ],
})
export class AppModule {}
