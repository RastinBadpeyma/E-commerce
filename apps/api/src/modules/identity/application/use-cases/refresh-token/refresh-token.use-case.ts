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

    @Inject('ISessionService') 
    private readonly sessionService: ISessionService,
    
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

    await this.refreshTokenRepository.revoke(session.id, session.revokedAt);

   const token = this.sessionService.create(session.userId);
   return token;
  }
}