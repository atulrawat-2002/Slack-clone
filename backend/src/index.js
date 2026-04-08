import express from 'express';
import morgan from "morgan";
import { connectDB } from './configs/dbConfig.js';
import { PORT } from './configs/serverConfigs.js';
import apiRouter from './routes/apiRoutes.js';
import bullServerAdapter from './configs/bullBoardConfig.js';
import { Server } from 'socket.io';
import { createServer } from "http";
import cors from "cors";
import { messageSocketHanlers } from './controllers/messageSocketController.js';
import { channelSocketHandlers } from './controllers/channelSocketController.js';
import { verifyEmailController } from './controllers/workSpaceController.js';
import cloudinary from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from './configs/cloudinaryConfig.js';
import { dmSocketHandler } from './controllers/dmSocketHandler.js';
import { configDotenv } from 'dotenv';

configDotenv()

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET 
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const dmNamespace = io.of('/dm');

dmNamespace.on("connection", (socket) => {
  dmSocketHandler(dmNamespace, socket);
  console.log('DM connection established', socket.id);
})

io.on('connection', (socket) => {
  console.log('********* channel connection established ***********', socket.id);
  messageSocketHanlers(io, socket);
  channelSocketHandlers(io, socket);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"))
app.use(cors())


app.use('/ui', bullServerAdapter.getRouter());
app.use('/api', apiRouter);
app.get('/verify/:token', verifyEmailController);

async function pingBot() {
  try {
    const response = await fetch("https://mdqs-backend.onrender.com/ping");
    const data = await response.json();
    console.log("Response from bot", data);
  } catch (error) {
    console.log("Error in ping bot", error.message)
  }
}

setInterval(async () => {
  try {
    await pingBot()
  } catch (error) {
    console.log("Error in ping bot interval", error.message);
  }
}, 1000 * 60 * 10);

app.get('/ping', async (req, res) => {
  try {
    res.status(200).json({
    message: "Ok from slack's backend"
  })
  } catch (error) {
    console.log('Error in getting ping request from bot', error.message);
  }
})

await connectDB()

server.listen(PORT, async () => {
  
  try {
    console.log(`App is listening on ${PORT}`);
  } catch (error) {
    console.log(error)
  }

});
