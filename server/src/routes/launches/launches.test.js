const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
	test('It should respond with 200 success', async () => {
		const response = await request(app).get('/launches');
		expect(response.statusCode).toBe(200);
	});
});

describe('Test POST /launch', () => {
	const completeLaunchData = {
		mission: 'testing mission',
		rocket: 'test rocket',
		target: 'target planet',
		launchDate: 'January 4, 2028',
	};

	const completeLaunchDataWithoutDate = {
		mission: 'testing mission',
		rocket: 'test rocket',
		target: 'target planet',
	};

	const completeLaunchDataWithInvalidDate = {
		mission: 'testing mission',
		rocket: 'test rocket',
		target: 'target planet',
		launchDate: 'not a date',
	};

	test('It should response with 201 success', async () => {
		const response = await request(app)
			.post('/launches')
			.send(completeLaunchData)
			.expect('Content-type', /json/)
			.expect(201);

		const requestDate = new Date(completeLaunchData.launchDate).valueOf();
		const reponseDate = new Date(response.body.launchDate).valueOf();
		expect(reponseDate).toBe(requestDate);

		expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
	});

	test('It should catch missing required properties', async () => {
		const response = await request(app)
			.post('/launches')
			.send(completeLaunchDataWithoutDate)
			.expect('Content-type', /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: 'Missing required launch property',
		});
	});

	test('It should catch invalid dates', async () => {
		const response = await request(app)
			.post('/launches')
			.send(completeLaunchDataWithInvalidDate)
			.expect('Content-type', /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: 'Invalid Date',
		});
	});
});
