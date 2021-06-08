import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './application/app.module'

const loggerGraphQL = new Logger("GraphQL Server")
const loggergRPC = new Logger("gRPC Server")

async function bootstrap() {
  const graphqlPort = process.env.GRAPHQL_PORT;
  const grpcPort = process.env.GRPC_PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["log"]
  });
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(process.cwd(), "src/resources/proto/user.proto")
    }
  })

  app.startAllMicroservices(() => loggergRPC.log("gRPC Service Is Running 🚀🚀🚀"))
  
  app.listen(graphqlPort, () => loggerGraphQL.log("GraphQL Service Is Running 🚀🚀🚀"));
}
bootstrap();
