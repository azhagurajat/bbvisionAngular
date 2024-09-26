import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { assigntodepartmentselect, assigntoemployeeselect, calltypeselect, clientypeselect, enquiry, feedbackadd, feedbackentryadd } from '../crmmodel/enquiry';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },

}
@Component({
  selector: 'app-enquiryadd',
  templateUrl: './enquiryadd.component.html',
  styleUrls: ['./enquiryadd.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EnquiryaddComponent implements OnInit {
  formgroup!: FormGroup;
  enquiry: enquiry = new enquiry();
  @ViewChild('name') searchElement!: MatSelect;
  account: boolean = false;
  assign: boolean = false;
  clientypeselect: clientypeselect[] = [
    { clienttype: 'Existing', clienttypecode: 0 },
    { clienttype: 'New', clienttypecode: 1 },

  ];
  calltypeselect: calltypeselect[] = [
    { calltype: 'Incoming', calltypecode: 0 },
    { calltype: 'Outgoing', calltypecode: 0 },
    { calltype: 'Direct', calltypecode: 0 }
  ]

  assigntodepartmentselect: assigntodepartmentselect[] = [
    { assigntodepartment: 'management', assigntodepartmentcode: 0, },
    { assigntodepartment: 'designing', assigntodepartmentcode: 0, }
  ]
  assigntoemployeeselect: assigntoemployeeselect[] = [
    { assigntoemployee: 'rajeshwari', assignmentemployeecode: 0 },
    { assigntoemployee: 'girish madhavan', assignmentemployeecode: 0 }
  ]
  displayedColumns: string[] = ['check', 'feedback', 'feedbackfollowupdate']
  displayedColumn_feedbackentry: string[] = ['feedbackentry', 'feedbackdate']
  // dataSource!: MatTableDataSource<feedbackadd>;
  dataSourceentry!: MatTableDataSource<feedbackentryadd>;

  feedback: feedbackadd[] = [
    { feedback: 'good', feedbackfollowupdate: '2021-08-06' }]
  feedbackentryadd: feedbackentryadd[] = [
    { feedbackentry: 'hello', feedbackdate: '2001-08-1997' }]

  sub: any;
  clienttypeadd: any;
  calltypeadd: any;
  dateadd: any;
  clientadd: any;
  addressadd: any;
  cityadd: any;
  clientnameadd: any;
  designationadd: any;
  contactnumberadd: any;
  mailidadd: any;
  serviceadd: any;
  feedbackadd: any;
  followupdateadd: any;
  assigntodepartmentadd: any;
  assignemployeeadd: any;
  accountmanagerdepartmentadd: any;
  accountmanageradd: any;
  status: any;
  statuses: any;
  save: any;
  savedata: any;
  statuscolor: string = "rgb(153 153 153)";
  added: any;
  leadboolean: boolean = true;
  toggleButton: boolean = true;
  checkboxes!: boolean[];
  selectedRow!: number;
  data = Object.assign(this.feedback);
  dataSource = new MatTableDataSource<feedbackadd>(this.data);
  selection = new SelectionModel<feedbackadd>(true, []);

  // constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    // Creates random users.

  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      debugger;
      this.clienttypeadd = params.get('clienttype');
      this.calltypeadd = params.get('calltype');
      this.dateadd = params.get('date');
      this.clientadd = params.get('client');
      this.addressadd = params.get('address');
      this.cityadd = params.get('city');
      this.clientnameadd = params.get('clientname');
      this.designationadd = params.get('designation');
      this.contactnumberadd = params.get('contactnumber');
      this.mailidadd = params.get('mailid');
      this.serviceadd = params.get('service');
      this.feedbackadd = params.get('feedback');
      this.followupdateadd = params.get('followupdate');
      this.assigntodepartmentadd = params.get('assigntodepartment');
      this.assignemployeeadd = params.get('assigntoemployee');
      this.accountmanagerdepartmentadd = params.get('accountmanagerdepartment');
      this.accountmanageradd = params.get('accountmanager');
      this.statuses = params.get('status');
      this.save = params.get('save');
      console.log(params);

    });

    if (this.statuses === "EnquiryAdded") {
      this.leadboolean = true;

    }
    else if (this.statuses === "Generated Lead") {
      this.leadboolean = false;

    }
    this.enquiry.date = this.dateadd;
    this.enquiry.client = this.clientadd;
    this.enquiry.address = this.addressadd;
    this.enquiry.city = this.cityadd;

    this.enquiry.designation = this.designationadd;
    this.enquiry.contactnumber = this.contactnumberadd;
    this.enquiry.mailid = this.mailidadd;
    this.enquiry.service = this.serviceadd;

    this.enquiry.feedback = this.feedbackadd;
    this.enquiry.followupdate = this.followupdateadd;
    this.enquiry.accountmanagerdepartment = this.accountmanagerdepartmentadd;
    this.enquiry.accountmanager = this.accountmanageradd;

    this.enquiry.clienttype = this.clienttypeadd;
    this.enquiry.calltype = this.calltypeadd;
    this.enquiry.assigntodepartment = this.assigntodepartmentadd;
    this.enquiry.assigntoemployee = this.assignemployeeadd;
    this.enquiry.status = this.statuses;

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }

    this.formgroup = this.fb.group({
      clienttype: [this.enquiry.clienttype, [Validators.required]],
      calltype: [this.enquiry.calltype, [Validators.required]],
      date: [this.enquiry.date, [Validators.required]],
      client: [this.enquiry.client, [Validators.required]],
      address: [this.enquiry.address, [Validators.required]],
      city: [this.enquiry.city, [Validators.required]],
      clientname: [this.enquiry.clientname, [Validators.required]],
      designation: [this.enquiry.designation, [Validators.required]],
      contactnumber: [this.enquiry.contactnumber, [Validators.required]],
      mailid: [this.enquiry.mailid, [Validators.required]],
      service: [this.enquiry.service, [Validators.required]],
      feedback: [this.enquiry.feedback, [Validators.required]],
      followupdate: [this.enquiry.followupdate, [Validators.required]],
      assigntodepartment: [this.enquiry.assigntodepartment, [Validators.required]],
      assigntoemployee: [this.enquiry.assigntoemployee, [Validators.required]],
      accountmanagerdepartment: [this.enquiry.accountmanagerdepartment, [Validators.required]],
      accountmanager: [this.enquiry.accountmanager, [Validators.required]],
      status: [this.enquiry.status, [Validators.required]]

    });
    this.checkboxes = new Array(this.feedback.length);
    this.checkboxes.fill(false);

    this.ontoggledefault();
    setTimeout(() => {
      if (this.searchElement) this.searchElement.focus();
    }, 0);
    this.dataSourceentry = new MatTableDataSource(this.feedbackentryadd);

  }
  ontoggledefault() {
    debugger;
    if (this.formgroup.value.status === "true") {
      this.status = "Active";
      this.statuscolor = "#70ce70";
    } else if (this.formgroup.value.status === "false") {
      this.formgroup.patchValue({
        status: false
      })
      this.status = "InActive";
      this.statuscolor = "rgb(153 153 153)";
    }
  }
  onToggle(event: MatSlideToggleChange) {
    debugger;
    if (event.checked) {
      this.status = "Active";
      this.statuscolor = "#70ce70";
    } else {
      this.status = "InActive";
      this.statuscolor = "rgb(153 153 153)";
    }
  }
  saveform() {

  }
  update() {

  }

  clienttypechange(event: any) {


    if (event.value === 0) {
      this.assign = false;
      this.account = true;
    } else if (event.value === 1) {
      this.assign = true;
      this.account = false;
    }
    console.log(event);
  }

 

  add(): void {
  
    this.feedback.push({ feedback: '', feedbackfollowupdate: '' });
    this.dataSource.data = this.feedback;
  }
  setClickedRow(index: number) {
    this.selectedRow = index;
  }
  toggleSelection(event: any, i: any) {

    this.checkboxes[i] = event.target.checked;

  }
  delete() {
    
    
    for (let i = this.checkboxes.length - 1; i >= 0; i--) {
      // If selected, then delete that row.
      if (this.checkboxes[i]) {
        this.feedback.splice(i, 1);
      }
      this.checkboxes = this.checkboxes.filter(checkbox => checkbox === false);
    }
  }





  isAllSelected() {
    debugger;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    debugger;
    this.selection.selected.forEach(item => {
      debugger;
      let index: number = this.data.findIndex((d: feedbackadd) => d === item);
      if (index === 0) {
        return;
      }
      console.log(this.data.findIndex((d: feedbackadd) => d === item));
      this.dataSource.data.splice(index, 1);

      this.dataSource = new MatTableDataSource<feedbackadd>(this.dataSource.data);
    });
    this.selection = new SelectionModel<feedbackadd>(true, []);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    debugger;
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  generatelead() {

  }
}
