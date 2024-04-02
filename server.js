import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import {
  addNewuser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./Controllers/userController.js";
const executeEnv = dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.get("/users", getAllUsers);
app.post("/users", addNewuser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
app.all("*", (req, res) => {
  res.status(400).json({
    message: "Wrong path!!",
  });
});
app.listen(process.env.PORT || 5000, () => {
  console.log("connection secured");
});
