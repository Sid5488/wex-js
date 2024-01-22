class WexRouter extends HTMLElement {
	#routes = {};

	constructor() {
		super();

		this.#index();
		this.#onChangeCurrentPage();
	}

	#index() {
		Array.from(document.querySelectorAll("wex-route"))
			.map(route => {;
				this.#routes[route.getAttribute("path")] = {
					path: route.getAttribute("path"),
					title: route.getAttribute("title"),
					component: route.getAttribute("component")
				}
			});
	}

	#onChangeCurrentPage() {
		this.navigateTo(window.location.pathname);
	}

	addRoute(path, title, component) {
		this.#routes.push({ path, title, component });
	}

	async navigateTo(path) {
		const { component } = this.#routes[path] ? this.#routes[path] : "";
		const outlet = document.querySelector("#outlet");

		outlet.innerHTML = await this.#template(component);
	}

	async #template(component) {
		const [path] = document.URL.split(window.location.pathname);

		return await fetch(`${path}/src/pages/${component}/${component}.html`)
			.then(response => response.text());
	}

	set routes(route) {
		this.#routes.push(route);
	}

	get routes() {
		return this.#routes;
	}
}

export { WexRouter };
