import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { HashService } from "src/modules/identity/infrastructure/services/hash.service";
import { TokenService } from "../../interfaces/token-service";
import { IRefreshTokenRepository } from "src/modules/identity/domain/repositories/refresh-token.repositories";


@Injectable()
export class RefreshTokenUseCase {

  constructor(

    @Inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository,

    @Inject("TokenService")
    private readonly tokenService: TokenService,

    @Inject("IHashService")
    private readonly hashService: HashService,

  ) {}

  async execute(
    refreshToken: string,
  ) {

    const tokenHash =
      await this.hashService.hash(refreshToken);

    const session =
      await this.refreshTokenRepository.findByHash(tokenHash);

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.isExpired()) {
      throw new UnauthorizedException();
    }

    if (session.isRevoked()) {
      throw new UnauthorizedException();
    }

    session.revoke();

    await this.refreshTokenRepository.save(session);

    const accessToken =
      await this.tokenService.generateAccessToken(session.userId);

    const newRefreshToken =
      await this.tokenService.generateRefreshToken();

    const newHash =
      await this.hashService.hash(newRefreshToken);

    await this.refreshTokenRepository.create({
      tokenHash: newHash,
      userId: session.userId,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ),
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}