"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const client_1 = require("@prisma/client");
const socket_io_1 = require("socket.io");
const prisma = new client_1.PrismaClient();
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
exports.io = io;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log('Connected to database');
            io.on('connection', (socket) => {
                console.log(socket.id);
                console.log('A user connected:', socket.id);
                socket.on('sendMessage', (data) => {
                    io.emit('receiveMessage', data);
                });
                socket.on('disconnect', () => {
                    console.log('A user disconnected');
                });
            });
            server.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.log('Error connecting to the database:', err);
        }
    });
}
main();
