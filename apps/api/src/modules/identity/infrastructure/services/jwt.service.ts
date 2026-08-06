import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { AuthPayload } from "@ecommerce/auth-contracts";
import { ITokenService } from "../../application/interfaces/token-service";

@Injectable()
export class JwtTokenService
  implements ITokenService
{
  constructor(
    private readonly jwt: JwtService,
  ) {}

  async generateAccessToken(
    payload: AuthPayload,
  ): Promise<string> {

    return this.jwt.sign(
      payload,
    );

  }

  async generateRefreshToken() {

    return randomUUID();

  }
}
