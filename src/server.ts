import { Server } from 'http';
import app from './app';
import config from './app/config';
import { PrismaClient } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';

const prisma = new PrismaClient();

const server = new Server(app);
const io = new SocketIOServer(server);

export { io };

async function main() {
    try {
        await prisma.$connect();       

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            // Example: Listen for a custom event
            socket.on('message', (data) => {
                console.log('Message received:', data);
                // Broadcast the message to all connected clients
                io.emit('message', data);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
}

main();

