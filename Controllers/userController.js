import asyncHandler from "express-async-handler";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../", "data.json");
console.log(filePath);

let data = [];
try {
  data = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (err) {
  console.error("Error reading data file:", err);
}
// console.log(data);

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err);
      return res.json({ message: "failded to add" });
    }
  });
}

export const getAllUsers = (req, res) => {
  res.json(data);
};

export const addNewuser = (req, res) => {
  const Userdata = req.body;
  if (data.some((ele) => ele.id == Userdata.id))
    return res.status(400).json({ message: "User already present" });
  data.push(Userdata);
  saveData(data);
  return res.status(200).json(data);
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  const index = data.findIndex((user) => user.id == userId);

  if (index != -1) {
    data[index] = { ...data[index], ...updatedData };
    saveData(data);
    return res.json(data);
  } else return res.status(403).json({ message: "Invalid ID" });
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const index = data.findIndex((user) => user.id == userId);

  if (index != -1) {
    data = data.filter((user) => user.id != userId);
    saveData(data);
    return res.status(200).json(data);
  } else return res.status(403).json({ message: "Invalid ID to delete" });
};
