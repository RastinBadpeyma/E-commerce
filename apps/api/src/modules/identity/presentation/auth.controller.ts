import { Controller, Post, Body } from "@nestjs/common";
import { RequestOtpUseCase } from "../application/use-cases/request-otp/request-otp.use-case";
import { VerifyOtpUseCase } from "../application/use-cases/verify-otp/verify-otp.use-case";
import { RefreshTokenUseCase } from "../application/use-cases/refresh-token/refresh-token.use-case";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly requestOtpUsecase: RequestOtpUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('/request-otp')
  requestOtp(@Body('phone') phone: string){
    return this.requestOtpUsecase.execute(phone)
  }
  @Post('/verify-otp')
  verifyOtp(@Body() body: { phone: string; code: string }){
    return this.verifyOtpUseCase.execute(body.phone, body.code);
  }
   @Post('/refresh-token')
   RefreshToken(@Body('refreshToken') refreshToken: string){
    return this.refreshTokenUseCase.execute(refreshToken)
   }




  
}
