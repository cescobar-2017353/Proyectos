
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminRestService } from '../adminRest/admin-rest.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  constructor(
    private http: HttpClient,
   
  ) {}

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken
    }else{
      token= '';
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
    return identity
  };

  getCompany(id: string){
    return this.http.get(environment.baseUrl + 'company/getCompany/' + id, {headers:this.httOptions});
  };
  getCompanys(){
    return this.http.get(environment.baseUrl + 'company/getCompanys',{headers:this.httOptions});
  };

  
  registerCompanyByAdmin(params: {}){
    return this.http.post(environment.baseUrl + 'company/registerCompanyByAdmin' ,params, {headers:this.httOptions});
  };
  updateCompanyByAdmin(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'company/updateCompanyByAdmin/' + id, params,  {headers: this.httOptions});
   };
   deleteCompanyByAdmin(id: string){
    return this.http.delete(environment.baseUrl + 'company/deleteCompanyByAdmin/' + id, {headers: this.httOptions});
   };

}