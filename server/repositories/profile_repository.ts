import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type UpdateUserPassword = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export type UpdateUserProfilePicture = {

}

export class ProfileRepository {
  private db: PrismaClient
  private static instance: ProfileRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

    static getInstance(db?: PrismaClient): ProfileRepository {
        if (!this.instance) {
        this.instance = new ProfileRepository(db!!);
        }
        return this.instance;
    }


    async updatePassword(userId: number, newPassword: string) {
        const password_hash = bcrypt.hashSync(newPassword);
        return this.db.user.update({
            where: { id: userId },
            data: { password_hash },
        });
    }

    async updateProfilePicture(userId: number, profile_image_url: string) {
        return this.db.profile.update({
        where: { id: userId },
        data: { profile_image_url },
        });
    }

  async getCurrentPasswordHash(userId: number) {
        const user = await this.db.user.findUnique({
            where: { id: userId },
        });
        return user?.password_hash;
    }

  async getUserById(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id
      },
    });
  }
}