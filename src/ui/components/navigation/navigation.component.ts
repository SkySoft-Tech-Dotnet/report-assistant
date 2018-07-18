import { Component } from '@angular/core';

@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss']
})

export class NavigationComponent {

    mainMenuItems: NavigationItem[] = [
        new NavigationItem('Dashboard', 'dashboard', 'dashboard'),
        new NavigationItem('Reports', 'reports', 'report'),
        new NavigationItem('Todo List', 'todo_list', 'list'),
        new NavigationItem('Notes', 'notes', 'notes'),
        new NavigationItem('Meetings', 'meetings', 'meeting_room')
    ];
    settingsMenuItems: NavigationItem[] = [
        new NavigationItem('Notifications', 'notifications', 'notifications'),
        new NavigationItem('Projects', 'projects', 'dehaze'),
        new NavigationItem('Other', 'other', 'bookmark')
    ];
    
    onClick(item: NavigationItem) {
        this.mainMenuItems.forEach(element => {
            element.isActive = false;
        });
        this.settingsMenuItems.forEach(element => {
            element.isActive = false;
        });
        item.isActive = true;
    }
}

class NavigationItem {
    public isActive: boolean = false;    
    constructor(public title: string, public routerLink: string, public icon: string){ }
}