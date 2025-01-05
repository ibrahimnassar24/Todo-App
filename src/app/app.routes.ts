import { Routes } from '@angular/router';
import { Pages } from './pages/pages';
import { authGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SecurityPageComponent } from './components/security-page/security-page.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: Pages.HomePage
    },
    {
        path: "test",
        component: Pages.TestPage
    },
    {
        path: "log",
        component: Pages.LogPage
    },
    {
        path: 'about',
        component: Pages.AboutPage,
        canActivate:[authGuard]
    },
    {
        path: 'settings',
        component: Pages.SettingsPage,
        canActivate: [authGuard],
        children: [
            {
                path: "",
                redirectTo: "profile",
                pathMatch: "full"
            },
            {
                path: "profile",
                component: ProfilePageComponent
            },
            {
                path: "security",
                component: SecurityPageComponent
            }
        ]
    }
];
