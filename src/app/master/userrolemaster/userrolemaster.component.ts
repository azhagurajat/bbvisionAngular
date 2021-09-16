import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserroleMaster } from '../model/userrolemaster';
import { UserrolemasterService } from '../service/userrolemaster.service';

@Component({
  selector: 'app-userrolemaster',
  templateUrl: './userrolemaster.component.html',
  styleUrls: ['./userrolemaster.component.css']
})
export class UserrolemasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') someRef!: MatSelect;
  displayedColumns: string[] = ['sno', 'code', 'rolename', 'empname', 'status', 'tools'];
  dataSource!: MatTableDataSource<UserroleMaster>;
  userroleview: UserroleMaster[] = [];
  userroleedit: UserroleMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public router: Router, private service: UserrolemasterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }
  view() {
    this.service.view().then(data => {
      debugger;
      this.userroleview = data.result;
      this.dataSource = new MatTableDataSource(this.userroleview);
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
    const user: UserroleMaster = new UserroleMaster();
    this.userroleedit[0] = user;
    this.router.navigateByUrl('/userrolemasteradd', { state: this.userroleedit });
  }
  EditMethod(row: any) {
    this.userroleedit = this.userroleview.filter((elem: any) => elem.id === row.id)
    this.userroleedit[0].save = "update"
    this.router.navigateByUrl('/userrolemasteradd', { state: this.userroleedit });

  }
}
