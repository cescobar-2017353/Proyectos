import { Component, OnInit } from '@angular/core';
import { productBranchModel } from 'src/app/models/productBranch.model';
import { ActivatedRoute } from '@angular/router';
import { BranchRestService } from 'src/app/services/branchRest/branch-rest.service';
import { ProductBranchRestService } from 'src/app/services/productBranchRest/product-branch-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-branch',
  templateUrl: './product-branch.component.html',
  styleUrls: ['./product-branch.component.css']
})
export class ProductBranchComponent implements OnInit {
  productBranch: productBranchModel;
  productBranchs : any;
  sale: number = 0;
  product: any

  idBranch:any;
  branch:any


  search3: any['Producto11'];

  constructor(
    private productBranchRest: ProductBranchRestService,
    private branchRest: BranchRestService,
    private activateRoute:  ActivatedRoute
  ) { 
    this.productBranch = new productBranchModel('',0,0, '','');
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idL:any)=>{
      this.idBranch = idL.get('id');
    });
    this.getProductsBranch();
    this.getProductsBranch2();
    this.getBranch();
  }

  getBranch(){
    this.branchRest.getBranch(this.idBranch).subscribe({
      next:(res:any)=>{this.branch = res.branch},
      error:(err)=>{alert(err.error.message)}
    })
  };

  getProductBranch(id: string){
    this.productBranchRest.getProductBranch(id).subscribe({
      next:(res:any)=>{this.product = res.productBranch
        
        console.log(this.product)},
      error:(err)=>{alert(err.error.message)}
    })
  }

  getProductsBranch(){
    this.productBranchRest.getProductsBranch(this.idBranch).subscribe({
      next:(res:any)=>{
        this.productBranchs = res.productsOrder;
        console.log(this.productBranchs);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

  getProductsBranch2(){
    this.productBranchRest.getProductsBranch2(this.idBranch).subscribe({
      next:(res:any)=>{
        this.productBranchs = res.productsOrder;
        console.log(this.productBranchs);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
/*
  addProductBranch(addProductForm: any){
    this.productBranchRest.addProductBranch().subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getProductsBranch()
        addProductForm.reset()
      },
      error: (err) => alert(err.error.message || err.error)
    })
  };
*/
  addSale(addSaleForm:any){
    this.productBranchRest.addSale(this.product._id, this.sale).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: ' Venta realizada exitosamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getProductsBranch();
        this.getProductsBranch2();
        addSaleForm.reset()
        
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
    addSaleForm.reset()
  }

}
