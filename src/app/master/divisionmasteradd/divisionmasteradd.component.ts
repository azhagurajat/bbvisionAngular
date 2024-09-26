import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { Departmentselect } from '../model/departmentmapping';
import { DivisionMaster } from '../model/divisionmaster';
import { LoginPojo } from '../model/login';
import { DivisionmasterService } from '../service/divisionmaster.service';

@Component({
  selector: 'app-divisionmasteradd',
  templateUrl: './divisionmasteradd.component.html',
  styleUrls: ['./divisionmasteradd.component.css']
})
export class DivisionmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  departmentselectedit: Departmentselect[] = [];
  departmentselect: Departmentselect[] = [];
  savedata: boolean = true;
  division: DivisionMaster = new DivisionMaster();
  constructor(private router: Router, private fb: FormBuilder, private commonservice: CommonService, private service: DivisionmasterService) { }
  sub!: any;

  async ngOnInit() {
    this.division = history.state[0];
    await this.deptselect();
    if (this.division.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.departmentselectedit = this.departmentselect.filter(
      as => as.deptcode === this.division.dept_code
    );
    this.formgroup = this.fb.group({
      div: [this.division.div, [Validators.required]],
      dept: [this.division.dept_code, [Validators.required]],
      status: [this.division.status, [Validators.required]]
    })
    if (this.departmentselectedit.length > 0) {
      this.formgroup.controls.dept.setValue(this.departmentselectedit[0].deptcode);
    } else {
      this.formgroup.controls.dept.setValue(this.departmentselect[0].deptcode);
    }
    this.ontoggledefault();
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
    }, 0);
  }


  async deptselect() {
    await this.commonservice.deptselect().then(data => {
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
      this.division.dept_code = this.formgroup.value.dept;
      this.division.div = this.formgroup.value.div;
      this.division.status = this.formgroup.value.status;
      this.division.created_by = this.login.empcode;
      const save = JSON.stringify(this.division);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Division Master Insert", data.result[0].message, "info");
          this.router.navigate(['../divisionmaster']);
        } else {
          this.commonservice.message("Division Master Insert", data.result[0].message, "error");
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
      this.division.dept_code = this.formgroup.value.dept;
      this.division.div = this.formgroup.value.div;
      this.division.status = this.formgroup.value.status;
      this.division.modified_by = this.login.empcode;
      const save = JSON.stringify(this.division);
      debugger;
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Division Master Update", data.result[0].message, "info");
          this.router.navigate(['../divisionmaster']);
        } else {
          this.commonservice.message("Division Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }


}
