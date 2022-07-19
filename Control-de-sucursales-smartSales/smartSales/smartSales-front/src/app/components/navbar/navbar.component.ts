import { Component, OnInit } from '@angular/core';
import { AdminRestService } from 'src/app/services/adminRest/admin-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  role:string = '';
  id: string ='';
  constructor(
    public adminRest: AdminRestService
  ) { }

  ngOnInit(): void {
    this.role = this.adminRest.getIdentity().role;
    this.token = this.adminRest.getToken();
    this.id = this.adminRest.getIdentity()._id
  }
  logOut(){
    localStorage.clear(); //LIMPIA EL LOCAL STORAGE
  }

}
