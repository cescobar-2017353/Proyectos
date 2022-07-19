import { Component, OnInit } from '@angular/core';
import { UserRestService } from '../services/userRest/user-rest.service';
import { UserModel } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: UserModel;
  idUser: any

  userUpdate: any



  constructor(
    public activateRoute: ActivatedRoute,
    private userRest: UserRestService
  ) {
    this.user = new UserModel('','','','','','',''); 
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idU:any) =>{
      this.idUser = idU.get('id')
    });
    this.getUser()
  };

  getUser(){
    this.userRest.getUser(this.idUser).subscribe({
      next:(res:any)=>{
        this.user = res.user;
        console.log(this.user);
        this.userUpdate = res.user
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  updateUser(){
    this.userUpdate.role = undefined;
    this.userUpdate.password = undefined;
    this.userRest.updateUser(this.userUpdate).subscribe({
      next:(res:any)=>{
        alert(res.message)
        this.getUser()},
      error:(err)=> alert(err.error.message || err.error)

    })
  };

  

 



}
