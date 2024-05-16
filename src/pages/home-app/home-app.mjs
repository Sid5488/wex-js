import { BaseHTMLComponent } from "../../../lib/src/modules/components/base-html-component.mjs";
import { Observable } from "../../../lib/src/observable/observables.mjs";

class HomeApp extends BaseHTMLComponent {
	names = [];
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
				this.names.push(this.name);

				const template = document
					.querySelectorAll("[w-for], [w-onclick]")[0].innerHTML;

				this.interpreterAttributes(
					this.shadowRoot.querySelectorAll("[w-for], [w-onclick]"), 
					template
				);
			});

			this.clickEvent = true;
		}
	}
}

export { HomeApp };
