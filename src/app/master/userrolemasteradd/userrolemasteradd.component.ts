import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { UseremployeeSelected, UserroleMaster, UserroleMasterEdit } from '../model/userrolemaster';
import { UserrolemasterService } from '../service/userrolemaster.service';
@Component({
  selector: 'app-userrolemasteradd',
  templateUrl: './userrolemasteradd.component.html',
  styleUrls: ['./userrolemasteradd.component.css']
})
export class UserrolemasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  formgroup1!: FormGroup;
  userrole: UserroleMaster = new UserroleMaster();
  dataSource!: MatTableDataSource<UserroleMaster>;
  @ViewChild('name') searchElement!: MatSelect;
  @ViewChild('name1') searchElement1!: ElementRef;
  useremployeeselectededit: UseremployeeSelected[] = [];
  useremployeeselected: UseremployeeSelected[] = [
    { employee: 'rizwana', rolecode: 'ROLE-001--IntreViewer' },
    { employee: 'rajeswari', rolecode: 'ROLE-002--Recruiter' },
    { employee: 'gopinath', rolecode: 'ROLE-003--Admin' },
  ];

  savedata: boolean = true;
  status: string = "Active";
  statuscolor: string = "rgb(153 153 153)";

  constructor(private router: Router, private service: UserrolemasterService, private commonservice: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userrole = history.state[0];
    if (this.userrole.save === "add") {
      this.savedata = true;
      this.formgroup = this.fb.group({
        employee: [this.userrole.username, [Validators.required]],
        rolecode: [this.userrole.rolecode, [Validators.required]],
        status: [this.userrole.status, [Validators.required]]
      });
      this.formgroup.controls.employee.setValue(this.useremployeeselected[0].rolecode);
      this.formgroup.controls.rolecode.setValue(this.useremployeeselected[0].employee);
      this.ontoggledefaultadd();
      setTimeout(() => {
        if (this.searchElement) this.searchElement.focus();
      }, 0);
    } else {
      this.savedata = false;
      this.formgroup1 = this.fb.group({
        rolename: [this.userrole.rolename, [Validators.required]],
        rolecode1: [this.userrole.rolecode, [Validators.required]],
        username: [this.userrole.username, [Validators.required]],
        password: [this.userrole.password, [Validators.required]],
        status: [this.userrole.status, [Validators.required]]
      });
      this.useremployeeselectededit = this.useremployeeselected.filter(
        as => as.employee === this.userrole.rolecode
      );
      if (this.useremployeeselectededit.length > 0) {
        this.formgroup1.controls.rolecode1.setValue(this.useremployeeselectededit[0].rolecode);
      } else {
        this.formgroup1.controls.rolecode1.setValue(this.useremployeeselected[0].rolecode);
      }
      this.ontoggledefaultedit();
      setTimeout(() => {
        this.searchElement1.nativeElement.focus();
      }, 0);
    }



  }
  ontoggledefaultedit() {
    debugger;
    if (this.formgroup1.value.status === "true") {
      this.status = "Active";
      this.statuscolor = "#70ce70";
    } else if (this.formgroup1.value.status === "false") {
      this.formgroup1.patchValue({
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
  ontoggledefaultadd() {
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

  saveform() {

  }
  update() {

  }
}