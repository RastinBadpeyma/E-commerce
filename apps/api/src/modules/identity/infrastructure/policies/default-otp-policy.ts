import { Injectable } from "@nestjs/common";
import { IOtpPolicy } from "../../application/interfaces/otp-policy";

@Injectable()
export class DefaultOtpPolicy implements IOtpPolicy {

  getTtlMs(): number {
    return 2 * 60 * 1000; 
  }
}