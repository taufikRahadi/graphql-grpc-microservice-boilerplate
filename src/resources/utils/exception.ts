import { HttpException, HttpStatus } from "@nestjs/common";

export const internalServerError = (message: string): HttpException => {
  throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
}
