// apps/api/src/repositories/consent.repository.ts
import { prisma } from '../config/database'

export class ConsentRepository {
  
  async saveConsents(data: {
    userId: string
    consents: Array<{
      type: 'TERMS' | 'PRIVACY' | 'MARKETING'
      ipAddress?: string
      userAgent?: string
    }>
  }) {
    const consentsData = data.consents.map(consent => ({
      userId: data.userId,
      consentType: consent.type,
      ipAddress: consent.ipAddress ?? null,
      userAgent: consent.userAgent ?? null,
      version: '1.0'
    }))

    await prisma.userConsent.createMany({
      data: consentsData
    })
  }

  async getUserConsents(userId: string) {
    return await prisma.userConsent.findMany({
      where: { userId },
      orderBy: { acceptedAt: 'desc' }
    })
  }
}