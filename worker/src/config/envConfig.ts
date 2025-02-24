import path from "path"
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env.docker'
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });
export const config = {
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || "tech_challenge",
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://rabbitmq",
  ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL || "http://elasticsearch:9200",
  ELASTICSEARCH_INDEX: process.env.ELASTICSEARCH_INDEX || "order_logs",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "secret_access_token",
  API_REST_URL: process.env.API_REST_URL || "http://backend:3000"
};