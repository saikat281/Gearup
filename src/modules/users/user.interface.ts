import { UserRole } from "../../../generated/prisma/enums";

export interface registerUserPayload {
    name: string,
    email: string,
    password: string,
    avatarUrl?: string,
    role? : UserRole,
}