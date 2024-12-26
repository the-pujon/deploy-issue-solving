import { createServer } from 'http';
import app from './app';
import config from './app/config';
import { PrismaClient } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';

const prisma = new PrismaClient();

const server = createServer(app);
const io = new SocketIOServer(server,{
    cors: {
      origin: ["http://localhost:3000","https://the-messenger-production.up.railway.app"] ,  
      methods: ["GET", "POST"],
      credentials: true,  
    },
  });

export { io };

async function main() {
    try {
        await prisma.$connect();    
        console.log('Connected to database')   

        io.on('connection', (socket) => {
            console.log(socket.id)
            console.log('A user connected:', socket.id);
            socket.on('sendMessage', (data) => {
                io.emit('receiveMessage', data);
            });
            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });

        server.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
}

main();

