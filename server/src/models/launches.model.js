const launches = new Map();

let latestLaunchNumber = 1;

const launch = {
	flightNumber: 1,
	mission: 'name',
	rocket: 'Kepler-1642 b',
	launchDate: new Date('September 04, 2023'),
	destination: 'Kepler-442 b',
	customers: ['ZTM', 'NASA'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
	return Array.from(launches.values());
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

module.exports = {
	getAllLaunches,
	addNewLaunch,
};
