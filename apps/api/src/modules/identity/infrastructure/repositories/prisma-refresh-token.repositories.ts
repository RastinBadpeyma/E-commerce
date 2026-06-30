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

    async findByHash(hash: string): Promise<RefreshToken | null> {
        const refreshToken = await this.prisma.refreshToken.findUnique({
            where: {
                tokenHash: hash,
            },
            include: {
                user: true,
            },
        });

        if (!refreshToken) {
            return null;
        }

        return new RefreshToken(
            refreshToken.id,
            refreshToken.tokenHash,
            refreshToken.userId,
            new User(
                refreshToken.user.id,
                refreshToken.user.phoneNumber,
                refreshToken.user.role,
                refreshToken.user.createdAt,
                refreshToken.user.updatedAt,
            ),
            refreshToken.expiresAt,
            refreshToken.revokedAt,
            refreshToken.createdAt,
        );
    }

    async revoke(id: string): Promise<void> {
        await this.prisma.refreshToken.update({
            where: {
                id,
            },
            data: {
                revokedAt: new Date(),
            },
        });
    }
}
