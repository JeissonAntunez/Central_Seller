// apps/api/src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import { authService } from '../services/auth.service'

export class AuthController {
  
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register({
        ...req.body,
        ipAddress: req.ip || (req.headers['x-forwarded-for'] as string),
        userAgent: req.headers['user-agent']
      })

      res.status(201).json({
        success: true,
        message: 'Cuenta creada exitosamente',
        user: result.user,
        tokens: result.tokens
      })

    } catch (error: any) {
      console.error('Error en registro:', error)
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear la cuenta'
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body)

      res.json({
        success: true,
        message: 'Login exitoso',
        user: result.user,
        tokens: result.tokens
      })

    } catch (error: any) {
      console.error('Error en login:', error)
      res.status(401).json({
        success: false,
        message: error.message || 'Credenciales inválidas'
      })
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token requerido'
        })
      }

      const result = await authService.refreshToken(refreshToken)

      res.json({
        success: true,
        ...result
      })

    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Token inválido'
      })
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body
      
      if (refreshToken) {
        await authService.logout(refreshToken)
      }

      res.json({
        success: true,
        message: 'Logout exitoso'
      })

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export const authController = new AuthController()