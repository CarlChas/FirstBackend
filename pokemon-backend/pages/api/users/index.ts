import { PrismaClient } from '@prisma/client'
import { authenticate } from '../../../middleware/auth'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany({ include: { pokemons: true } })
    res.json(users)
  } else if (req.method === 'POST') {
    const { email, name, password } = req.body
    const newUser = await prisma.user.create({ data: { email, name, password } })
    res.json(newUser)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default authenticate(handler)
