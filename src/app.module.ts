import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './Database/database.module';
import { LoggerModule } from './common/logger/logger.module';

//import { AppController } from './app.controller';
//import { AppService } from './app.service';

const NODE_ENV = process.env.NODE_ENV;
const ignoreLoadEnvFile = !(!NODE_ENV || NODE_ENV === 'local');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      ignoreEnvFile: ignoreLoadEnvFile,
    }),

    DatabaseModule,
    AuthModule,
    LoggerModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
