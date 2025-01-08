import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from "../../state/auth/auth.actions";
import { MatSidenavModule} from   "@angular/material/sidenav";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule} from "@angular/material/list"

@Component({
    selector: 'app-settings',
    imports: [
        RouterLink,
        RouterOutlet,
        MatSidenavModule,
        MatButtonModule,
        MatListModule
    ],
    templateUrl: './settings.page.html',
    styleUrl: './settings.page.scss'
})
export class SettingsPage {

}
