const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

app.use(
	cors({
		origin: 'https://nasa-mission-control-api.herokuapp.com/',
	})
);

app.use(morgan('combined'));

app.use(express.json());

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (req, res) => {
	res.send('hello to nasa mission control api');
});

module.exports = app;
