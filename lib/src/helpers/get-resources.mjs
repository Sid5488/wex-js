/**
 * Fetches a resource and returns its text content.
 * @param {string} resource - The URL of the resource to fetch.
 * @returns {Promise<string>} - A promise that resolves to the text content of the fetched resource.
 */
async function getResources(resource) {
	return await fetch(resource).then(response => response.text());
}

export { getResources };
