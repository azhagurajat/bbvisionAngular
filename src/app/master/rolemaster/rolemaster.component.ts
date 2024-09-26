import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Checked, RoleMaster } from '../model/rolemaster';

@Component({
  selector: 'app-rolemaster',
  templateUrl: './rolemaster.component.html',
  styleUrls: ['./rolemaster.component.css']
})
export class RolemasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('rname') nameElement!: ElementRef;
  displayedColumns: string[] = ['rname', 'rcode', 'status', 'tools', 'tools1'];
  dataSource!: MatTableDataSource<RoleMaster>;
  role: RoleMaster[] = [
    {
      rname: 'Interviewer', rcode: 'ROLE-001	', status: true,  color: 'rgb(137 185 236)', width: '40% ', button: 'View rolemapping', check: [{
        headingname: "Recruitment", check: [
          { name: 'ApplicationForm', view: false, edit: true, All: false },
          { name: 'CTC Approval', view: false, edit: true, All: false }]
      },
      {
        headingname: "Master", check: [
          { name: 'Department Master', view: false, edit: true, All: false },
          { name: 'Division Master', view: false, edit: true, All: false }]
      }
      ]
    },


    {
      rname: 'Admin', rcode: 'ROLE-002	', status: false,  color: 'rgb(202 157 193)', width: '40%', button: 'RoleMapping', check: [{
        headingname: "Payroll", check: [
          { name: 'Attendance', view: true, edit: true, All: true },
          { name: 'Holidays', view: true, edit: true, All: true }]
      },
      {
        headingname: "Staff", check: [
          { name: 'HOD', view: true, edit: true, All: true },
          { name: 'Birthday List', view: true, edit: true, All: true }]
      }
      ]
    },


  ];


  //checked: string[] = ['Application', 'Interview Feedback Form'];





  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router) { 
    debugger;
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.role));
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.role);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    this.router.navigate(['/rolemasteradd', "", "", false, "add"]);
  }

  selectedrow(row: any) {
    this.router.navigate(['/rolemasteradd', row.rname, row.rcode, row.status, "update"]);
  }
  selectedrow1(row: any) {
    this.router.navigate(['/rolemasteradd', row.rname, row.rcode, row.status, "view"]);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
