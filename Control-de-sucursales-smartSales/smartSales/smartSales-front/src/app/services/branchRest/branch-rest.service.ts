import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyRestService } from '../companyRest/company-rest.service';

@Injectable({
  providedIn: 'root'
})
export class BranchRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken()
  })
  constructor(
    private http: HttpClient,
    private companyRest : CompanyRestService
  ) { }

  getBranchs(){
    return this.http.get(environment.baseUrl + 'branch/getBranchs',{headers:this.httOptions});
  };

  addBranch(params: {}){
    return this.http.post(environment.baseUrl + 'branch/addBranch' ,params, {headers:this.httOptions});
  };

  getBranch(id: string){
    return this.http.get(environment.baseUrl + 'branch/getBranch/' + id, {headers:this.httOptions});
  };

  updateBranch(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'branch/updateBranch/' + id, params,  {headers: this.httOptions});
   };

   deleteBranch(id: string){
    return this.http.delete(environment.baseUrl + 'branch/deleteBranch/' + id, {headers: this.httOptions});
   };

   getBranchByAdmin(id:string){
    return this.http.get(environment.baseUrl + 'branch/getBranchByAdmin/' + id,{headers:this.httOptions});

   }
}

