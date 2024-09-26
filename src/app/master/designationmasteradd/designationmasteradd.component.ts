import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { Assetstypeselect } from '../model/assetsmaster';
import { Departmentselect } from '../model/departmentmapping';
import { DesignationMaster } from '../model/designationmaster';
import { LoginPojo } from '../model/login';
import { DesignationmasterService } from '../service/designationmaster.service';

@Component({
  selector: 'app-designationmasteradd',
  templateUrl: './designationmasteradd.component.html',
  styleUrls: ['./designationmasteradd.component.css']
})
export class DesignationmasteraddComponent implements OnInit {
  departmentselectedit: Departmentselect[] = []
  departmentselect: Departmentselect[] = [];
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  designation: DesignationMaster = new DesignationMaster();

  @ViewChild('desname') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;

  constructor(private commonservice: CommonService, private service: DesignationmasterService, private fb: FormBuilder, private router: Router) {
  }

  async ngOnInit() {
    this.designation = history.state[0];
    await this.deptselect();
    if (this.designation.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.departmentselectedit = this.departmentselect.filter(
      as => as.deptcode === this.designation.dept_code
    );
    this.formgroup = this.fb.group({
      designationname: [this.designation.desg_name, [Validators.required]],
      deptname: [this.designation.dept_code, [Validators.required]],
      status: [this.designation.status, [Validators.required]]
    });
    if (this.departmentselectedit.length > 0) {
      this.formgroup.controls.deptname.setValue(this.departmentselectedit[0].deptcode);
    } else {
      this.formgroup.controls.deptname.setValue(this.departmentselect[0].deptcode);
    }
    this.ontoggledefault();
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
    }, 0);
  }

  async deptselect() {
    await this.commonservice.deptselect().then(data => {
      debugger;
      this.departmentselect = data.result;
    }, err => {
      alert(err);
    });
  }
  ontoggledefault() {
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
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    }
    if (this.formgroup) {
      this.designation.dept_code = this.formgroup.value.deptname;
      this.designation.desg_name = this.formgroup.value.designationname;
      this.designation.created_by = this.login.empcode;
      this.designation.status = this.formgroup.value.status;
      debugger;
      const save = JSON.stringify(this.designation);
      this.service.save(save).then(data => {
        debugger;
        if (data.result[0].status === true) {
          this.commonservice.message("Designation Master Insert", data.result[0].message, "info");
          this.router.navigate(['../../../../../designationmaster']);
        } else {
          this.commonservice.message("Designation Master Insert", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

  update() {
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    }
    if (this.formgroup) {
      this.designation.dept_code = this.formgroup.value.deptname;
      this.designation.desg_name = this.formgroup.value.designationname;
      this.designation.created_by = this.login.empcode;
      this.designation.status = this.formgroup.value.status;
      debugger;
      const save = JSON.stringify(this.designation);
      this.service.update(save).then(data => {
        debugger;
        if (data.result[0].status === true) {
          this.commonservice.message("Designation Master Update", data.result[0].message, "info");
          this.router.navigate(['../../../../../designationmaster']);
        } else {
          this.commonservice.message("Designation Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

}
