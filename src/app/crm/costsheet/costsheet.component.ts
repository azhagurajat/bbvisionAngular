import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Costsheet, Costsheetadd } from '../crmmodel/costsheet';

@Component({
  selector: 'app-costsheet',
  templateUrl: './costsheet.component.html',
  styleUrls: ['./costsheet.component.css']
})
export class CostsheetComponent implements OnInit {

  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['call', 'date', 'companyname', 'location', 'contactnumber', 'followupdate', 'employee', 'status', 'tools'];
  dataSource!: MatTableDataSource<Costsheet>;
  costsheet:Costsheet[]=[]
  costsheetadd: Costsheetadd [] = []
  cost: Costsheet[] = [
    { call: 'Incoming', date: '2021-08-06', companyname: 'Bluebase ', location: 'Guindy', contactnumber: '9841016631', followupdate: '2021-08-07',department:"", employee: 'Rajeshwari', proposedfor:'a1b',client:'raja',proposeddate:'10/11/2021',version:'2.0',empname:'aaa',empemailid:'bbbbb',emptele:'ccc',scopestatement:'',bluebasesoftware:'',terms:'', status: 'EnquiryAdded',color:"green" },
    { call: 'Direct', date: '2021-02-30', companyname: 'Bhastrik Ltd ', location: 'Chennai', contactnumber: '9884007875', followupdate: '2021-07-07',department:"", employee: 'Gopinath', proposedfor:'b1c',client:'kavi',proposeddate:'11/11/2021',version:'3.0',empname:'bbb',empemailid:'ccc',emptele:'ddd',scopestatement:'eee',bluebasesoftware:'',terms:'', status: 'Generated Lead',color:"blue" },
  ];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedRowIndex: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
      this.dataSource = new MatTableDataSource(this.cost);
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  add() {
     //this.router.navigate(['/enquiryadd',false, "add"]);
  }

  selectedrow(row:any) {
    debugger;
    this.costsheet = this.cost.filter((elem: any)=> elem.id  === row.id)
    this.router.navigateByUrl("/costsheetadd", { state: this.costsheet });
  }
}

