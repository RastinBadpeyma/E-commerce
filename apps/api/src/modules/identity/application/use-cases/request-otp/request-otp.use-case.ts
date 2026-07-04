import { Inject, Injectable } from "@nestjs/common";
import { IOtpRepository } from "src/modules/identity/domain/repositories/otp.repositories";
import { IOtpGenerator } from "../../interfaces/otp-generator";
import { IOtpPolicy } from "../../interfaces/otp-policy";

@Injectable()
export class RequestOtpUseCase{
    constructor(
      @Inject('IOtpRepository')
      private readonly otpRepo: IOtpRepository,
      @Inject('IOtpGenerator')
       private readonly otpGenerator: IOtpGenerator,
       @Inject("IOtpPolicy")
       private readonly otpPolicy: IOtpPolicy,

    ){}

    async execute(phone:string){
      const code = this.otpGenerator.generate()
      const expiresAt = new Date(
        Date.now() + this.otpPolicy.getTtlMs()
      )

    await this.otpRepo.create({
      phoneNumber:phone,
      code,
      expiresAt
    });
     
  }
}
