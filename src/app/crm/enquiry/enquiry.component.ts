import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { enquiry } from '../crmmodel/enquiry';
@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') nameElement!: ElementRef;
  displayedColumns: string[] = ['calltype', 'date', 'client', 'location', 'contactnumber', 'followupdate', 'employee', 'status', 'tools'];
  dataSource!: MatTableDataSource<enquiry>;
  enquiry: enquiry[] = [
    { calltype: 'Incoming', date: '2021-08-06', client: 'Bluebase ', location: 'Guindy', contactnumber: '9841016631', followupdate: '2021-08-07', employee: 'Rajeshwari', clienttype: '122', address: 'poonamalle', city: 'chennai', clientname: 'azhagu', designation: 'aaa', mailid: 'a@gmail', service: 'aaa', feedback: 'gggg', assigntodepartment: 'aaaa', assigntoemployee: 'aaa', accountmanagerdepartment: 'aaaa', accountmanager: 'Gopinath', status: 'EnquiryAdded',color:"green" },
    { calltype: 'Direct', date: '2021-0-30', client: 'Bhastrik Ltd ', location: 'Chennai', contactnumber: '9884007875', followupdate: '2021-07-07', employee: 'Gopinath', clienttype: '424', address: 'padalur', city: 'trichy', clientname: 'raja', designation: 'bbbb', mailid: 'b@gmail', service: 'aaa', feedback: 'bbb', assigntodepartment: 'bbbb', assigntoemployee: 'bbb', accountmanagerdepartment: 'bbbbb', accountmanager: 'Azhagu', status: 'Generated Lead',color:"blue" },
  ]
  //example
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
    this.dataSource = new MatTableDataSource(this.enquiry);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  add() {
    this.router.navigate(['/enquiryadd', "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", false, "add"]);
  }

  selectedrow(row: any) {
    this.router.navigate(['/enquiryadd', row.clienttype, row.calltype, row.assigntodepartment, row.date, row.client, row.address,
      row.city, row.clientname, row.designation, row.contactnumber, row.mailid, row.service, row.feedback,
      row.followupdate, row.accountmanagerdepartment, row.accountmanager, row.assigntoemployee, row.status, "update"]);
  }

}
