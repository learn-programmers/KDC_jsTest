export default function paintCatDetail(catInfo) {
	const catDetail = catInfo
		.map(
			(cat) =>
				`<div class="item"><img src="${cat.url}" alt="${cat.name}" /></div>`
		)
		.join("");

	return catDetail;
}