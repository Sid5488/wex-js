import { BaseHTMLComponent } from "../../../lib/src/base-html-component.mjs";
import { Observable } from "../../../lib/src/observable/observables.mjs";

class HomeApp extends BaseHTMLComponent {
	constructor() {
		super("home-app", []);
	}

	connectedCallback() {
		super.connectedCallback();
		
		this.getValueInput();
	}

	getValueInput() {
		const inputObservable = new Observable();
		const input = this.shadowRoot.getElementById("name");

		if (input !== null) {

			input.addEventListener("input", (event) => {
				inputObservable._value = event.target.value;
				this.name = inputObservable._value;
	
				this.showValue();
			});
		}
	}

	showValue() {
		const value = this.shadowRoot.getElementById("value");

		value.innerText = this.name;
	}
}

export { HomeApp };
