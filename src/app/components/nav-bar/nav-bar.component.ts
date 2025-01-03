import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from "@angular/material/button"
import { MatSlideToggleChange, MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatTabsModule} from "@angular/material/tabs"
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@Component({
    selector: 'app-nav-bar',
    imports: [
        RouterLink,
        RouterLinkActive,
        MatButtonModule,
        MatSlideToggleModule,
        MatTabsModule,
        ProfileMenuComponent
    ],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

    activeLink = 0;

    setActiveLink(index: number) {
        this.activeLink = index;
    }
    
    switchMode(e: MatSlideToggleChange) {

        const lst = document.body.classList;
        if (e.checked) {
            lst.add("dark-mode");
        } else {
            lst.remove("dark-mode");
        }

    }
}
