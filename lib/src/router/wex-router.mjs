import { PageConstants } from "../constants/page-constants.mjs";

/**
 * Custom HTML element class for routing within a web application.
 * @extends {HTMLElement}
 */
class WexRouter extends HTMLElement {
	/** @type {Object} */
	#routes = {};

	constructor() {
		super();

		this.#index();
		this.#onChangeCurrentPage();
	}

	/**
   * Indexes routes defined in wex-route elements.
   * @private
   */
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

	/**
   * Initializes routing based on current page URL.
   * @private
   */
	#onChangeCurrentPage() {
		this.navigateTo(window.location.pathname);
	}

	/**
   * Adds a new route to the router.
   * @param {string} path - The path of the route.
   * @param {string} title - The title of the route.
   * @param {string} component - The component associated with the route.
   */
	addRoute(path, title, component) {
		this.#routes.push({ path, title, component });
	}

	/**
   * Navigates to a specified path.
   * @param {string} path - The path to navigate to.
   */
	async navigateTo(path) {
		const { component } = this.#routes[path] ? this.#routes[path] : "";
		const root = document.querySelector("#root");
		const createComponent = document.createElement(component);

		createComponent.innerHTML = await this.#template();

		if (root.children.length === 0) 
			root.appendChild(createComponent);

		Array.from(root.children).map(item => {
			if (item.localName === createComponent.localName) {
				item.remove(item);

				root.appendChild(createComponent);
			}
		});
	}

	/**
   * Fetches the template for the current page.
   * @private
   * @returns {Promise<string>} - The HTML template for the current page.
   */
	async #template() {
		return await fetch(`${PageConstants.treatedPagesPath}.html`)
			.then(response => response.text());
	}

	/**
   * Setter for the routes of the router.
   * @param {Object} route - The route object to add to the router.
   */
	set routes(route) {
		this.#routes.push(route);
	}

	/**
   * Getter for the routes of the router.
   * @returns {Object} - The routes configured in the router.
   */
	get routes() {
		return this.#routes;
	}
}

export { WexRouter };
