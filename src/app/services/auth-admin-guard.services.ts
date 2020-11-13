import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';



@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {

    constructor(private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.userService.getDecodedAccessToken(localStorage.getItem('token'));
        const email = token.user.email;
        const isAdmin = token.user.isAdmin;
        if (isAdmin) {
            return true;
        } else {
            return false;
        }
    }
}
