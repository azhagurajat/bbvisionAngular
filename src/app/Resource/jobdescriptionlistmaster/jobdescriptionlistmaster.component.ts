import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobdescriptionlistMaster } from '../model/jobdescriptionlistmaster';

@Component({
  selector: 'app-jobdescriptionlistmaster',
  templateUrl: './jobdescriptionlistmaster.component.html',
  styleUrls: ['./jobdescriptionlistmaster.component.css']
})
export class JobdescriptionlistmasterComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['id','name','name1', 'location','experience','joining','closing','consultant'];
  dataSource!: MatTableDataSource<JobdescriptionlistMaster>;
  job: JobdescriptionlistMaster[] = [
    { id: '1', name: 'Trainee', name1: 'Krishna	',location: 'chennai',experience:'2',joining:'2021-06-22',closing:'2021-06-30',consultant:'consultant' },
    {  id: '2', name: 'Trainee', name1: 'Seshadri	',location: 'chennai',experience:'3',joining:'2021-06-22',closing:'2021-06-30',consultant:'consultant' },
    {  id: '3', name: 'Senior PHP developer	', name1: 'Girish Madhavan',location: 'chennai',experience:'3',joining:'2021-06-22',closing:'2021-06-30',consultant:'consultant'},
   
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.job);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // add() {
  //   this.router.navigate(['/prefixmasteradd', "", "", false, "add"]);
  // }

  // selectedrow(row: any) {
  //   this.router.navigate(['/prefixmasteradd', row.name, row.name1, row.status, "update"]);
  // }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
