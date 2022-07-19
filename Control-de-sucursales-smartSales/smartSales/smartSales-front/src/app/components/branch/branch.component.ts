import { Component, OnInit } from '@angular/core';
import { branchModel } from 'src/app/models/branch.model';
import { companyModel } from 'src/app/models/company.model';
import { BranchRestService } from 'src/app/services/branchRest/branch-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branchs: any =[] ;
  branch: branchModel;
  branchUpdate: any;
  name: string='';
  company: any;

  search2: any;

  constructor(
    private branchRest: BranchRestService,
    private companyRest: CompanyRestService,
    
  ) { 
    this.branch = new branchModel('','','','');
    this.company = new companyModel('','','','','','');
    
  }

  ngOnInit(): void {
    
    
    this.getBranchs(),
    this.name = this.companyRest.getIdentity().name
  }

  getBranchs(){
    this.branchRest.getBranchs().subscribe({
      next:(res:any)=>{
        this.branchs = res.branchs;
        console.log(this.branchs);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  addBranch(addBranchForm:any){
    this.branchRest.addBranch(this.branch).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.branch.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getBranchs()
        addBranchForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  getBranch(id: string){
    this.branchRest.getBranch(id).subscribe({
      next:(res:any)=>{this.branchUpdate = res.branch},
      error:(err)=>{alert(err.error.message)}
    })
  };

  updateBranch(){
    this.branchRest.updateBranch(this.branchUpdate._id, this.branchUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.branchUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getBranchs()},
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
    })
  };

  deleteBranch(id: string){
    this.branchRest.deleteBranch(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.deleteBranch.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getBranchs();
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
