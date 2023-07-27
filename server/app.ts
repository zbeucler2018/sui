import { WebSocketServer, WebSocket } from 'ws';
import * as http from 'http';
import express, { Express } from 'express';
import * as fs from 'fs';

////
// Type definitions
////

type DataRequest = {
	_type: "data" | "command";
	appName?: string; // is this needed? server already knows appName
	propsStub?: string; // remove if this isn't needed / figure out what this is for
	tabName: string;
	zmqPort: number;
	zmqCommand: string;
}

interface Client {
	id: number;
	websocket: WebSocket;
	currentTab?: string;
	zmqsocket?: any;
}



const app: Express = express();
const server: http.Server = http.createServer(app);
const wss: WebSocketServer = new WebSocket.Server({ server });
const clients: Map<number, Client> = new Map();


const handleRequest = (msg: any, client: Client) => {
    console.log(`Got request from ${client.id}, ${JSON.stringify(msg)}`);
	client.websocket.send( JSON.stringify({'whom': "server"}) );
}


wss.on('connection', (socket: WebSocket) => {

	// handle new client
	const clientId = clients.size + 1;
	const newClient: Client = { id: clientId, websocket: socket };
	clients.set(clientId, newClient);
    console.log(`client ${clientId} connected`)

	// handle incomming message
	socket.on('message', (_msg: string) => {
		const msg = JSON.parse(_msg);
		handleRequest(msg, newClient);
	});

	// handle client leaving
	socket.on('close', () => {
		// newClient?.zmqSocket.close();
		clients.delete(clientId);
        console.log(`Client ${clientId} disconnected`);
	});
});


// handle props
const propsQuery = '/:appName/props'
app.get(propsQuery, async (req, res) => {
	let _props;
	try {
		_props = require('../test_data/ui.jsonc');
	} catch (err) {
		console.error("Couldnt find props. Got error", err);
		_props = { "error!": "Could not find props"}
	}
	res.json(_props);
})


const PORT = 4100;
server.listen(PORT, () => {
	console.log('Server running');
});
