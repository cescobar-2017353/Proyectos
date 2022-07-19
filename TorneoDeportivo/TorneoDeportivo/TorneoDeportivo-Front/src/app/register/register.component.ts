import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserRestService } from "../services/userRest/user-rest.service";
import { UserModel } from "../models/user.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel;

  constructor(
    private userRest: UserRestService,
    private router: Router
  ) 
  { 
    this.user = new UserModel('', '', '', '', '', '','');
  }

  ngOnInit(): void {
    
  }

  register(registerForm:any){
    this.userRest.register(this.user).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.user.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        return this.router.navigateByUrl('/login');
      },
      error: (err)=> {
        registerForm.reset();
        return alert(err.error.message || err.error);
      }
    })
  }

}
