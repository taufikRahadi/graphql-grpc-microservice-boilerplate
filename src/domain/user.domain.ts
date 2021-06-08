import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDomain } from './base.domain'

@Entity("users")
@ObjectType()
@Directive('@key(fields: "id")')
export class UserDomain extends BaseDomain {
  @PrimaryGeneratedColumn('increment', {
    name: 'id'
  })
  @Field(type => ID, { nullable: false })
  id: number;

  @Column()
  @Field(type => String, { nullable: false })
  fullname: string;

  @Column()
  @Field(type => String, { nullable: false })
  email: string;
}
