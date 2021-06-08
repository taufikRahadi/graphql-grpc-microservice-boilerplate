import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { join } from 'path'
import { DatabaseModule } from './infrastructure/config/database.config';
import { RedisModule } from './infrastructure/config/redis.config';
import { UserModule } from './infrastructure/modules/user.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/resources/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      playground: true,
      debug: false
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
