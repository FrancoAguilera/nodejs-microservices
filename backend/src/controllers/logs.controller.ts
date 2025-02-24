import { Request, Response } from "express";
import { Client } from "@elastic/elasticsearch";
import { config } from "../config/envConfig";
const client = new Client({ node: config.ELASTICSEARCH_URL });

export const retrieveLogs = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { ELASTICSEARCH_INDEX } = config;

    const { body: { hits: logs} } = await client.search({
      index: ELASTICSEARCH_INDEX,
      body: {
        query: {
          match: {
            orderId: orderId,
          },
        },
      },
    });

    return res.json({
      status: 200,
      data: logs.hits,
    })
  } catch (error) {
    const err = error as { statusCode?: number, message: string };
    console.error('Error fetching logs:', err.message);
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
}