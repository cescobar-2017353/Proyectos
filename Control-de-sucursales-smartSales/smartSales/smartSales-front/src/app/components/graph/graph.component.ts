import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductBranchRestService } from 'src/app/services/productBranchRest/product-branch-rest.service';
import { BranchRestService } from 'src/app/services/branchRest/branch-rest.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  idBranch :any
  productBranchs:any = []
  branch:any

  chartOptions1 = {
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
    }
  };
  chartLabels1: any = [];
  chartLegend1 = true;
  chartPlugins1 = [];

  chartData1: any = [{
     data: [

     ], 
     label: 'PRODUCTOS VENDIDOS' 
    }];

    chartColors: any = [
      {
        backgroundColor: [],
      },
  ];

  constructor(
    public activateRoute: ActivatedRoute,
    private productBranchRest: ProductBranchRestService,
    private branchRest: BranchRestService

  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idB:any)=>{
      this.idBranch = idB.get('id');
    });
    this.getProductsBranch();
    this.getBranch();
  }

  getBranch(){
    this.branchRest.getBranch(this.idBranch).subscribe({
      next:(res:any)=>{this.branch = res.branch},
      error:(err)=>{alert(err.error.message)}
    })
  };

  getProductsBranch(){
    this.productBranchRest.getProductsBranch(this.idBranch).subscribe({
      next:(res:any)=>{
        this.productBranchs = res.productsOrder;
        console.log(this.productBranchs);
        this.productBranchs.forEach((productBranch: any) => {
          this.chartLabels1.push(productBranch.productCompany.name);
          this.chartData1[0].data.push(productBranch.totalSales);
          this.chartColors[0].backgroundColor.push(
            `#${Math.floor(Math.random() * 16777215).toString(16)}`
          );
      });
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }


}
