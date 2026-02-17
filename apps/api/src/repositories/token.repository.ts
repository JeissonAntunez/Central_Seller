// apps/api/src/repositories/token.repository.ts
import { prisma } from '../config/database'
import { randomBytes } from 'crypto'

export class TokenRepository {
  
  async createRefreshToken(userId: string, expiresInDays: number = 7) {
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)

    return await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt
      }
    })
  }

  async findRefreshToken(token: string) {
    return await prisma.refreshToken.findUnique({
      where: { token }
    })
  }

  async deleteRefreshToken(token: string) {
    await prisma.refreshToken.delete({
      where: { token }
    })
  }

  async deleteUserTokens(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: { userId }
    })
  }

  async cleanExpiredTokens() {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
  }
}