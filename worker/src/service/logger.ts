import { Client } from "@elastic/elasticsearch";
import { config } from "../config/envConfig";

const client = new Client({ node: config.ELASTICSEARCH_URL });

export const logOrderStatus = async (orderId: string, status: string) => {
  try {
    const { ELASTICSEARCH_INDEX } = config;
    await client.index({
      index: ELASTICSEARCH_INDEX,
      body: {
        orderId,
        status,
        dateTime: new Date(),
      },
    });

    console.log(`Log sent to Elasticsearch: Order ${orderId} - ${status}`);
  } catch (error) {
    console.error("Error sending log to Elasticsearch:", error);
  }
};