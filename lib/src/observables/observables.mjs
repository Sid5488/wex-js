import { AttributeConstants } from "../constants/attribute-constants.mjs";

class Observable {
	constructor(component = null) {
		this._value = null;
		this._observables = [];

		return new Proxy(this, {
			set: (obj, prop, value) => {
				obj[prop] = value;
				obj._observableNotificator(prop, value);

				if (component !== null) {
					component.interpreterAttributes(
						component.shadowRoot.querySelectorAll(AttributeConstants.attributes),
						document.querySelectorAll(AttributeConstants.attributes)
					)
				}

				return true;
			}
		});
	}

	_observableNotificator(prop, value) {
		this._observables.forEach(observer => observer(prop, value));
	}

	observe(observer) {
		this._observables.push(observer);
	}
}

export { Observable };
