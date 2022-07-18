const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 3001;
const MONGO_URL =
	'mongodb+srv://NASA-Mission-DB:taZWSh3R8a12pmq6@nasa-mission-database.uqd7lwx.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
	console.log('mongodb on');
});

mongoose.connection.on('error', (error) => {
	console.error(error);
});

async function startServer() {
	await mongoose.connect(MONGO_URL);
	await loadPlanetsData();
	server.listen(PORT, () => {
		console.log('listening at port', PORT);
	});
}

startServer();
