import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType('StudentEntity')
export class StudentType{
    @Field()
    id:string;

    @Field()
    firstName:string;

    @Field()
    lastName:string;

   
}