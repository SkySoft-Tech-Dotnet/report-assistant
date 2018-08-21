export class EventArgs { }

export class IpcEventArgs<T> extends EventArgs {
	public response: any;

	constructor(public data: T) {
		super();
	}
}
