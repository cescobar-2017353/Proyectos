import { Component, OnInit } from '@angular/core';
import { UserRestService } from '../services/userRest/user-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: string = '';
  token: any;

  constructor(
    public userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.role = this.userRest.getIdentity().role;
    this.token = this.userRest.getToken();
  }

}
