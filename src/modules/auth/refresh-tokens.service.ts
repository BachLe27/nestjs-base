import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RefreshTokensService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { userId: string; value: string }) {
    const res = await this.prisma.refreshToken.create({
      data: {
        ...data,
        token: data.value,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });
    return res;
  }

  async findByUserId(userId: string) {
    return this.prisma.refreshToken.findFirst({
      where: { userId },
    });
  }

  async updateByUserId(userId: string, data: { value: string }) {
    const refreshToken = await this.findByUserId(userId);
    return this.prisma.refreshToken.update({
      data: {
        ...data,
        token: data.value,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
      where: { id: refreshToken?.id },
    });
  }

  async findByValue(refreshTokenValue: string) {
    return this.prisma.refreshToken.findFirst({
      where: { token: refreshTokenValue },
    });
  }

  async deleteByUserId(userId: string) {
    return this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async deleteById(id: string) {
    return this.prisma.refreshToken.delete({
      where: { id },
    });
  }
}
