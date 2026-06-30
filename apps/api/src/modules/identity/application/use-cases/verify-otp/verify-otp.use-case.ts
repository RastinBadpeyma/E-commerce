import { Inject, Injectable } from "@nestjs/common";
import { IOtpRepository } from "src/modules/identity/domain/repositories/otp.repositories";
import { IRefreshTokenRepository } from "src/modules/identity/domain/repositories/refresh-token.repositories";
import { IUserRepository } from "src/modules/identity/domain/repositories/user.repository";
import { TokenService } from "../../interfaces/token-service";
import { HashService } from "src/modules/identity/infrastructure/services/hash.service";

@Injectable()
export class VerifyOtpUseCase{
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository:IUserRepository,

    @Inject('IOtpRepository')
    private readonly otpRepository:IOtpRepository,

    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,

    @Inject('TokenService')
    private readonly tokenService:TokenService,

    @Inject('IHashService')
    private readonly hashService:HashService
    ){}
    
    async execute(phone:string,code:string){
        const otp = await this.otpRepository.findLatestByPhone(phone);
        if (!otp) {
            throw new  Error(
                "otp not found"
            );
        }
        otp.verify(code);

        let user = await this.userRepository.findByPhone(phone);
        if (!user) {
           user = await this.userRepository.create(phone) 
        }
        await this.otpRepository.markAsUsed(otp.id);

         const accessToken =
         await this.tokenService
         .generateAccessToken(
           user.id
         );

         const refreshToken =
         await this.tokenService
         .generateRefreshToken();

         const tokenHash =
         await this.hashService
         .hash(
         refreshToken
         );
         
         await this.refreshTokenRepository.create({
            userId: user.id,
            tokenHash,
            expiresAt: new Date(Date.now() + 30*24*60*60*1000 )
         });

         return {
            accessToken,
            refreshToken
         }
    }
}
