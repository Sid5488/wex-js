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
		const root = document.querySelector("#root");
		const createComponent = document.createElement(component);
		createComponent.innerHTML = await this.#template(component);

		if (root.children.length === 0) 
			root.appendChild(createComponent);

		Array.from(root.children).map(item => {
			if (item.localName === createComponent.localName) {
				item.remove(item);

				root.appendChild(createComponent);
			}
		});
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
