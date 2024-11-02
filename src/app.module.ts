import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { DictionaryRecordsModule } from './dictionary-records/dictionary-records.module';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AssetManifestReader } from './general/asset-manifest-reader';
import { envValidationSchema } from './general/env.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV ?? 'dev'}`,
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL') ?? 60000,
          limit: config.get<number>('THROTTLE_LIMIT') ?? 120,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false, // Note: set to false in production
        logging: ['query', 'error'],
      }),
      inject: [ConfigService],
    }),
    DictionaryRecordsModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'ManifestReader',
      useFactory: () =>
        new AssetManifestReader(
          join(__dirname, '..', 'public/asset-manifest.json'),
        ),
    },
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [AppService, JwtModule],
})
export class AppModule {}
