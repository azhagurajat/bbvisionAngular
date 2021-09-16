import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { QuestionMaster } from '../model/questionmaster';
import { QuestionmasterService } from '../service/questionmaster.service';

@Component({
  selector: 'app-questionmaster',
  templateUrl: './questionmaster.component.html',
  styleUrls: ['./questionmaster.component.css']
})
export class QuestionmasterComponent implements OnInit {

  @ViewChild('search') searchElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<QuestionMaster>;
  questionview: QuestionMaster[] = [];
  questionedit: QuestionMaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public router: Router, private service: QuestionmasterService, private commonservice: CommonService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view() {
    this.service.view().then(data => {
      this.questionview = data.result;
      this.dataSource = new MatTableDataSource(this.questionview);
    }, err => {
      this.commonservice.message("Error", err, "error");
    });
  }

  add() {
    const ques: QuestionMaster = new QuestionMaster();
    this.questionedit[0] = ques;
    this.router.navigateByUrl('/questionmasteradd', { state: this.questionedit });
  }

  selectedrow(row: any) {
    this.questionedit = this.questionview.filter((elem: any) => elem.id === row.id)
    this.questionedit[0].save = "update"
    this.router.navigateByUrl('/questionmasteradd', { state: this.questionedit });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
