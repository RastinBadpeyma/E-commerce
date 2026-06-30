import { User } from "../entities/user";

export interface IUserRepository{
    findByPhone(phone: string): Promise<User | null>
    create(phone: string): Promise<User>
}