import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { RefreshToken } from "../../domain/entities/refresh-token";
import { IRefreshTokenRepository } from "../../domain/repositories/refresh-token.repositories";

@Injectable()
export class PrismaRefreshTokenRepositories implements IRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

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

  async rotate(
    oldTokenHash: string,
    newToken: { userId: string; tokenHash: string; expiresAt: Date },
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const result = await tx.refreshToken.updateMany({
        where: {
          tokenHash: oldTokenHash,
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
        data: { revokedAt: new Date() },
      });

      if (result.count !== 1) {
        throw new Error("Unable to revoke refresh token");
      }

      await tx.refreshToken.create({
        data: {
          userId: newToken.userId,
          tokenHash: newToken.tokenHash,
          expiresAt: newToken.expiresAt,
        },
      });
    });
  }

  async findByHash(hash: string): Promise<RefreshToken | null> {
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
      model.expiresAt,
      model.revokedAt,
      model.createdAt,
    );
  }
}
