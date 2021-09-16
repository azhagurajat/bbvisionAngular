import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { DivisionMaster } from '../model/divisionmaster';
import { DivisionmasterService } from '../service/divisionmaster.service';

@Component({
  selector: 'app-divisionmaster',
  templateUrl: './divisionmaster.component.html',
  styleUrls: ['./divisionmaster.component.css']
})
export class DivisionmasterComponent implements OnInit {

  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'dept', 'div', 'status', 'tools'];
  dataSource!: MatTableDataSource<DivisionMaster>;
  divisionview: DivisionMaster[] = [];
  divisionedit: DivisionMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public router: Router, private service: DivisionmasterService, private commonservice: CommonService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }
  view() {
    this.service.view().then(data => {
      debugger;
      this.divisionview = data.result;
      this.dataSource = new MatTableDataSource(this.divisionview);
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
    const div: DivisionMaster = new DivisionMaster();
    this.divisionedit[0] = div;
    this.router.navigateByUrl('/divisionmasteradd', { state: this.divisionedit });
  }

  selectedrow(row: any) {
    this.divisionedit = this.divisionview.filter((elem: any) => elem.id === row.id)
    this.divisionedit[0].save = "update"
    this.router.navigateByUrl('/divisionmasteradd', { state: this.divisionedit });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
