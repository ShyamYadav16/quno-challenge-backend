import {IsNotEmpty, IsNumber} from "class-validator";

export class DoctorsQuery {

  constructor(limit: number, offset: number, orderBy: string, isAsc: number) {
    this.limit = limit;
    this.offset = offset;
    this.orderBy = orderBy;
    this.isAsc = isAsc;
  }

  @IsNumber({}, {
    message: 'limit query parameter must be a number!'
  })
  @IsNotEmpty({
    message: 'limit query parameter is required!'
  })
  limit: number;

  @IsNumber({}, {
    message: 'offset query parameter must be a number!'
  })
  @IsNotEmpty({
    message: 'offset query parameter is required!'
  })
  offset: number;

  @IsNotEmpty({
    message: 'orderBy query parameter is required!'
  })
  orderBy: string;

  @IsNumber({}, {
    message: 'isAsc query parameter must be a number!'
  })
  @IsNotEmpty({
    message: 'isAsc query parameter is required!'
  })
  isAsc: number;

}