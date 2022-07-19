import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search2'
})
export class Search2Pipe implements PipeTransform {

  transform(productBranchs:any, search:any){
    if(search == undefined){
      return productBranchs;
    }else{
      return productBranchs.filter( (productBranch:any) => {
        return productBranch.productCompany.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  };

}
