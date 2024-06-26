import { Component } from "wex-js";
import { Observable } from "wex-js";

class HomeApp extends Component {
	names = new Observable(this);
	fluxControl = new Observable(this);
	name = new Observable(this);

	constructor() {
		super("home-app", ["text-app"]);
	}

	connectedCallback() {
		super.connectedCallback();
	}

	add() {
		if (this.name._value !== undefined && this.name._value !== null) {
			if (this.names._value === null) this.names._value = [this.name._value];
			else this.names._value = [...this.names._value, this.name._value];

			this.fluxControl._value = true;
		}

		this.name._value = null;
	}
}

export { HomeApp };
