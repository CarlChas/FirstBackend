import { PrismaClient } from '@prisma/client'
import { authenticate } from '../../../middleware/auth'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const pokemon = await prisma.pokemon.findUnique({
        where: { id: Number(id) },
      })
      if (!pokemon) {
        return res.status(404).json({ message: 'Pokemon not found' })
      }
      res.json(pokemon)
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const pokemon = await prisma.pokemon.delete({
        where: { id: Number(id) },
      })
      res.json(pokemon)
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default authenticate(handler)
