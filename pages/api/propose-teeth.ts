import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

/**
 * Forwards facial landmark data to FastAPI backend for tooth setup proposal.
 * Returns downloadable STL file and JSON summary.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { landmarks } = req.body;
    const apiRes = await axios.post('http://localhost:8000/propose-teeth', { landmarks }, {
      responseType: 'arraybuffer'
    });
    // Assume FastAPI returns a multipart: STL and JSON summary
    // For demo, just forward the response
    res.status(200).send(apiRes.data);
  } catch (e: any) {
    res.status(500).json({ error: "Failed to propose teeth", details: e.message });
  }
}