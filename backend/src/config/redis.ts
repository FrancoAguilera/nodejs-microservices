import Redis from "ioredis";
import { config } from "./envConfig";

const { REDIS_HOST, REDIS_PORT } = config;

const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT)
});

export default redis;