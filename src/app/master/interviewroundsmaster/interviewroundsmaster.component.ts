import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InterviewroundsMaster } from '../model/interviewroundsmaster';


@Component({
  selector: 'app-interviewroundsmaster',
  templateUrl: './interviewroundsmaster.component.html',
  styleUrls: ['./interviewroundsmaster.component.css']
})
export class InterviewroundsmasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['name', 'status', 'tools','tools1'];
  dataSource!: MatTableDataSource<InterviewroundsMaster>;
  interviewroundsmasteredit: InterviewroundsMaster[] = [];
  interviewrounds: InterviewroundsMaster[] = [

    {
      name: 'Assessment', status: true, save:'add', color: 'rgb(137 185 236)', width: '40% ', button: 'Interview Mapping',

      interviewrounds1: [
        { name1: 'ApplicationForm', headingname: 'Assessments' },
        { name1: 'ApplicationForm', headingname: 'Assessments' },
        { name1: 'ApplicationForm', headingname: 'Assessments' },
      ]
    },

  ];

 



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.interviewrounds);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

  add() {
    this.interviewroundsmasteredit =[];
    const int: InterviewroundsMaster = new InterviewroundsMaster();
    this.interviewroundsmasteredit[0] = int;
    this.router.navigateByUrl('/interviewroundsmasteradd', { state: this.interviewroundsmasteredit });
  }


  selectedrow(row: any) {
    this.interviewroundsmasteredit =[];
    this.interviewroundsmasteredit = this.interviewrounds.filter((elem: any) => elem.id === row.id)
    this.interviewroundsmasteredit[0].save = "update"
    this.router.navigateByUrl('/interviewroundsmasteradd', { state: this.interviewroundsmasteredit });
  }
  selectedrow1(row: any) {
    this.interviewroundsmasteredit =[];
    this.interviewroundsmasteredit = this.interviewrounds.filter((elem: any) => elem.id === row.id)
    this.interviewroundsmasteredit[0].save = "view"
    this.router.navigateByUrl('/interviewroundsmasteradd', { state: this.interviewroundsmasteredit });
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
