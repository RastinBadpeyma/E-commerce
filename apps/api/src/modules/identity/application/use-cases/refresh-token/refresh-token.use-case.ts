import { Inject, Injectable } from "@nestjs/common";
import { IRefreshTokenRepository } from "src/modules/identity/domain/repositories/refresh-token.repositories";
import { IHashService } from "../../interfaces/hash-service";
import { ISessionService } from "../../interfaces/session-service";
import { UnauthorizedAccessError } from "src/modules/identity/domain/errors/unauthorized-access.error";
import { InvalidOtpError } from "src/modules/identity/domain/errors/invalid-otp.error";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository,

    @Inject("IHashService")
    private readonly hashService: IHashService,

    @Inject("ISessionService")
    private readonly sessionService: ISessionService,
  ) {}

  async execute(refreshToken: string) {
    const oldHash = await this.hashService.hash(refreshToken);

    const existing = await this.refreshTokenRepository.findByHash(oldHash);
    if (!existing ||  existing.isRevoked()) {
      throw new InvalidOtpError('invalid');
    }
    if (existing.isExpired()) {
      throw new InvalidOtpError('expired');
    }
    const session = await this.sessionService.create(existing.userId);

    try {
      await this.refreshTokenRepository.rotate(oldHash, {
        userId: existing.userId,
        tokenHash: session.tokenHash,
        expiresAt: session.expiresAt,
      });
    } catch {
      throw new UnauthorizedAccessError();
    }

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  }
}
