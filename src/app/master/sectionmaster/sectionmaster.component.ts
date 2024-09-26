import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sectionmaster } from '../model/sectionmaster';
import { SectionmasterService } from '../service/sectionmaster.service';

@Component({
  selector: 'app-sectionmaster',
  templateUrl: './sectionmaster.component.html',
  styleUrls: ['./sectionmaster.component.css']
})
export class SectionmasterComponent implements OnInit {

  @ViewChild('search') searchElement!: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'status', 'tools'];
  dataSource!: MatTableDataSource<Sectionmaster>;
  sectionview: Sectionmaster[] = [];
  sectionedit: Sectionmaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public router: Router, private service: SectionmasterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    this.service.view().then(data => {
      this.sectionview = data.result;
      this.dataSource = new MatTableDataSource(this.sectionview);
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
    const section: Sectionmaster = new Sectionmaster();
    this.sectionedit[0] = section;
    this.router.navigateByUrl('/sectionmasteradd', { state: this.sectionedit });
  }

  selectedrow(row: any) {
    this.sectionedit = this.sectionview.filter((elem: any) => elem.id === row.id)
    this.sectionedit[0].save = "update"
    this.router.navigateByUrl('/sectionmasteradd', { state: this.sectionedit });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
