// apps/api/src/repositories/user.repository.ts
import { prisma } from '../config/database'
import bcrypt from 'bcryptjs'

export class UserRepository {
  
  async createUser(data: {
    email: string
    password: string
    fullName: string
    phoneNumber?: string
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: 'SELLER',
        profile: {
          create: {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber ?? null
          }
        }
      },
      include: {
        profile: true
      }
    })

    return user
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        store: true
      }
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        store: true
      }
    })
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  async updateEmailVerified(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true }
    })
  }
}