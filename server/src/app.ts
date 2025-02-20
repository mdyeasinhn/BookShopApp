import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import router from "./routes";


const app: Application = express();


//parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', router);


app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Blog server is Live",
  });
});

// Global Error Handler
app.use(globalErrorHandler)

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app;
