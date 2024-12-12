import { Routes } from '@angular/router';
import { Pages } from './pages/pages';
import { HomePage } from './pages/home/home.page';
import { LogPage } from './pages/log/log.page';
import { authGuard } from './guards/auth.guard';

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
        component: LogPage
    },
    {
        path: 'about',
        component: Pages.AboutPage,
        canActivate:[authGuard]
    },
    {
        path: 'settings',
        component: Pages.SettingsPage
    }
];
