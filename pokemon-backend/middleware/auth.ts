import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends NextApiRequest {
  user?: string | object
}

export const authenticate = (handler: NextApiHandler): NextApiHandler => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      req.user = decoded
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}
