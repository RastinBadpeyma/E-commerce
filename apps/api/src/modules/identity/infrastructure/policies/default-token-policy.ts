import { Injectable } from "@nestjs/common";
import { ITokenPolicy } from "../../application/interfaces/token-policy";


@Injectable()
export class DefaultTokenPolicy implements ITokenPolicy {
    getRefreshTokenTtlMs(): number {
      return 30 * 24 * 60 * 60 * 1000; 
    }
}