class Observable {
	constructor() {
		this._value = null;
		this._observables = [];

		return new Proxy(this, {
			set: (obj, prop, value) => {
				obj[prop] = value;
				obj._observableNotificator(prop, value);

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
