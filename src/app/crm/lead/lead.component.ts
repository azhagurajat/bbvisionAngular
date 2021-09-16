import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Leadtableview} from '../crmmodel/lead';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['call', 'date', 'companyname', 'location', 'contactnumber', 'department', 'employee', 'status', 'tools'];
  dataSource!: MatTableDataSource<Leadtableview>;
  leadtableedit: Leadtableview[] = [];
  leadtable: Leadtableview[] = [
    {
     id:1, call: 'Incoming', date: '2021-08-06', companyname: 'Bluebase ', location: 'Guindy', contactnumber: '9841016631', department: 'Management', employee: 'Rajeshwari',
      clienttype: '', address: '', clientname: '', designation: '', mailid: '', product: '', feedback: '', followupdate: '', status: 'Generated Lead', color: "blue",approvedstatus:"approved"
    },
    {
     id:2, call: 'Direct', date: '2021-0-30', companyname: 'MRF Ltd ', location: 'Chennai', contactnumber: '9884007875', department: 'Management', employee: 'Rajeshwari',
      clienttype: '', address: '', clientname: '', designation: '', mailid: '', product: '', feedback: '', followupdate: '', status: 'Generated Cost Sheet', color: "red",approvedstatus:"approved"
    },
    {
      id:3, call: 'Direct', date: '2000-0-30', companyname: 'Senthamarai Ltd ', location: 'Chennai', contactnumber: '9884007875', department: 'Management', employee: 'Rajeshwari',
       clienttype: '', address: '', clientname: '', designation: '', mailid: '', product: '', feedback: '', followupdate: '', status: 'Quatoation Generated', color: "green",approvedstatus:"approved"
     },
     {
      id:4, call: 'Incoming', date: '2002-0-30', companyname: 'alto Ltd ', location: 'Chennai', contactnumber: '9884007875', department: 'Management', employee: 'Rajeshwari',
       clienttype: '', address: '', clientname: '', designation: '', mailid: '', product: '', feedback: '', followupdate: '', status: 'Generated Lead', color: "blue",approvedstatus:"pending"
     },
     {
      id:5, call: 'Incoming', date: '2011-0-30', companyname: 'qubix Ltd ', location: 'Chennai', contactnumber: '9884007875', department: 'Management', employee: 'Rajeshwari',
       clienttype: '', address: '', clientname: '', designation: '', mailid: '', product: '', feedback: '', followupdate: '', status:  'Generated Cost Sheet', color: "red",approvedstatus:"pending"
     },
     {
      id:6, call: 'Direct', date: '2001-0-30', companyname: 'infologia Ltd ', location: 'Chennai', contactnumber: '9884007875', department: 'Management', employee: 'Rajeshwari',
       clienttype: '', address: '', clientname: '', designation: '', mailid: '', product: '', feedback: '', followupdate: '', status: 'Quatoation Generated', color: "green",approvedstatus:"pending"
     },
    

  ];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  intro:any;
 

  constructor(public router: Router) {
  

  }


  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.leadtable);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }

  
  navigate(row:any) {
    debugger;
    this.leadtableedit = this.leadtable.filter((elem: any)=> elem.id  === row.id)
    this.router.navigateByUrl("/leadadd", { state: this.leadtableedit });
  }
}

