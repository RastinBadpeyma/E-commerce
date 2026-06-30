import { createHash } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { IHashService } from "../../application/interfaces/hash-service";

@Injectable()
export class HashService implements IHashService {
    async hash(value: string): Promise<string> {
        return createHash("sha256")
            .update(value)
            .digest("hex");
    }
}
