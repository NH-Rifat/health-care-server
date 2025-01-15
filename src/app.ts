import express from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);

export default app;
