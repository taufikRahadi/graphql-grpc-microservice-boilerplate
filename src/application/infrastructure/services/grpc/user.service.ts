import { Controller, InternalServerErrorException } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { UserId } from "src/domain/interfaces/user.interface";
import { UserDomain } from "src/domain/user.domain";
import { isCanGetData } from "src/resources/utils/check-arg";
import { Repository } from "typeorm";

@Controller()
export class UserService {

  constructor(
    @InjectRepository(UserDomain) private readonly userRepo: Repository<UserDomain>
  ) {}

  @GrpcMethod("UserService", "getById")
  async getById(data: UserId) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id: data.id
        }
      })
      isCanGetData(user, data.id)

      return user
    } catch (error) {
      console.log(error)
      throw new RpcException(error)
    }
  }

}
