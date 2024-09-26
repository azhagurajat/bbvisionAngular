import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { Department, DepartmentView } from '../model/department';
import { DepartmentmasterService } from '../service/departmentmaster.service';

@Component({
  selector: 'app-departmentmaster',
  templateUrl: './departmentmaster.component.html',
  styleUrls: ['./departmentmaster.component.css']
})
export class DepartmentmasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<DepartmentView>;
  departmentview: DepartmentView[] = [];

  department: Department = new Department();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public router: Router, private service: DepartmentmasterService, private commonservice: CommonService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    debugger;
    this.service.view().then(data => {
      debugger;
      this.departmentview = data.result;
      this.dataSource = new MatTableDataSource(this.departmentview);
    }, err => {
      this.commonservice.message("Error", err, "error");
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    this.router.navigate(['/departmentmasteradd', "", "", false, "add"]);
  }

  selectedrow(row: any) {
    this.router.navigate(['/departmentmasteradd', row.name, row.id, row.status, "update"]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
