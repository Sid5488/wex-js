async function getResources(resource) {
	return await fetch(resource).then(response => response.text());
}

export { getResources };
