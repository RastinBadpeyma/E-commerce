import { Inject, Injectable } from "@nestjs/common";
import { IOtpRepository } from "src/modules/identity/domain/repositories/otp.repositories";

@Injectable()
export class RequestOtpUseCase{
    constructor(
        @Inject('IOtpRepository')
        private readonly otpRepo: IOtpRepository,
        @Inject('IOtpGenerator')
         private readonly otpGenerator: IOtpGenerator,
    ){}

    async execute(phone:string){
      const code = this.otpGenerator.generate()
      const expiresAt = new Date(
        Date.now() + 2 * 60 * 1000
      )

    await this.otpRepo.create({
      phoneNumber:phone,
      code,
      expiresAt
    });
     
  }
}
