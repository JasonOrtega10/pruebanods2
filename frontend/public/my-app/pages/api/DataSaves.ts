import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from "../../../../../backend/node_modules/@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { ip, takenTime, share, file } = req.body

    if (!ip || !takenTime || !share || !file) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    try {
      // Guarda el registro en la base de datos
      const log = await prisma.downLog.create({
        data: {
          ip,
          takenTime,
          share, // Convertir objeto a cadena JSON
          file, // Convertir objeto a cadena JSON
        },
      })

      res.status(200).json({ message: 'Log saved successfully', log })
    } catch (error) {
      console.error('Error saving log:', error)
      res.status(500).json({ error: 'Error saving log' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
