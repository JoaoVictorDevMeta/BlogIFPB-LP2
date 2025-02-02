import express from "express";
import morgan from "morgan";
import 'dotenv/config';
import cors from "cors";
import applyRoutes from "./src/routes/exports/router.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// todas rotas da api (servidor)
applyRoutes(app);

// para tratar errors no servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => [console.log(`Server is running on port ${PORT}`)]);