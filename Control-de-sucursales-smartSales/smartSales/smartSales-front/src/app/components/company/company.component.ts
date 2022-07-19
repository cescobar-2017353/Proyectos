import { Component, OnInit } from '@angular/core';
import { companyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companys: any =[] ;
  company: companyModel;
  companyUpdate: any;

  search1:any;

  constructor(
    private companyRest: CompanyRestService
  ) {
    this.company = new companyModel( '', '', '', '', '', '' );
   }

  ngOnInit(): void {
  this.getCompanys();
  }
  
  getCompany(id: string){
    this.companyRest.getCompany(id).subscribe({
      next:(res:any)=>{this.companyUpdate = res.company},
      error:(err)=>{alert(err.error.message)}
    })
  };
  getCompanys(){
    this.companyRest.getCompanys().subscribe({
      next:(res:any)=>{
        this.companys = res.companys;
        console.log(this.companys);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  registerCompanyByAdmin(addCompanyForm:any){
    this.companyRest.registerCompanyByAdmin(this.company).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.company.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getCompanys()
        addCompanyForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
  updateCompanyByAdmin( ){
    this.companyUpdate.role = undefined;
    this.companyUpdate.password = undefined;
    this.companyRest.updateCompanyByAdmin(this.companyUpdate._id, this.companyUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.companyUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getCompanys()},
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
    })
  };
  deleteCompanyByAdmin(id: string){
    this.companyRest.deleteCompanyByAdmin(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.deleteCompany.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getCompanys();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
}