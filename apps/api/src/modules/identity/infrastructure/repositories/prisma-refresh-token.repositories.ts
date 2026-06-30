import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { RefreshToken } from "../../domain/entities/refresh-token";
import { User } from "../../domain/entities/user";
import { IRefreshTokenRepository } from "../../domain/repositories/refresh-token.repositories";

@Injectable()
export class PrismaRefreshTokenRepositories implements IRefreshTokenRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

  async create(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<void> {
        await this.prisma.refreshToken.create({
            data: {
                userId: data.userId,
                tokenHash: data.tokenHash,
                expiresAt: data.expiresAt,
            },
        });
    }

  async save(refreshToken: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.update({
      where: {
        id: refreshToken.id,
      },
      data: {
        revokedAt: refreshToken.revokedAt,
      },
    });
  }


 async findByHash(
    hash: string,
  ): Promise<RefreshToken | null> {
    const token = await this.prisma.refreshToken.findUnique({
      where: {
        tokenHash: hash,
      },
    });

    if (!token) {
      return null;
    }

    return this.toDomain(token);
  }

private toDomain(model: {
   id: string;
   tokenHash: string;
   userId: string;
   expiresAt: Date;
   revokedAt: Date | null;
   createdAt: Date;
 }): RefreshToken {
   return new RefreshToken(
      model.id,
      model.tokenHash,
      model.userId,
      null as any, 
      model.expiresAt,
      model.revokedAt,
     model.createdAt,
  );
 }
}
