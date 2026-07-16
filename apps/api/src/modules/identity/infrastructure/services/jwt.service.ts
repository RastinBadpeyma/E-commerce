import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { ITokenService } from "../../application/interfaces/token-service";
import { AccessTokenPayload } from "../../application/types/access-token-payload";

@Injectable()
export class JwtTokenService
  implements ITokenService
{
  constructor(
    private readonly jwt: JwtService,
  ) {}

  async generateAccessToken(
    payload: AccessTokenPayload,
  ): Promise<string> {

    return this.jwt.sign(
      payload,
    );

  }

  async generateRefreshToken() {

    return randomUUID();

  }
}