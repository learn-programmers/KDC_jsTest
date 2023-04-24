import createQuery from '../utils/createQuery';

describe('createQuery.js', () => {
	test('변환1', () => {
		const input = {
			page: 1
		}

		const output = 'page=1';

		expect(createQuery(input)).toStrictEqual(output);
	});

	test('변환2', () => {
		const input = {
			page: 1,
			limit: 10
		}

		const output = 'page=1&limit=10';

		expect(createQuery(input)).toStrictEqual(output);
	});

	test('변환3', () => {
		const input = {
			page: 1,
			limit: 10,
			totalCount: 5
		}

		const output = 'page=1&limit=10&totalcount=5';

		expect(createQuery(input)).toStrictEqual(output);
	});
});