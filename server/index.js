import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";
import userRoute from "./routes/users.js";
//initialize the app
const app = express();
dotenv.config();
//limite image size uploaded
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// routes
app.use("/posts", postsRoutes);
app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
  })
  .catch((error) => {
    console.error(error);
  });
//addition to remove unnecesary warnings
mongoose.set("useFindAndModify", false);
