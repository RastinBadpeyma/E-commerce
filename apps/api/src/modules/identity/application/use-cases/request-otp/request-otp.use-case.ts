import { Inject, Injectable } from "@nestjs/common";
import { IOtpRepository } from "src/modules/identity/domain/repositories/otp.repositories";

@Injectable()
export class RequestOtpUseCase{
    constructor(
        @Inject('IOtpRepository')
        private readonly otpRepo: IOtpRepository
    ){}

    async execute(phone:string){
      const code = Math.floor(100000 + Math.random()*900000).toString();    
      const expiresAt = new Date(
        Date.now() + 2 * 60 * 1000
      )

    await this.otpRepo.create({
      phoneNumber:phone,
      code,
      expiresAt
    });
     
    console.log(`phone: ${phone} , code: ${code}`)

  }
}
