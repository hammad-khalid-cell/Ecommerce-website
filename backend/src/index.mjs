import express, { response } from "express";
import mongoose, { connect } from "mongoose";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import cors from "cors";
import { checkUserValidationSchema } from "./utils/checkUserValidationSchema.mjs";
import { User } from "./models/mongoose/schema/users.mjs";
import { hashPassword } from "./utils/helper.mjs";




const app = express();


app.use(cors());
app.use(express.json())

mongoose
    .connect("mongodb://localhost:27017/project")
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(`Error : ${err}`));




app.get("/", (request, response) => {
    response.send("server is ready")
})


// app.get("/api/users", (request, response) => {
//     response.json(users);
// })

app.post(
  "/api/users",
  checkSchema(checkUserValidationSchema),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = request.body; 
      if (!username || !email || !password) {
        return response.status(400).json({ error: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ error: "User already exists" });
      }

      const hashedpassword = await hashPassword(password);

      const newUser = new User({ username, email, password: hashedpassword });
      const savedUser = await newUser.save();

      response.status(201).json(savedUser);
      console.log("User saved:", username, email);
    } catch (err) {
      console.error("Error saving user:", err);
      response.status(500).json({ error: "Failed to save user" });
    }
  }
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

