import { AttributeConstants } from "../constants/attribute-constants.mjs";

/**
 * Class representing an observable value.
 */
class Observable {
	/**
   * Creates an instance of Observable.
   * @param {Component} [component=null] - The component associated with the observable (optional).
   */
	constructor(component = null) {
		/**
     * The current value of the observable.
     * @type {*}
     * @private
     */
		this._value = null;

		/**
     * Array of observer functions.
     * @type {Function[]}
     * @private
     */
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

	/**
   * Notifies all observers when a property value changes.
   * @param {string} prop - The property that changed.
   * @param {*} value - The new value of the property.
   * @private
   */
	_observableNotificator(prop, value) {
		this._observables.forEach(observer => observer(prop, value));
	}

	/**
   * Adds an observer function to the list of observers.
   * @param {Function} observer - The observer function to add.
   */
	observe(observer) {
		this._observables.push(observer);
	}
}

export { Observable };
