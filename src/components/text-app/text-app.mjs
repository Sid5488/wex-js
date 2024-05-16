import { BaseHTMLComponent } from "../../../lib/src/modules/components/base-html-component.mjs";

class TextApp extends BaseHTMLComponent {
	items = [1, 2, 3, 4, 5];
	count = 0;

	constructor() {
		super("text-app", [], true);
	}

	connectedCallback() {
		super.connectedCallback();

		// this.test();
	}

	test() {
		const loop = `for (const item of this.items) this.shadowRoot.querySelector("span").innerHTML += '<p>'+item+'</p>'`;

		if (this.shadowRoot.querySelector("span") !== null) {
			eval(loop);
		}
	}
}

export { TextApp };
