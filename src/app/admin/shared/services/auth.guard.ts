import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSerice } from './auth.services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthSerice, private router: Router) {
        
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if(this.auth.isAuthenticated()) {
            return true;
        } else {
            this.auth.logout();
            this.router.navigate(['/admin','login'], {
                queryParams: {
                    loginAgain: true
                }
            })
        }
    }

}