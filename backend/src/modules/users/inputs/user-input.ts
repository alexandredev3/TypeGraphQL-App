import { Field, InputType } from 'type-graphql';
import { MaxLength, MinLength, IsEmail, IsString } from 'class-validator';

@InputType()
class UserInput {
  @Field()
  @IsString()
  name: string;

  @Field({ defaultValue: '' })
  @MaxLength(90)
  @IsString()
  bio: string;

  @Field()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @MinLength(8)
  @IsString()
  password: string;
}

export default UserInput;