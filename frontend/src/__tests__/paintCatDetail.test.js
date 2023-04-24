import paintCatDetail from '../utils/paintCatDetail.js';

describe('paintCatDetail.js', () => {
	test('동작 확인 케이스 1', () => {
		const input = [
			{
				url: 'http://google.com/a.png',
				name: '고양이1'
			}
		]

		const output = `<div class="item"><img src="http://google.com/a.png" alt="고양이1" /></div>`;

		expect(paintCatDetail(input)).toStrictEqual(output);
	});
});