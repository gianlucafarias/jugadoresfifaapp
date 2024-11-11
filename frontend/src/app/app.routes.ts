import { Routes } from '@angular/router';
import { ListPlayersComponent } from './views/list-players/list-players.component';
import { ViewPlayerComponent } from './views/view-player/view-player.component';
import { NewPlayerComponent } from './views/new-player/new-player.component';
import { EditPlayerComponent } from './views/edit-player/edit-player.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './views/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/players', pathMatch: 'full' },
    { path: 'players', component: ListPlayersComponent, canActivate: [AuthGuard] },
    { path: 'players/:fifa_version/:id', component: ViewPlayerComponent, canActivate: [AuthGuard] },
    { path: 'players/:fifa_version/:id/edit', component: EditPlayerComponent, canActivate: [AuthGuard] },
    { path: 'players/create', component: NewPlayerComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];
