const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

let latestLaunchNumber = 1;

const launch = {
	flightNumber: 1,
	mission: 'name',
	rocket: 'Kepler-1642 b',
	launchDate: new Date('September 04, 2023'),
	target: 'Kepler-442 b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

function launchExists(launchId) {
	return launches.has(launchId);
}

async function getAllLaunches() {
	return await launches.find(
		{},
		{
			_id: 0,
			__v: 0,
		}
	);
}

async function saveLaunch() {
	const planet = await planets.findOne({
		keplerName: launch.target,
	});

	if (!planet) {
		throw new Error('No matching planets were found');
	}

	await launches.updateOne(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{
			upsert: true,
		}
	);
}

function addNewLaunch(launch) {
	latestLaunchNumber++;
	launches.set(
		latestLaunchNumber,
		Object.assign(launch, {
			success: true,
			upcoming: true,
			customers: ['Zero to Mastery', 'NASA'],
			flightNumber: latestLaunchNumber,
		})
	);
}

function abortLaunch(launchId) {
	const aborted = launches.get(launchId);
	aborted.upcoming = false;
	aborted.success = false;
	return aborted;
}

module.exports = {
	getAllLaunches,
	addNewLaunch,
	launchExists,
	abortLaunch,
};
