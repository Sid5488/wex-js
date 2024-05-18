import { Component } from "../../../lib/src/modules/components/component.mjs";
import { Observable } from "../../../lib/src/observables/observables.mjs";

class HomeApp extends Component {
	names = new Observable(this);
	fluxControl = new Observable(this);
	name = new Observable(this);

	clickEvent = false;

	constructor() {
		super("home-app", ["text-app"]);
	}

	connectedCallback() {
		super.connectedCallback();

		this.add();
	}

	add() {
		const button = this.shadowRoot.getElementById("button");

		if (!this.clickEvent) {
			button.addEventListener("click", _ => {
				if (this.name._value !== undefined) {
					if (this.names._value === null) this.names._value = [this.name._value];
					else this.names._value = [...this.names._value, this.name._value];
	
					this.fluxControl._value = true;
				}
			});

			this.clickEvent = true;
		}
	}
}

export { HomeApp };
