import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminRestService } from 'src/app/services/adminRest/admin-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;
  role:string = '';

  constructor(
    public adminRest: AdminRestService
  ) { }

  ngOnInit(): void {
    this.role = this.adminRest.getIdentity().role;
    this.token = this.adminRest.getToken();
  }

}
