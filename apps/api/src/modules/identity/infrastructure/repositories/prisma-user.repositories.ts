import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class PrismaUserRepositories implements IUserRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async findByPhone(phone: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                phoneNumber: phone,
            },
        });

        return user ? this.toDomain(user) : null;
    }

    async create(phone: string): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                phoneNumber: phone,
            },
        });

        return this.toDomain(user);
    }

    private toDomain(user: {
        id: string;
        phoneNumber: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }): User {
        return new User(
            user.id,
            user.phoneNumber,
            user.role,
            user.createdAt,
            user.updatedAt,
        );
    }
}
