import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Branchselect, Branchselect1, Feedbackentryadded, Leadtableview } from '../crmmodel/lead';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leadadd',
  templateUrl: './leadadd.component.html',
  styleUrls: ['./leadadd.component.css']
})
export class LeadaddComponent implements OnInit {
  @ViewChild('name') nameElement!: ElementRef;

  formgroup!: FormGroup;
  dataSourceentry!: MatTableDataSource<Feedbackentryadded>;
  dataSource!: MatTableDataSource<Leadtableview>
  leadtable: Leadtableview = new Leadtableview();
  branch: boolean = false;
  branches1: boolean = false;
  data = Object.assign(this.leadtable);
  displayedColumn_feedbackentry: string[] = ['feedbackentry', 'feedbackdate'];
  feedback: Feedbackentryadded[] = [];
  branches: Branchselect[] = [
    { branch: 'Yes', branchcode: 0 },
    { branch: 'No', branchcode: 1 },

  ];
  branch1: Branchselect1[] = [
    { branch: 'Yes', branchcode: 0 },
    { branch: 'No', branchcode: 1 },

  ];
  
  sub: any;

  statuses: any;
  save: any;
  fbpurchasebranchaddressadd: any;
  savedata: boolean = false;
  status: any;
  statuscolor: string = "rgb(153 153 153)";
  calltypeadd: any;
  dateadd: any;
  clienttypeadd: any;
  companynameadd: any;
  locationadd: any;
  addressadd: any;
  clientnameadd: any;
  contactnumberadd: any;
  designationadd: any;
  mailidadd: any;
  productadd: any;
  feedbackadd: any;
  followupdateadd: any;
  departmentadd: any;
  employeeadd: any;
  leadboolean: boolean = false;
  feedboolean: boolean = false;
  searchElement: any;






  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    debugger;
    console.log(this.router.getCurrentNavigation()?.extras.state);

  }

  ngOnInit(): void {
    if (this.feedback.length > 0) {
      this.feedboolean = true;
    } else {
      this.feedboolean = false;
    }
    debugger;
    this.leadtable = history.state[0];

    debugger;
    if (this.leadtable.approvedstatus === "approved") {
      this.leadboolean = true;

    }
    else if (this.leadtable.approvedstatus === "pending") {
      this.leadboolean = false;

    }



    this.formgroup = this.fb.group({
      calltype: [this.leadtable.call],
      date: [this.leadtable.date],
      clienttype: [this.leadtable.clienttype],
      companyname: [this.leadtable.companyname],
      location: [this.leadtable.location],
      address: [this.leadtable.address],
      clientname: [this.leadtable.clientname],
      contactnumber: [this.leadtable.contactnumber],
      designation: [this.leadtable.designation],
      mailid: [this.leadtable.mailid],
      product: [this.leadtable.product],
      feedback: [this.leadtable.feedback],
      followupdate: [this.leadtable.followupdate],
      department: [this.leadtable.department],
      employeename: [this.leadtable.employee],
      status: [this.leadtable.status],


    });



    this.ontoggledefault();
    setTimeout(() => {
      if (this.searchElement) this.searchElement.focus();
    }, 0);
    this.dataSourceentry = new MatTableDataSource(this.feedback);

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }

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
  



}
