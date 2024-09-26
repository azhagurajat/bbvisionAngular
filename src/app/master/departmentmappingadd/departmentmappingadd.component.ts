import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { Companyselect, DepartmentMapping, Departmentselect, Headselect } from '../model/departmentmapping';
import { LoginPojo } from '../model/login';
import { DepartmentmappingService } from '../service/departmentmapping.service';

@Component({
  selector: 'app-departmentmappingadd',
  templateUrl: './departmentmappingadd.component.html',
  styleUrls: ['./departmentmappingadd.component.css']
})
export class DepartmentmappingaddComponent implements OnInit {
  @ViewChild('name') someRef!: MatSelect;
  companyselectedit: Companyselect[] = [];
  companyselect: Companyselect[] = [
    { companycode: 0, companyname: 'Quadsel' },
    { companycode: 1, companyname: 'Bluebase' },
    { companycode: 2, companyname: 'Quadsel' }
  ];
  departmentselectedit: Departmentselect[] = [];
  departmentselect: Departmentselect[] = [
    { deptcode: 0, deptname: 'Marketing' },
    { deptcode: 1, deptname: 'Finance' },
    { deptcode: 2, deptname: 'Developing' }
  ];
  headselectedit: Headselect[] = [];
  headselect: Headselect[] = [
    { headcode: 0, headname: 'Saro' },
    { headcode: 1, headname: 'Suman' },
    { headcode: 2, headname: 'Shiva' }
  ];
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  deptmapping: DepartmentMapping = new DepartmentMapping();
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private commonservice: CommonService, private service: DepartmentmappingService, private router: Router) { }
  sub!: any;
  async ngOnInit() {
    debugger;
    this.deptmapping = history.state[0];

    await this.deptselect();
    // await this.compselect();
    // await this.selecthead();
    // this.companyselectedit = this.companyselect.filter(
    //   as => as.companycode === this.deptmapping.companycode
    // );
    this.departmentselectedit = this.departmentselect.filter(
      as => as.deptcode === this.deptmapping.departmentcode
    );
    this.headselectedit = this.headselect.filter(
      as => as.headcode === this.deptmapping.headcode
    );

    if (this.deptmapping.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      // companyname: [this.deptmapping.companyname, [Validators.required]],
      departmentname: [this.deptmapping.departmentname, [Validators.required]],
      headname: [this.deptmapping.headname, [Validators.required]],
      status: [this.deptmapping.status, [Validators.required]]
    })
    if (this.companyselectedit.length > 0) {
      this.formgroup.controls.companyname.setValue(this.companyselectedit[0].companycode);
    } else {
      this.formgroup.controls.companyname.setValue(this.companyselect[0].companycode);
    }
    if (this.departmentselectedit.length > 0) {
      this.formgroup.controls.departmentname.setValue(this.departmentselectedit[0].deptcode);
    } else {
      this.formgroup.controls.departmentname.setValue(this.departmentselect[0].deptcode);
    }
    if (this.headselectedit.length > 0) {
      this.formgroup.controls.headname.setValue(this.headselectedit[0].headcode);
    } else {
      this.formgroup.controls.headname.setValue(this.headselect[0].headcode);
    }
    debugger;
    console.log(this.formgroup.value)
    this.ontoggledefault();
    setTimeout(() => {
      if (this.someRef) this.someRef.focus();
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
  async compselect() {
    await this.commonservice.deptselect().then(data => {
      debugger;
      this.companyselect = data.result;
    }, err => {
      alert(err);
    });
  }
  async selecthead() {
    await this.commonservice.headselect().then(data => {
      this.headselect = data.result;
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
      this.deptmapping.headcode = this.formgroup.value.deptname;
      this.deptmapping.departmentcode = this.formgroup.value.designationname;
      this.deptmapping.created_by = this.login.empcode;
      this.deptmapping.status = this.formgroup.value.status;
      debugger;
      const save = JSON.stringify(this.deptmapping);
      this.service.save(save).then(data => {
        debugger;
        if (data.result[0].status === true) {
          this.commonservice.message("DepartmentMapping Master Insert", data.result[0].message, "info");
          this.router.navigate(['../departmentmapping']);
        } else {
          this.commonservice.message("DepartmentMapping Master Insert", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

  update() {

  }

}
