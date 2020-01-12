import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';


const admins = ['adnan@email.com', 'raga', 'Password 1111'];

@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {

    constructor(private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.userService.getDecodedAccessToken(localStorage.getItem('token'));
        const email = token.user.email;
        if (admins.includes(email)) {
            return true;
        } else {
            return false;
        }
    }
}
