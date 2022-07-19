import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AdminRestService} from '../../app/services/adminRest/admin-rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(
    private adminRest: AdminRestService,
    public router: Router
  ){}

  canActivate(){ // boolano -> true/false
    if(this.adminRest.getIdentity().role =='ADMIN'){
      return true;
    }else{
      this.router.navigateByUrl('/home');
      return false;
    }
  }
  
}
