"use strict";

import socketIOClient from "socket.io-client";

const urlLocalServer = "http://localhost:8080";
const urlDeployServer = "https://vr-cat.vercel.app/";

/**
 * Socket connection
 */
export const socket = socketIOClient(urlDeployServer);