import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IOtpRepository } from "src/modules/identity/domain/repositories/otp.repositories";
import { IRefreshTokenRepository } from "src/modules/identity/domain/repositories/refresh-token.repositories";
import { IUserRepository } from "src/modules/identity/domain/repositories/user.repository";

import { ISessionService } from "../../interfaces/session-service";

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,

    @Inject("IOtpRepository")
    private readonly otpRepository: IOtpRepository,

    @Inject("ISessionService") private readonly sessionService: ISessionService,

    @Inject("IRefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(phone: string, code: string) {
    const otp = await this.otpRepository.findLatestByPhone(phone);
    if (!otp) throw new NotFoundException();

    otp.verify(code);

    let user = await this.userRepository.findByPhone(phone);
    if (!user) user = await this.userRepository.create(phone);

    const session = await this.sessionService.create(user.id);

    await this.refreshTokenRepository.create({
      userId: user.id,
      tokenHash: session.tokenHash,
      expiresAt: session.expiresAt,
    });
    await this.otpRepository.markAsUsed(otp.id);

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  }
}
