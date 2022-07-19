import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { UserRestService } from '../services/userRest/user-rest.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:any;
  user: UserModel;
  userUpdate: any;
  
    constructor(
      private userRest: UserRestService
      ){
      this.user = new UserModel('','','','','','',''); 
    }
  
    ngOnInit(): void {
      this.getUsers();
    }
  
    getUsers(){
      this.userRest.getUsers().subscribe({
        next:(res:any)=>{
          this.users = res.users;
          console.log(this.users);
        },
        error: (err) => console.log(err.error.message || err.error)
      })
    };

    getUser(id: string){
      this.userRest.getUser(id).subscribe({
        next:(res:any)=>{this.userUpdate = res.user},
        error:(err)=>{alert(err.error.message)}
      })
    };

    updateUserByAdmin( ){
      this.userUpdate.role = undefined;
      this.userUpdate.password = undefined;
      this.userRest.updateUserByAdmin(this.userUpdate._id, this.userUpdate).subscribe({
        next:(res:any)=>{
          Swal.fire({
            title: res.message + '  ' + res.userUpdate.name,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position:'center'
          })
          this.getUsers()},
        error:(err)=> alert(err.error.message || err.error)
      })
    };
  
    deleteUserByAdmin(id: string){
      this.userRest.deleteUserByAdmin(id).subscribe({
        next:(res:any)=>{
          Swal.fire({
            title: res.message + '  ' + res.deleteUser.name,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position:'center'
          })
          this.getUsers();
        },
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
      })
    };

    registerUserByAdmin(adduserForm:any){
      this.userRest.registerUserByAdmin(this.user).subscribe({
        next:(res:any)=>{
          Swal.fire({
            title: res.message + '  ' + res.user.name,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position:'center'
          })
          this.getUsers()
          adduserForm.reset()
        },
        error: (err)=> {alert(err.error.message || err.error)
          adduserForm.reset()}
      })
    };
  }

