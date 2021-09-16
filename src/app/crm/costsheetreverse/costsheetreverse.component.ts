import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Costsheetreverse } from '../crmmodel/costsheetreverse';

@Component({
  selector: 'app-costsheetreverse',
  templateUrl: './costsheetreverse.component.html',
  styleUrls: ['./costsheetreverse.component.css']
})
export class CostsheetreverseComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['call', 'date', 'companyname', 'location', 'contactnumber', 'followupdate', 'employee', 'status', 'tools'];
  dataSource!: MatTableDataSource<Costsheetreverse>;
  // costsheetreverse: Costsheetreverse[] = [
  //   { calltype: 'Incoming', date: '2021-08-06', companyname: 'Bluebase ', location: 'Guindy', contactnumber: '9841016631', followupdate: '2021-08-07',department:"", employee: 'Rajeshwari',status: 'EnquiryAdded',color:"green" },
  //   { calltpype: 'Direct', date: '2021-0-30', companyname: 'Bhastrik Ltd ', location: 'Chennai', contactnumber: '9884007875', followupdate: '2021-07-07',department:"", employee: 'Gopinath', status: 'Generated Lead',color:"blue" },
  // ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() { }

  ngOnInit(): void {
  }

}
