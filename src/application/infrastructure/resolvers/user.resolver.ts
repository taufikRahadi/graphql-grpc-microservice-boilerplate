import { Inject, Logger, OnModuleInit } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { ClientGrpc } from "@nestjs/microservices";
import { from,  } from "rxjs";
import { UserService } from "src/domain/interfaces/user.interface";
import { UserDomain } from "src/domain/user.domain";

@Resolver()
export class UserResolver implements OnModuleInit {

  private logger = new Logger("UserResolver")
  private userService: UserService;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService')
  }

  @Query(returns => UserDomain)
  async getById(
    @Args("id", { type: () => Number }) id: number
  ) {
    return this.userService.getById({ id })
  }

}
