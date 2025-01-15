import { Component, ElementRef, Input, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button"
import { MatSlideToggleChange, MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatTabNavPanel, MatTabsModule} from "@angular/material/tabs"
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@Component({
    selector: 'app-nav-bar',
    imports: [
        RouterLink,
        MatButtonModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTabsModule,
        ProfileMenuComponent
    ],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

    @Input() panel!: MatTabNavPanel;
    activeLink = signal("");
    links = {
        home: "/home",
        about: "/about",
        test: "/test"
    };

    constructor(
        private router: Router
    ) {
        this.activeLink.set(this.router.url);
    }
    
    setActiveLink(path: string) {
        this.activeLink.set(path);
    }

    isactive(path: string) {
        return this.activeLink() === path;
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
