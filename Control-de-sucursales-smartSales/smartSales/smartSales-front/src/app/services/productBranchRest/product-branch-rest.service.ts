import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminRestService } from '../adminRest/admin-rest.service';
import { CompanyRestService } from '../companyRest/company-rest.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductBranchRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.companyRest.getToken()
  }) 

  constructor(
    private httP: HttpClient,
    private companyRest: CompanyRestService
  ) { }

  getProductBranch(idProduct: string){
    return this.httP.get(environment.baseUrl + 'productBranch/getProductBranch/' + idProduct, {headers:this.httOptions})
  }

  getProductsBranch(id: string){
    return this.httP.get(environment.baseUrl + 'productBranch/getProductsBranch/' + id, {headers:this.httOptions})
  };

  getProductsBranch2(id: string){
    return this.httP.get(environment.baseUrl + 'productBranch/getProductsBranch2/' + id, {headers:this.httOptions})
  };

  addProductBranch(params:{}){
    return this.httP.post(environment.baseUrl + 'productBranch/addProductBranch', params, {headers:this.httOptions})
  };

  addSale(id: string, params: any){
    let body = JSON.stringify({'sale':params});
    return this.httP.post(environment.baseUrl + 'productBranch/addSale/' + id, body, {headers:this.httOptions} )
  };
  
}
