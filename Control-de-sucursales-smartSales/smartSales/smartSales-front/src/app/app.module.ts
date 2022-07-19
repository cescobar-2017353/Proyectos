import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCompanyComponent } from './components/product-company/product-company.component';
import { CompanyComponent } from './components/company/company.component';
import { BranchComponent } from './components/branch/branch.component';
import { ProductBranchComponent } from './components/product-branch/product-branch.component';
import { BranchByAdminComponent } from './components/branch-by-admin/branch-by-admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchPipe } from './pipes/search.pipe';
import { PerfilComponent } from './components/perfil/perfil.component';
import { Search2Pipe } from './pipes/search2.pipe';
import { GraphComponent } from './components/graph/graph.component';
import { ChartsModule } from '@rinminase/ng-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProductCompanyComponent,
    CompanyComponent,
    BranchComponent,
    ProductBranchComponent,
    BranchByAdminComponent,
    NotFoundComponent,
    SearchPipe,
    PerfilComponent,
    Search2Pipe,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
