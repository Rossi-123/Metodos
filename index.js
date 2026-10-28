import Server from "./server/server.js";
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();
const server = new Server();

try {
    await server.listen();
} catch (error) {
    console.error('No fue posible iniciar el servidor porque MongoDB no está disponible'.red);
    process.exit(1);
}
