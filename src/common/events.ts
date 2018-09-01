import { IDisposable } from './lifecycle';
import { LinkedList } from './linkedList';
import { EventArgs } from './events-args';

/**
 * To an event a function with one or zero parameters
 * can be subscribed. The event is the subscriber function itself.
 */
export interface Event<T extends EventArgs> {
	(listener: (e: T) => void, thisArgs?: T, disposables?: IDisposable[]): IDisposable;
}

export namespace Event {
	const disposable = { dispose() { } };
	export const none: Event<any> = function () { return disposable; };
}

type Listener = [Function, any] | Function;

export interface EmitterOptions<T> {
	onFirstListenerAdd?: Function;
	onFirstListenerDidAdd?: Function;
	onListenerDidAdd?: Function;
	onLastListenerRemove?: Function;
	onErrorInHandler?: (e: Error) => void;
	onHandled?: (e: T) => void;
}

/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
	class Document {

		private _onDidChange = new Emitter<(value:string)=>any>();

		public onDidChange = this._onDidChange.event;

		// getter-style
		// get onDidChange(): Event<(value:string)=>any> {
		// 	return this._onDidChange.event;
		// }

		private _doIt() {
			//...
			this._onDidChange.fire(value);
		}
	}
 */
export class Emitter<T extends EventArgs> {
	private _event: Event<T>;
	private disposed: boolean;
	private deliveryQueue: [Listener, T][];
	protected listeners: LinkedList<Listener>;

	private static readonly noop = function () { };
	constructor(private options?: EmitterOptions<T>) {
		if (!this.options)
			this.options = { } as EmitterOptions<T>;
	}

	public updateOptions(changeFunc: (options: EmitterOptions<T>) => void) {
		changeFunc(this.options);
	}

	/**
	 * For the public to allow to subscribe
	 * to events from this Emitter
	 */
	get event(): Event<T> {
		if (!this._event) {
			this._event = (listener: (e: T) => void, thisArgs?: T, disposables?: IDisposable[]) => {
				if (!this.listeners) {
					this.listeners = new LinkedList();
				}

				const firstListener = this.listeners.isEmpty();

				if (firstListener && this.options && this.options.onFirstListenerAdd) {
					this.options.onFirstListenerAdd(this);
				}

				const remove = this.listeners.push(!thisArgs ? listener : [listener, thisArgs]);

				if (firstListener && this.options && this.options.onFirstListenerDidAdd) {
					this.options.onFirstListenerDidAdd(this);
				}

				if (this.options && this.options.onListenerDidAdd) {
					this.options.onListenerDidAdd(this, listener, thisArgs);
				}

				let result: IDisposable;
				result = {
					dispose: () => {
						result.dispose = Emitter.noop;
						if (!this.disposed) {
							remove();
							if (this.options && this.options.onLastListenerRemove && this.listeners.isEmpty()) {
								this.options.onLastListenerRemove(this);
							}
						}
					}
				};
				if (Array.isArray(disposables)) {
					disposables.push(result);
				}

				return result;
			};
		}
		return this._event;
	}

	/**
	 * To be kept private to fire an event to
	 * subscribers
	 */
	fire(event?: T): void {
		if (this.listeners) {
			// put all [listener,event]-pairs into delivery queue
			// then emit all event. an inner/nested event might be
			// the driver of this

			if (!this.deliveryQueue) {
				this.deliveryQueue = [];
			}

			for (let iter = this.listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
				this.deliveryQueue.push([e.value, event]);
			}

			while (this.deliveryQueue.length > 0) {
				// tslint:disable-next-line:no-shadowed-variable
				const [listener, event] = this.deliveryQueue.shift();
				try {
					if (typeof listener === 'function') {
						listener.call(undefined, event);
					} else {
						listener[0].call(listener[1], event);
					}
				} catch (e) {
					if (this.options && this.options.onErrorInHandler) {
						this.options.onErrorInHandler(e);
					}

					// onUnexpectedError(e);
				}
			}

			if (this.options && this.options.onHandled) {
				this.options.onHandled(event);
			}
		}
	}

	dispose() {
		if (this.listeners) {
			this.listeners = undefined;
		}
		if (this.deliveryQueue) {
			this.deliveryQueue.length = 0;
		}
		this.disposed = true;
	}
}
