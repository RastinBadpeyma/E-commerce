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


  async findLatestByPhone(
    phone: string,
  ): Promise<Otp | null> {

    const otp =
      await this.prisma.otpCode.findFirst({

        where: {
          phoneNumber: phone,
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

    if (!otp) {
      return null;
    }

        return otp ? this.toDomain(otp) : null;
  }


    async markAsUsed(id: string): Promise<void> {
        await this.prisma.otpCode.update({
            where: {
                id,
            },
            data: {
                usedAt: new Date(),
            },
        });
    }

    private toDomain(otp: {
        id: string;
        phoneNumber: string;
        code: string;
        expiresAt: Date;
        usedAt: Date | null;
    }): Otp {
        return new Otp(
            otp.id,
            otp.phoneNumber,
            otp.code,
            otp.expiresAt,
            otp.usedAt,
        );
    }

}
