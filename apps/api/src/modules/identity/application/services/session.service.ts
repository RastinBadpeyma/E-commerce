import { Injectable, Inject } from "@nestjs/common";
import { IRefreshTokenRepository } from "../../domain/repositories/refresh-token.repositories";
import { IHashService } from "../interfaces/hash-service";
import { ISessionService } from "../interfaces/session-service";
import { ITokenPolicy } from "../interfaces/token-policy";
import { ITokenService } from "../interfaces/token-service";

@Injectable()
export class DefaultSessionService implements ISessionService {
  constructor(
    @Inject('ITokenService') private readonly tokenService: ITokenService,
    @Inject('IHashService') private readonly hashService: IHashService,
    @Inject('IRefreshTokenRepository') private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject('ITokenPolicy') private readonly tokenPolicy: ITokenPolicy, 
  ) {}

  async create(userId: string) {
    const accessToken = await this.tokenService.generateAccessToken(userId);
    const refreshToken = await this.tokenService.generateRefreshToken();
    const tokenHash = await this.hashService.hash(refreshToken);

    await this.refreshTokenRepository.create({
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + this.tokenPolicy.getRefreshTokenTtlMs()),
    });

    return { accessToken, refreshToken };
  }
}