import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IRefreshTokenRepository } from "src/modules/identity/domain/repositories/refresh-token.repositories";
import { IHashService } from "../../interfaces/hash-service";
import { ISessionService } from "../../interfaces/session-service";

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
    if (!existing || existing.isExpired() || existing.isRevoked()) {
      throw new UnauthorizedException();
    }
    const session = await this.sessionService.create(existing.userId);

    try {
      await this.refreshTokenRepository.rotate(oldHash, {
        userId: existing.userId,
        tokenHash: session.tokenHash,
        expiresAt: session.expiresAt,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  }
}
