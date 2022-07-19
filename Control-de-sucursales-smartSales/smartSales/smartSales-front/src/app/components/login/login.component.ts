import { Component, OnInit } from '@angular/core';
import { adminModel } from 'src/app/models/admin.model';
import { companyModel } from 'src/app/models/company.model';
import { AdminRestService } from 'src/app/services/adminRest/admin-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  admin: adminModel;
  company: companyModel;

  constructor(
    public adminRest: AdminRestService,
    public router: Router
  ) { 
    this.admin = new adminModel('','','','','','','');
    this.company = new companyModel('','','','','','');
  }

  ngOnInit(): void {
  }

  login(loginForm: any){
    this.adminRest.login(this.company).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.search));
        this.router.navigateByUrl('/home')

      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
    loginForm.reset()
  }

}
