export default function stringCss(object) {
	let result = '';
	Object.keys(object).map((key) => {
		result += `${key}:`;
		result += `'${object[key]}';`
	});
	return result;
}
