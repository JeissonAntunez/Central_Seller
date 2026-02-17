// apps/api/src/services/auth.service.ts
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository'
import { StoreRepository } from '../repositories/store.repository'
import { ConsentRepository } from '../repositories/consent.repository'
import { TokenRepository } from '../repositories/token.repository'

interface RegisterDTO {
  fullName: string
  email: string
  storeName: string
  documentId: string
  phoneNumber: string
  password: string
  acceptTerms: boolean
  acceptPrivacy: boolean
  ipAddress?: string
  userAgent?: string
}

interface LoginDTO {
  email: string
  password: string
}

export class AuthService {
  private userRepo = new UserRepository()
  private storeRepo = new StoreRepository()
  private consentRepo = new ConsentRepository()
  private tokenRepo = new TokenRepository()

  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'

  async register(data: RegisterDTO) {
    try {
      // 1. Validar email único
      const existingUser = await this.userRepo.findByEmail(data.email)
      if (existingUser) {
        throw new Error('Este correo electrónico ya está registrado')
      }

      // 2. Validar documento único
      const documentExists = await this.storeRepo.documentExists(data.documentId)
      if (documentExists) {
        throw new Error('Este documento de identidad ya está registrado')
      }

      // 3. Crear usuario con perfil
      const user = await this.userRepo.createUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber
      })

      // 4. Crear tienda
      const store = await this.storeRepo.createStore({
        ownerId: user.id,
        storeName: data.storeName,
        documentId: data.documentId
      })

      // 5. Registrar consentimientos
      const consents = []
      if (data.acceptTerms) {
        consents.push({
          type: 'TERMS' as const,
          ...(data.ipAddress && { ipAddress: data.ipAddress }),
          ...(data.userAgent && { userAgent: data.userAgent })
        })
      }
      if (data.acceptPrivacy) {
        consents.push({
          type: 'PRIVACY' as const,
          ...(data.ipAddress && { ipAddress: data.ipAddress }),
          ...(data.userAgent && { userAgent: data.userAgent })
        })
      }

      if (consents.length > 0) {
        await this.consentRepo.saveConsents({
          userId: user.id,
          consents
        })
      }

      // 6. Generar tokens
      const tokens = await this.generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
        storeId: store.id
      })

      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.profile!.fullName,
          phoneNumber: user.profile!.phoneNumber,
          role: user.role,
          emailVerified: user.emailVerified,
          store: {
            id: store.id,
            name: store.storeName,
            slug: store.slug,
            status: store.status
          }
        },
        tokens
      }

    } catch (error: any) {
      console.error('Error en registro:', error)
      throw error
    }
  }

  async login(data: LoginDTO) {
    try {
      // 1. Buscar usuario
      const user = await this.userRepo.findByEmail(data.email)
      if (!user) {
        throw new Error('Credenciales inválidas')
      }

      // 2. Verificar contraseña
      const isValidPassword = await this.userRepo.verifyPassword(data.password, user.password)
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas')
      }

      // 3. Generar tokens
      const tokens = await this.generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
        storeId: user.store?.id
      })

      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.profile!.fullName,
          phoneNumber: user.profile?.phoneNumber,
          role: user.role,
          emailVerified: user.emailVerified,
          store: user.store ? {
            id: user.store.id,
            name: user.store.storeName,
            slug: user.store.slug,
            status: user.store.status
          } : null
        },
        tokens
      }

    } catch (error: any) {
      console.error('Error en login:', error)
      throw error
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      // 1. Verificar token en DB
      const tokenRecord = await this.tokenRepo.findRefreshToken(refreshToken)
      if (!tokenRecord) {
        throw new Error('Token inválido')
      }

      // 2. Verificar expiración
      if (tokenRecord.expiresAt < new Date()) {
        await this.tokenRepo.deleteRefreshToken(refreshToken)
        throw new Error('Token expirado')
      }

      // 3. Obtener usuario
      const user = await this.userRepo.findById(tokenRecord.userId)
      if (!user) {
        throw new Error('Usuario no encontrado')
      }

      // 4. Generar nuevo access token
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          storeId: user.store?.id
        },
        this.JWT_SECRET,
        { expiresIn: '15m' }
      )

      return { accessToken }

    } catch (error: any) {
      throw error
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.tokenRepo.deleteRefreshToken(refreshToken)
    } catch (error) {
      // Silencioso, no importa si falla
    }
  }

  private async generateTokens(payload: {
    userId: string
    email: string
    role: string
    storeId?: string | undefined
  }) {
    // Access Token (corta duración)
    const accessToken = jwt.sign(
      {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        storeId: payload.storeId
      },
      this.JWT_SECRET,
      { expiresIn: '15m' }
    )

    // Refresh Token (larga duración, guardado en DB)
    const refreshTokenRecord = await this.tokenRepo.createRefreshToken(payload.userId, 7)

    return {
      accessToken,
      refreshToken: refreshTokenRecord.token
    }
  }
}

export const authService = new AuthService()