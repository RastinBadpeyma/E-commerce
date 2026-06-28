export class Otp {
  constructor(
    public readonly id: string,
    public phoneNumber: string,
    public code: string,
    public expiresAt: Date,
    public usedAt: Date | null,

  ) {}
  verify(inputCode:string){

    if(this.usedAt){
       throw new Error(
        "OTP already used"
       );
    }

    if(this.expiresAt < new Date()){
       throw new Error(
        "OTP expired"
       );
    }


    if(this.code !== inputCode){
       throw new Error(
        "Invalid OTP"
       );
    }

 }

 isExpired(){
    return this.expiresAt < new Date();
 }

}
