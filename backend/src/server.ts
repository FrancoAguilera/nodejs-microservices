import app from './app';
import { connectDB } from "./config/mongoDB";
import { config } from './config/envConfig';

const { PORT } = config;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
      console.error("Error starting the server:", error);
  }
};

startServer();