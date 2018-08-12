import {Component, OnInit} from '@angular/core';
import {SideMenuItem} from './side-menu';

@Component ({
    selector: 'rp-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

    mainMenuItems: SideMenuItem[] = [
        new SideMenuItem ('Dashboard', '/dashboard', 'dashboard', true),
        new SideMenuItem ('Reports', '/reports', 'report'),
        new SideMenuItem ('Todo List', '/todo-list', 'list'),
        new SideMenuItem ('Notes', '/notes', 'notes'),
        new SideMenuItem ('Meetings', '/meetings', 'meeting_room')
    ];
    settingsMenuItems: SideMenuItem[] = [
        new SideMenuItem ('Notifications', '/notifications', 'notifications'),
        new SideMenuItem ('Projects', '/projects', 'dehaze'),
        new SideMenuItem ('Other', '/other', 'bookmark')
    ];

    ngOnInit () {
    }

    onClick (item: SideMenuItem) {
        this.mainMenuItems.forEach (element => {
            element.isActive = false;
        });
        this.settingsMenuItems.forEach (element => {
            element.isActive = false;
        });
        item.isActive = true;
    }

    log () {
        console.log (window.location.href);
    }
}
