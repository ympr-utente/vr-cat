// src/socket/socket-manager.js
import { io } from "socket.io-client";

const urlLocalServer = "http://localhost:8080";
const urlDeployServer = "https://vr-cat-re9b.onrender.com";

/**
 * Socket connection
 */
export const socket = io(urlLocalServer); // se usa este para desarrollo 
// export const socket = io(urlDeployServer); // hay que dejar este creo para que funcione en producción
