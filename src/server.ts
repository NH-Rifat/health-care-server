import { Server } from "http";
import app from "./app";

const port = 3000;

async function main() {
  const server: Server = await app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
      });
    }
    process.exit(1);
  };
  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });

  return server;
}

main();
