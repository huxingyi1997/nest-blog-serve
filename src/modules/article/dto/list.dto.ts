import { Matches } from 'class-validator';
import { regPositive } from '../../../utils';

export class ListDTO {
  @Matches(regPositive, { message: "page shouldn't be negtive" })
  readonly page?: number;

  @Matches(regPositive, { message: "pageSize shouldn't be negtive" })
  readonly pageSize?: number;
}
