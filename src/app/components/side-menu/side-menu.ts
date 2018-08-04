export class SideMenuItem {
    public isActive: boolean = false;
    constructor(
        public title: string,
        public routerLink: string,
        public icon: string
    ) { }
}
