import { Component } from "../../../lib/src/modules/components/component.mjs";

class TextApp extends Component {
	constructor() {
		super("text-app", [], true);
	}

	connectedCallback() {
		super.connectedCallback();
	}
}

export { TextApp };
