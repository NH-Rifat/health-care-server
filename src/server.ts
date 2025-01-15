import { Server } from "http";
import app from "./app";

const port = 3000;

async function main() {
  const server: Server = await app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  return server;
}

main();
