export class SideMenuItem {
    public isActive = false;
    constructor(
        public title: string,
        public routerLink: string,
        public icon: string
    ) { }
}
