import { Controller, Post, Body } from "@nestjs/common";
import { RequestOtpUseCase } from "../application/use-cases/request-otp/request-otp.use-case";

@Controller('auth')
export class AuthController {
  constructor(private readonly requestOtpUsecase: RequestOtpUseCase) {}

  @Post('/request-otp')
  requestOtp(@Body('phone') phone: string){
    return this.requestOtpUsecase.execute(phone)
  }
//   @Post('/verify-otp')
//   @Post('/refresh')
//   @Post('/logout')



  
}
