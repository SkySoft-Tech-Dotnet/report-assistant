export class SideMenuItem {
    constructor(
        public title: string,
        public routerLink: string,
        public icon: string,
        public isActive: boolean = false
    ) { }
}
