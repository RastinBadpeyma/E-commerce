import { createHash } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { HashService } from "../../application/interfaces/hash-service";

@Injectable()
export class BcryptHashService implements HashService {
    async hash(value: string): Promise<string> {
        return createHash("sha256")
            .update(value)
            .digest("hex");
    }
}
