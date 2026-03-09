import express from 'express';
import morgan from "morgan";

import { connectDB } from './configs/dbConfig.js';
import { PORT } from './configs/serverConfigs.js';
import apiRouter from './routes/apiRoutes.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("common"))


app.use('/api', apiRouter);



app.listen(PORT, async () => {
  connectDB()
  console.log(`App is listening on ${PORT}`);
});
