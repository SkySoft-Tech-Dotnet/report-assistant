export interface WindowOpenParameters {
    state: WindowState;
    url?: string;
    devTools?: boolean;
    serve?: boolean;
}

export interface WindowState {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	mode?: WindowMode;
    display?: number;
    show?: boolean;
}

export enum WindowMode {
	Maximized,
	Normal,
	Minimized,
	Fullscreen
}

