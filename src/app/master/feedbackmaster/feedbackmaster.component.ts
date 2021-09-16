import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FeedbackMaster } from '../model/feedbackmaster';
import { FeedbackmasterService } from '../service/feedbackmaster.service';

@Component({
  selector: 'app-feedbackmaster',
  templateUrl: './feedbackmaster.component.html',
  styleUrls: ['./feedbackmaster.component.css']
})
export class FeedbackmasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<FeedbackMaster>;
  feedbackview: FeedbackMaster[] = [];
  feedbackedit: FeedbackMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router, private service: FeedbackmasterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    this.service.view().then(data => {
      this.feedbackview = data.result;
      this.dataSource = new MatTableDataSource(this.feedbackview);
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
    const feed: FeedbackMaster = new FeedbackMaster();
    this.feedbackedit[0] = feed;
    this.router.navigateByUrl('/feedbackmasteradd', { state: this.feedbackedit });
  }

  selectedrow(row: any) {
    this.feedbackedit = this.feedbackview.filter((elem: any) => elem.id === row.id)
    this.feedbackedit[0].save = "update"
    this.router.navigateByUrl('/feedbackmasteradd', { state: this.feedbackedit });
  }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

}
