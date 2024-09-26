import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CallsMaster } from '../model/callsmaster';
import { CallsmsaterService } from '../service/callsmaster.service';

@Component({
  selector: 'app-callsmaster',
  templateUrl: './callsmaster.component.html',
  styleUrls: ['./callsmaster.component.css']
})
export class CallsmasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<CallsMaster>;
  callsview: CallsMaster[] = [];
  callsedit: CallsMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router, private service: CallsmsaterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    this.service.view().then(data => {
      this.callsview = data.result;
      this.dataSource = new MatTableDataSource(this.callsview);
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
    const call: CallsMaster = new CallsMaster();
    this.callsedit[0] = call;
    this.router.navigateByUrl('/callsmasteradd', { state: this.callsedit });
  }

  selectedrow(row: any) {
    this.callsedit = this.callsview.filter((elem: any) => elem.id === row.id)
    this.callsedit[0].save = "update"
    this.router.navigateByUrl('/callsmasteradd', { state: this.callsedit });
  }
}
