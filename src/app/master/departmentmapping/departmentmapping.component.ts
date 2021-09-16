import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { DepartmentMapping } from '../model/departmentmapping';
import { DepartmentmappingService } from '../service/departmentmapping.service';
@Component({
  selector: 'app-departmentmapping',
  templateUrl: './departmentmapping.component.html',
  styleUrls: ['./departmentmapping.component.css']
})
export class DepartmentmappingComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'departmentname', 'headname', 'status', 'tools'];
  dataSource!: MatTableDataSource<DepartmentMapping>;
  departmentmappingview: DepartmentMapping[] = [];
  departmentmappingedit: DepartmentMapping[] = [];
  departmentmapping: DepartmentMapping = new DepartmentMapping();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";

  constructor(public router: Router, private service: DepartmentmappingService, private commonservice: CommonService) {
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
      this.departmentmappingview = data.result;
      this.dataSource = new MatTableDataSource(this.departmentmappingview);
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
    const des: DepartmentMapping = new DepartmentMapping();
    this.departmentmappingedit[0] = des;
    this.router.navigateByUrl('/departmentmappingadd', { state: this.departmentmappingedit });
  }

  selectedrow(row: any) {
    this.departmentmappingedit = this.departmentmappingview.filter((elem: any) => elem.id === row.id)
    this.departmentmappingedit[0].save = "update"
    this.router.navigateByUrl('/departmentmappingadd', { state: this.departmentmappingedit });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
