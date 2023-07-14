import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import { Server } from "http";

const port = config.port;

process.on("uncaughtException", error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    const uri = config.database_url;
    await mongoose.connect(`${uri}`);
    console.log(`🛢 Database Connected Successfully`);

    app.listen(port, () => {
      console.log(`Server is running on  http://localhost:${port}`);
    });
  } finally {
    /* empty */
  }

  process.on("unhandledRejection", error => {
    console.error(error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main().catch(err => console.error(err.message));

process.on("SIGTERM", () => {
  console.error("SIGTERM Detected. Closing Server...");
  if (server) {
    server.close();
  }
});
