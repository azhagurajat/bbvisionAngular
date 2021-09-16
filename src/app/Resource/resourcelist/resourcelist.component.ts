import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Resourceadd, Resourcelist } from '../model/resourcelist';

@Component({
  selector: 'app-resourcelist',
  templateUrl: './resourcelist.component.html',
  styleUrls: ['./resourcelist.component.css']
})
export class ResourcelistComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;

  displayedColumns: string[] = ['id', 'date', 'name', 'designation', 'contactno', 'resourcetype', 'status', 'tools'];
  dataSource!: MatTableDataSource<Resourcelist>;

  userroleview: Resourceadd[] = [];
  userroleedit: Resourceadd[] = [];
  resourceadd: Resourceadd[] = [
    {
      source: '', consultantname: '', date: '2021-08-06', postappliedfor: 'Guindy', firstname: 'az', lastname: 'raja', mobilenumber: '', whatsappnumber: '',
      emailid: '', adhaarnumber: '', degree: '', college: '', yearsofpassout: '', percentage: '', employeementstatus: '', certification: '', expectedctc: '', currentctc: '', feedback: '', interviewdate: '', remarks: ''
   ,save:'shedule' },

  ];

  res: Resourcelist = new Resourcelist();
  resourcelist: Resourcelist[] = [
    { id: '1', date: '2021-08-06', name: 'junior developer ', designation: 'Guindy', contactno: '9841016631', resourcetype: 'Experience', status: 'shedule', shedulestatus: false },
    { id: '2', date: '2021-09-07', name: 'senior developer ', designation: 'Poonamalle', contactno: '9841011531', resourcetype: 'Fresher', status: 'Not schedule', shedulestatus: true },
    { id: '3', date: '2021-09-05', name: 'junior developer ', designation: 'Trichy', contactno: '9846916631', resourcetype: 'Experience', status: 'shedule', shedulestatus: false },
    { id: '4', date: '2021-11-01', name: 'senior developer ', designation: 'Salem', contactno: '9849311531', resourcetype: 'Fresher', status: 'Not schedule', shedulestatus: true },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  



  constructor(public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.resourcelist);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  shedule(row:any) {
 
    const t = this.resourceadd.filter((elem: any) => elem.id === row.id); 
    
    this.router.navigateByUrl("/resourcelistadd",{state:this.resourceadd} );
  }


  navigate(row: any) {
    debugger;
    const t = this.resourceadd.filter((elem: any) => elem.id === row.id); 
    this.resourceadd[0].save = "update";
    this.router.navigateByUrl("/resourcelistadd", { state: this.resourceadd });
  }

}
