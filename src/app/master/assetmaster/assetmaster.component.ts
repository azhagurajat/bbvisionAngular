import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Assetmaster } from '../model/assetsmaster';
import { AssetmasterService } from '../service/assetmaster.service';

@Component({
  selector: 'app-assetmaster',
  templateUrl: './assetmaster.component.html',
  styleUrls: ['./assetmaster.component.css']
})
export class AssetmasterComponent implements OnInit {

  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') someRef!: MatSelect;
  displayedColumns: string[] = ['sno', 'assets', 'assetstype', 'prefixcode', 'status', 'tools'];
  dataSource!: MatTableDataSource<Assetmaster>;
  assetview: Assetmaster[] = [];
  assetedit: Assetmaster[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public router: Router, private service: AssetmasterService) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.view();
  }

  view() {
    this.service.view().then(data => {
      this.assetview = data.result;
      this.dataSource = new MatTableDataSource(this.assetview);
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
    const ass: Assetmaster = new Assetmaster();
    this.assetedit[0] = ass;
    this.router.navigateByUrl('/assetmasteradds', { state: this.assetedit });
  }

  EditMethod(row: any) {
    this.assetedit = this.assetview.filter((elem: any) => elem.id === row.id)
    this.assetedit[0].save = "update"
    this.router.navigateByUrl('/assetmasteradds', { state: this.assetedit });
  }



}







