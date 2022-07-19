import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from '../services/userRest/user-rest.service';
import { UserModel } from "../models/user.model";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:UserModel;
  constructor(
    private userRest: UserRestService,
    public router: Router
  ) { 
    this.user = new UserModel('', '', '', '', '', '','');
  }

  ngOnInit(): void {
  }

  login(loginForm: any){
    this.userRest.login(this.user).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message + '   ' + this.user.username ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.userExist));
        this.router.navigateByUrl('/home');
      },
      error: (err)=> {alert(err.error.message || err.error)
      loginForm.reset()}

    })
  };
}
