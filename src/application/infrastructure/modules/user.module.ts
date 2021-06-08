import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { UserDomain } from "src/domain/user.domain";
import { UserService } from "../services/grpc/user.service";
import { UserResolver } from "../resolvers/user.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserDomain
    ])
  ],
  controllers: [UserService],
  providers: [
    UserResolver,
    {
      provide: 'USER_PACKAGE',
      inject: [ConfigService],
      useFactory: (env: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: "user",
            protoPath: join(process.cwd(), 'src/resources/proto/user.proto')
          }
        })
      }
    }
  ]
})
export class UserModule {}
