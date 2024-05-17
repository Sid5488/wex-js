import { Component } from "../../../lib/src/modules/components/component.mjs";
import { Observable } from "../../../lib/src/observables/observables.mjs";

class HomeApp extends Component {
	names = new Observable(this);
	clickEvent = false;

	constructor() {
		super("home-app", ["text-app"]);
	}

	connectedCallback() {
		super.connectedCallback();
		
		this.getValueInput();
		this.add();
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

	add() {
		const button = this.shadowRoot.getElementById("button");

		if (!this.clickEvent) {
			button.addEventListener("click", _ => {
				if (this.names._value === null) this.names._value = [this.name];
				else this.names._value = [...this.names._value, this.name];
			});

			this.clickEvent = true;
		}
	}
}

export { HomeApp };
