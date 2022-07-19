import { Component, OnInit } from '@angular/core';
import { BranchRestService } from 'src/app/services/branchRest/branch-rest.service';
import { branchModel } from 'src/app/models/branch.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';


@Component({
  selector: 'app-branch-by-admin',
  templateUrl: './branch-by-admin.component.html',
  styleUrls: ['./branch-by-admin.component.css']
})
export class BranchByAdminComponent implements OnInit {
  branch: branchModel;
  branchs: any =[] ;

  idBranch: any
  idCompany:any
  company: any


  constructor(
    private branchRest: BranchRestService,
    public actiavateRoute: ActivatedRoute,
    private companyRest: CompanyRestService

  ) {
    this.branch = new branchModel('','','','');

   }

  ngOnInit(): void {
    this.actiavateRoute.paramMap.subscribe((idB:any)=>{
      this.idBranch = idB.get('id');
      });
    this.getBranchByAdmin();
    this.getCompany();
  }

  getBranchByAdmin(){
    this.branchRest.getBranchByAdmin(this.idBranch).subscribe({
      next:(res:any)=>{
        this.branchs = res.branchs;
        console.log(this.branchs);

      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  getCompany(){
    this.companyRest.getCompany(this.idCompany).subscribe({
      next:(res:any)=>{this.company = res.company},
      error:(err)=>{alert(err.error.message)}
    })
  };

}
