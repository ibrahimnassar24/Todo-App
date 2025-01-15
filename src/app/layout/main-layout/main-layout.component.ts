import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule} from "@angular/material/tabs"
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    NavBarComponent,
    MatTabsModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
