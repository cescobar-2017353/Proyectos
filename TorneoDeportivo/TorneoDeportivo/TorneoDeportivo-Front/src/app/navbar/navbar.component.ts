import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { UserRestService } from '../services/userRest/user-rest.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  role:string = '';
  id: string ='';
  
  //identity:any;
  

  constructor(
    public userRest: UserRestService
  ) { }

  ngOnInit(): void { 
    this.role = this.userRest.getIdentity().role;
    this.token = this.userRest.getToken();
    this.id = this.userRest.getIdentity()._id
    
    
  }

  logOut(){
    localStorage.clear(); //LIMPIA EL LOCAL STORAGE
  }

}

