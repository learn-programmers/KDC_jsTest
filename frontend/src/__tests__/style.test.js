import style from '../utils/style.js';

describe('style.js', () => {
	test('동작 확인 1', () => {
		const input = {
			display: 'block',
			color: 'red',
			background: 'black'
		}

		const output = "display:'block';color:'red';background:'black';"

		expect(style(input)).toStrictEqual(output);
	});
});