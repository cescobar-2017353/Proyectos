import { Pipe, PipeTransform } from '@angular/core';
import { productCompanyModel } from '../models/productCompany.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productCompanys:any, search:any){
    if(search == undefined){
      return productCompanys;
    }else{
      return productCompanys.filter( (productCompany:any) => {
        return productCompany.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  };


}
