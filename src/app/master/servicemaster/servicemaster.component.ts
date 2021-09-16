import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { ServiceMaster } from '../model/servicemaster';
import { ServicemasterService } from '../service/servicemaster.service';


@Component({
  selector: 'app-servicemaster',
  templateUrl: './servicemaster.component.html',
  styleUrls: ['./servicemaster.component.css']
})
export class ServicemasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno','name', 'status', 'tools'];
  dataSource!: MatTableDataSource<ServiceMaster>;
  serviceview: ServiceMaster[] = [];
  serviceedit: ServiceMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router, private service: ServicemasterService, private commonservice: CommonService) { }

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
      this.serviceview = data.result;
      this.dataSource = new MatTableDataSource(this.serviceview);
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
    const service: ServiceMaster = new ServiceMaster();
    this.serviceedit[0] = service;
    this.router.navigateByUrl('/servicemasteradd', { state: this.serviceedit });
  }

  selectedrow(row: any) {
    this.serviceedit = this.serviceview.filter((elem: any) => elem.id === row.id)
    this.serviceedit[0].save = "update"
    this.router.navigateByUrl('/servicemasteradd', { state: this.serviceedit });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
