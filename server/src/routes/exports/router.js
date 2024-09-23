// Aqui farei as importações das rotas de cada módulo
// o padrão de nome sempre é o nome do módulo + Route
import blogRoute from "../blog.route.js";
import categoryRoute from "../category.route.js";
import userRoute from "../user.route.js";
import authRoute from "../auth.route.js";

// Abaixo fica a declaração de uso de cada rota
// note que envio uma função, com app como parâmetro
export default function applyRoutes(app) {
  app.use("/user", userRoute);
  app.use("/blog", blogRoute);
  app.use("/category", categoryRoute);
  app.use("/auth", authRoute)

    // rota nao existente
  app.all("*", (req, res) => {
    res.status(404).send({ error: "this route does not exist" });
  });
}
