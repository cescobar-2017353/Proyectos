import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  }) 

  constructor(private http: HttpClient) { }

  register(params:{}){
    return this.http.post(environment.baseUrl + 'user/registerUser', params, {headers: this.httOptions});
  }

  login(params:{}){
    return this.http.post(environment.baseUrl +  'user/login', params, {headers: this.httOptions});
  }
  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  };

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity;
  };

  getUsers(){
    return this.http.get(environment.baseUrl + 'user/getUsers' , {headers: this.httOptions});
  };

  getUser(id: string){
    return this.http.get(environment.baseUrl + 'user/getUser/' +id , {headers: this.httOptions});

  }
  getMyUser(){
    return this.http.get(environment.baseUrl + 'user/getMyUser' , {headers: this.httOptions});

  }

  updateUserByAdmin(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'user/updateUserByAdmin/' + id, params,  {headers: this.httOptions});
   };

   deleteUserByAdmin(id: string){
    return this.http.delete(environment.baseUrl + 'user/deleteUserByAdmin/' + id, {headers: this.httOptions});
   };

   updateUser(params: string){
    return this.http.put(environment.baseUrl + 'user/updateUser', params,  {headers: this.httOptions});
   };
   
   registerUserByAdmin(params: {}){
    return this.http.post(environment.baseUrl + 'user/registerUserByAdmin' ,params, {headers: this.httOptions});
  };

}
