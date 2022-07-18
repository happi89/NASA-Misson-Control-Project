const {
	getAllLaunches,
	addNewLaunch,
	abortLaunch,
	launchExists,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
	const launch = req.body;

	if (
		!launch.mission ||
		!launch.launchDate ||
		!launch.rocket ||
		!launch.target
	) {
		return res.status(400).json({
			error: 'missing required launch property',
		});
	}

	launch.launchDate = new Date(launch.launchDate);
	if (isNaN(launch.launchDate)) {
		return res.status(400).json({
			error: 'Invalid Date',
		});
	}

	addNewLaunch(launch);

	return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
	const launchId = +req.params.id;

	if (!launchExists(launchId)) {
		return res.status(404).json({
			error: 'launch not found',
		});
	}

	const aborted = abortLaunch(launchId);
	return res.status().json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch };
