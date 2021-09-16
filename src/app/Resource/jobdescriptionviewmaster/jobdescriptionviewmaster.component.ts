import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Button } from 'selenium-webdriver';
import { Buttons, JobdescriptionviewMaster } from '../model/jobdescriptionviewmaster';

@Component({
  selector: 'app-jobdescriptionviewmaster',
  templateUrl: './jobdescriptionviewmaster.component.html',
  styleUrls: ['./jobdescriptionviewmaster.component.css']
})
export class JobdescriptionviewmasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['Job title', 'location', 'experience', 'joining', 'closing', 'tools'];
  dataSource!: MatTableDataSource<JobdescriptionviewMaster>;
  jobdescriptionedit: JobdescriptionviewMaster[] = [];



  jobdescription: JobdescriptionviewMaster[] = [
    { id: 1, jdtitle: 'Trainee', client: 'raja	', location: 'Chennai', experience: '2', educationalqualification: '', certification: '', roles: '', skillsrequired: '', joining: '2000-09-01', closing: '2004-09-01', replacementfor: '', ctc: '', save: true, allocate: "", status: '' },
    { id: 2, jdtitle: 'experience', client: 'anto	', location: 'madurai', experience: '1', educationalqualification: '', certification: '', roles: '', skillsrequired: '', joining: '2005-09-01', closing: '2012-09-01', replacementfor: '', ctc: '', save: false, allocate: "", status: '' },
    { id: 3, jdtitle: 'Trainee', client: 'azhagu	', location: 'trichy', experience: '2', educationalqualification: '', certification: '', roles: '', skillsrequired: '', joining: '2015-09-01', closing: '2021-09-01', replacementfor: '', ctc: '', save: true, allocate: "", status: '' },
  ];
  jobdescriptions: JobdescriptionviewMaster = new JobdescriptionviewMaster()


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.jobdescription);


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    // const t: JobdescriptionviewMaster = new JobdescriptionviewMaster();

    this.router.navigateByUrl("/jobdescriptionviewmasteradd", { state: this.jobdescription });
  }
//c
  view(row: any) {
    debugger;
    this.jobdescriptionedit = this.jobdescription.filter((elem: any) => elem.id === row.id);
    this.jobdescriptionedit[0].status = "view";
    this.router.navigateByUrl("/jobdescriptionviewmasteradd", { state: this.jobdescriptionedit });
  }
  allocation(row: any) {
    debugger;
    this.jobdescriptionedit = this.jobdescription.filter((elem: any) => elem.id === row.id);
    this.jobdescriptionedit[0].status = "allocate";
    this.router.navigateByUrl("/jobdescriptionviewmasteradd", { state: this.jobdescriptionedit });
  }
  close(row: any) {

    this.jobdescriptionedit = this.jobdescription.filter((elem: any) => elem.id === row.id);
    this.jobdescriptionedit[0].status = "close";
    this.router.navigateByUrl("/jobdescriptionviewmasteradd", { state: this.jobdescriptionedit });
  }



}
