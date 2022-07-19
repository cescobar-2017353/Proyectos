import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { productCompanyModel } from '../../models/productCompany.model';
import { ProductCompanyRestService } from '../../services/productCompanyRest/product-company-rest.service';
import { companyModel } from '../../models/company.model';
import { CompanyRestService } from '../../services/companyRest/company-rest.service';
import { ProductBranchRestService } from 'src/app/services/productBranchRest/product-branch-rest.service';
import { ActivatedRoute } from '@angular/router';
import { branchModel } from 'src/app/models/branch.model';
import { BranchRestService } from 'src/app/services/branchRest/branch-rest.service';
import { productBranchModel } from 'src/app/models/productBranch.model';

@Component({
  selector: 'app-product-company',
  templateUrl: './product-company.component.html',
  styleUrls: ['./product-company.component.css']
})
export class ProductCompanyComponent implements OnInit {
  productCompanys: any =['productsOrder2'] ;
  productCompany: productCompanyModel;
  productCompanyUpdate: any;

  company: any;
  name: string=''

  branchs: any =[];
  branch: branchModel;
  productBranch: productBranchModel;

search: any;
  

  constructor(
    private productCompanyRest: ProductCompanyRestService,
    private companyRest: CompanyRestService,
    private branchRest: BranchRestService,
    private productBranchRest: ProductBranchRestService,

  ) { 

    this.productCompany = new productCompanyModel('','','',0,'');
    this.productBranch = new productBranchModel('',0,0, '','');

    this.company = new companyModel( '', '', '', '', '', '' );
    this.branch = new branchModel('','','','');
  }

  ngOnInit(): void {
    this.getProducts();
    this.getProducts2();
    this.getBranchs();
    this.name = this.companyRest.getIdentity().name
  }

  



  getProducts(){
    this.productCompanyRest.getProducts().subscribe({
      next:(res:any)=>{
        this.productCompanys = res.productsOrder;
        console.log(this.productCompanys);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  getProducts2(){
    this.productCompanyRest.getProducts2().subscribe({
      next:(res:any)=>{
        this.productCompanys = res.productsOrder;
        console.log(res)
        console.log(this.productCompanys);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  getProductCompany(id: string){
    this.productCompanyRest.getProductCompany(id).subscribe({
      next:(res:any)=>{this.productCompanyUpdate = res.product
        console.log(this.productCompanyUpdate)},
      
      error:(err)=>{alert(err.error.message)}
    })
  };


  addProductCompany(addProductCompanyForm:any){
    this.productCompanyRest.addProductCompany(this.productCompany).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.productCompany.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getProducts();
        addProductCompanyForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
  updateProduct( ){
    this.productCompanyRest.updateProduct(this.productCompanyUpdate._id, this.productCompanyUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.productUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getProducts();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  deleteProduct(id: string){
    this.productCompanyRest.deleteProduct(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.deleteProduct.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getProducts();
        this.getProducts2();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
  getBranchs(){
    this.branchRest.getBranchs().subscribe({
      next:(res:any)=>{
        this.branchs = res.branchs;
        console.log(this.branchs);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  addProductBranch(addProductForm: any){
      this.productBranch.productCompany = this.productCompanyUpdate._id
      this.productBranchRest.addProductBranch(this.productBranch).subscribe({
       
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getBranchs();
        this.getProducts();
        addProductForm.reset()
        
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
    addProductForm.reset()
  };

}
