import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ResourceMaster } from '../model/resourcemaster';
import { ResourcemasterService } from '../service/resourcemaster.service';


@Component({
  selector: 'app-resourcemaster',
  templateUrl: './resourcemaster.component.html',
  styleUrls: ['./resourcemaster.component.css']
})
export class ResourcemasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<ResourceMaster>;
  resourceview: ResourceMaster[] = [];
  resourceedit: ResourceMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router, private service: ResourcemasterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    this.service.view().then(data => {
      this.resourceview = data.result;
      this.dataSource = new MatTableDataSource(this.resourceview);
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
    const call: ResourceMaster = new ResourceMaster();
    this.resourceedit[0] = call;
    this.router.navigateByUrl('/resourcemasteradd', { state: this.resourceedit });
  }

  selectedrow(row: any) {
    this.resourceedit = this.resourceview.filter((elem: any) => elem.id === row.id)
    this.resourceedit[0].save = "update"
    this.router.navigateByUrl('/resourcemasteradd', { state: this.resourceedit });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
