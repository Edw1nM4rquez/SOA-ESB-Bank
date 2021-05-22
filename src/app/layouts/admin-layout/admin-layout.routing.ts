import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AccountComponent } from 'src/app/pages/account/account.component';
import { ViewTransaccionComponent } from 'src/app/pages/view-transaccion/view-transaccion.component';
import { LibrosComponent } from 'src/app/pages/libros/libros.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'account',           component: AccountComponent },
    { path: 'transaccion',           component: ViewTransaccionComponent },
    { path: 'libros',           component: LibrosComponent },
];
