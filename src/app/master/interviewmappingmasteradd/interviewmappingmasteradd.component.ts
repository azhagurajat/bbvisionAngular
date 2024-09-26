import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { Departmentselect, Employeeselect, Roundselect } from '../model/departmentmapping';
import { InterviewmappingMaster } from '../model/interviewmappingmaster';

@Component({
  selector: 'app-interviewmappingmasteradd',
  templateUrl: './interviewmappingmasteradd.component.html',
  styleUrls: ['./interviewmappingmasteradd.component.css']
})
export class InterviewmappingmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  @ViewChild('someRef') someRef!: MatSelect;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  departmentselectedit: Departmentselect[] = []
  roundselectedit: Roundselect[] = []
  employeeselectedit: Employeeselect[] = []
  departmentselect: Departmentselect[] = [
    { deptcode: 0, deptname: 'Marketing' },
    { deptcode: 1, deptname: 'Finance' }
  ];
  roundselect: Roundselect[] = [
    { roundcode: 0, roundname: 'Assessment' },
    { roundcode: 1, roundname: 'php technical' }
  ];
  employeeselect: Employeeselect[] = [
    { employeecode: 0, employeename: 'Sindhu' },
    { employeecode: 1, employeename: 'Preethi' }
  ];
  department: any;
  round: any;
  employee: any;
 // div: any;
  statuses: any;
  save: any;
  savedata: boolean = true;
  interviewmapping: InterviewmappingMaster = new InterviewmappingMaster();
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  sub!: any;

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.department = params.get('dept');
      this.round = params.get('round');
      this.employee = params.get('employee');
      //this.div = params.get('div');
      this.statuses = params.get('status');
      this.save = params.get('save');
    });
    debugger;
    this.departmentselectedit = this.departmentselect.filter(
      as => as.deptname === this.department
    );
    this.roundselectedit = this.roundselect.filter(
      as => as.roundname === this.round
    );
    this.employeeselectedit = this.employeeselect.filter(
      as => as.employeename === this.employee
    );
    this.interviewmapping.dept = this.department;
    this.interviewmapping.round = this.round;
    this.interviewmapping.employee = this.employee;
    //this.division.div = this.div;
    this.interviewmapping.status = this.statuses;

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      //div: [this.division.div, [Validators.required]],
      dept: [this.interviewmapping.dept, [Validators.required]],
      round: [this.interviewmapping.round, [Validators.required]],
      employee: [this.interviewmapping.employee, [Validators.required]],
      status: [this.interviewmapping.status, [Validators.required]]
    })
    if (this.departmentselectedit.length > 0) {
      this.formgroup.controls.dept.setValue(this.departmentselectedit[0].deptcode);
    } else {
      this.formgroup.controls.dept.setValue(this.departmentselect[0].deptcode);
    }
    if (this.roundselectedit.length > 0) {
      this.formgroup.controls.round.setValue(this.roundselectedit[0].roundcode);
    } else {
      this.formgroup.controls.round.setValue(this.roundselect[0].roundcode);
    }
    if (this.employeeselectedit.length > 0) {
      this.formgroup.controls.employee.setValue(this.employeeselectedit[0].employeecode);
    } else {
      this.formgroup.controls.employee.setValue(this.employeeselect[0].employeecode);
    }
    this.ontoggledefault();
    setTimeout(() => {
     if(this.someRef) this.someRef.focus();
    }, 0);
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
