import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { TokenService } from "../../application/interfaces/token-service";

@Injectable()
export class JwtTokenService
  implements TokenService
{
  constructor(
    private readonly jwt: JwtService,
  ) {}

  async generateAccessToken(
    userId: string,
  ) {

    return this.jwt.signAsync({
      sub: userId,
    });

  }

  async generateRefreshToken() {

    return randomUUID();

  }
}