import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyMaster } from '../model/companymaster';
import { CompanymasterService } from '../service/companymaster.service';

@Component({
  selector: 'app-companymaster',
  templateUrl: './companymaster.component.html',
  styleUrls: ['./companymaster.component.css']
})
export class CompanymasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<CompanyMaster>;
  companyview: CompanyMaster[] = [];
  companyedit: CompanyMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router, private service: CompanymasterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    this.service.view().then(data => {
      console.log(data);
      this.companyview = data.result;
      this.dataSource = new MatTableDataSource(this.companyview);
    }, err => {
      alert(err);
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
    const comp: CompanyMaster = new CompanyMaster();
    this.companyedit[0] = comp;
    this.router.navigateByUrl('/companymasteradd', { state: this.companyedit });
  }

  selectedrow(row: any) {
    this.companyedit = this.companyview.filter((elem: any) => elem.id === row.id)
    this.companyedit[0].save = "update"
    this.router.navigateByUrl('/companymasteradd', { state: this.companyedit });
  }

}
