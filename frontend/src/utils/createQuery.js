export default function createQuery (paramObject) {
	return Object
		.keys(paramObject)
		.filter(key => paramObject[key] !== undefined)
		.map(key => `${key.toLocaleLowerCase()}=${paramObject[key]}`)
		.join('&');
}
