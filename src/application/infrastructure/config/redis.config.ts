import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModuleAsyncOptions, RedisModule as Redis } from 'nestjs-redis';

const redisConfig = (config: ConfigService) => {
  return {
    url: config.get<string>('REDIS_URL')
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    Redis.forRootAsync({
      useFactory: (configService: ConfigService) => redisConfig(configService),
      inject: [ConfigService]
    })
  ]
})
export class RedisModule {}
