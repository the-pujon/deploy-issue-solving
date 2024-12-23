import { Server } from 'http';
import app from './app';
import config from './app/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();

        // Start the server
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
}

main();

