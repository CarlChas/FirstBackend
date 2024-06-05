import { PrismaClient } from '@prisma/client';
import { authenticate } from '../../../middleware/auth';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const pokemons = await prisma.pokemon.findMany();
    res.json(pokemons);
  } else if (req.method === 'POST') {
    const { name, type, userId } = req.body;
    const newPokemon = await prisma.pokemon.create({
      data: { name, type, userId },
    });
    res.json(newPokemon);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default authenticate(handler);
