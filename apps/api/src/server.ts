import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import authRoutes from "./routes/auth.routes"

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Health check
app.get("/", (_, res) => {
  res.send("API Central Seller funcionando 🚀")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
