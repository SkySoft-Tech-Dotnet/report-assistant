import {CoreModule} from './modules/core.module';
import {SharedModule} from './modules/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppLayoutComponent} from './layouts/app.layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {SideMenuItemComponent} from './components/side-menu/side-menu-item/side-menu-item.component';

@NgModule ({
    declarations: [
        AppComponent,
        SideMenuComponent,
        SideMenuItemComponent,
        AppLayoutComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
