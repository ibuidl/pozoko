// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('https://example.com/api/data', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
