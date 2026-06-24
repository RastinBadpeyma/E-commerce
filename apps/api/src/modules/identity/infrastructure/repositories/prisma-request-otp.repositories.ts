import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { IOtpRepository } from "../../domain/repositories/otp.repositories";
import { Otp } from "../../domain/entities/otp";

@Injectable()
export class PrismaOtpRepositories implements IOtpRepository {
    constructor(
        private readonly prisma: PrismaService,
    ){}
    async create(data: { phoneNumber: string; code: string; expiresAt: Date; }): Promise<void> {
        await this.prisma.otpCode.create({
          data:{
            phoneNumber:data.phoneNumber,
            code:data.code,
            expiresAt:data.expiresAt
      }
        })
    }
    findValidOtp(phoneNumber: string, code: string): Promise<Otp | null> {
        throw new Error("Method not implemented.");
    }
    markAsUsed(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}
