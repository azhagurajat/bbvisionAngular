import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobDescription } from '../model/jobdescription';
import { JobdescriptionService } from '../service/jobdescription.service';
@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css']
})
export class JobdescriptionComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<JobDescription>;
  jobdescview: JobDescription[] = [];
  jobdescedit: JobDescription[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public router: Router, public service: JobdescriptionService) { }


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
      this.jobdescview = data.result;
      this.dataSource = new MatTableDataSource(this.jobdescview);
    }, err => {
      debugger;
      alert(err.error.text);
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
    const desc: JobDescription = new JobDescription();
    this.jobdescedit[0] = desc;
    this.router.navigateByUrl('/jobdescriptionadd', { state: this.jobdescedit });
  }

  edittable(row: any) {
    this.jobdescedit = this.jobdescview.filter((elem: any) => elem.id === row.id)
    this.jobdescedit[0].save = "update"
    this.router.navigateByUrl('/jobdescriptionadd', { state: this.jobdescedit });
  }


}
