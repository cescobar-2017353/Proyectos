import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { companyModel } from 'src/app/models/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  company: companyModel;
  idCompany: any
  
  name: any;
  type:any;
  role:any;
  username:any

  
  constructor(
    public activateRoute: ActivatedRoute,
    private companyRest: CompanyRestService
  ) { 
    this.company = new companyModel('','','','','','');
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idC:any)=>{
      this.idCompany = idC.get('id');
    });
  
    this.name = this.companyRest.getIdentity().name
    this.type = this.companyRest.getIdentity().type
    this.role = this.companyRest.getIdentity().role
    this.username = this.companyRest.getIdentity().username
};

}
