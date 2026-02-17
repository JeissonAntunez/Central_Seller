// apps/api/src/repositories/store.repository.ts
import { prisma } from '../config/database'
import slugify from 'slugify'

export class StoreRepository {
  
  async createStore(data: {
    ownerId: string
    storeName: string
    documentId: string
  }) {
    const slug = await this.generateUniqueSlug(data.storeName)

    return await prisma.store.create({
      data: {
        ownerId: data.ownerId,
        storeName: data.storeName,
        documentId: data.documentId,
        slug: slug,
        status: 'PENDING'
      }
    })
  }

  async findByOwnerId(ownerId: string) {
    return await prisma.store.findUnique({
      where: { ownerId }
    })
  }

  async documentExists(documentId: string): Promise<boolean> {
    const store = await prisma.store.findUnique({
      where: { documentId }
    })
    return !!store
  }

  async updateStatus(storeId: string, status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DELETED') {
    return await prisma.store.update({
      where: { id: storeId },
      data: { status }
    })
  }

  private async generateUniqueSlug(storeName: string): Promise<string> {
    let baseSlug = slugify(storeName, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    let slug = baseSlug
    let counter = 1

    while (await this.slugExists(slug)) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    return slug
  }

  private async slugExists(slug: string): Promise<boolean> {
    const store = await prisma.store.findUnique({
      where: { slug }
    })
    return !!store
  }
}