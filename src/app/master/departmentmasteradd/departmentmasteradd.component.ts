import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { Department, Departmentupdate } from '../model/department';
import { DepartmentmasterService } from '../service/departmentmaster.service';

@Component({
  selector: 'app-departmentmasteradd',
  templateUrl: './departmentmasteradd.component.html',
  styleUrls: ['./departmentmasteradd.component.css']
})
export class DepartmentmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  department: Department = new Department();
  departmentupdate: Departmentupdate = new Departmentupdate();
  name: any;
  id: any;
  statuses: any;
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  save: any;
  savedata: boolean = true;

  constructor(private commonservice: CommonService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, public service: DepartmentmasterService) { }
  sub!: any;
  ngOnInit(): void {
    debugger;
    this.sub = this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      this.id = params.get('id');
      this.statuses = params.get('status');
      this.save = params.get('save');
    });
    debugger;
    this.department.id = this.id;
    this.department.name = this.name;
    this.department.status = this.statuses;

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.department.name, [Validators.required]],
      status: [this.department.status, [Validators.required]]
    })
    debugger;
    console.log(this.formgroup.value)
    this.ontoggledefault();
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
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
    debugger;
    if (this.formgroup) {
      this.department.name = this.formgroup.value.name;
      this.department.status = this.formgroup.value.status;
      const save = JSON.stringify(this.department);
      this.service.save(save).then(data => {
        debugger;
        if (data.result[0].status === true) {
          this.commonservice.message("Department Master Insert", data.result[0].message, "info");
          this.router.navigate(['../../../../../departmentmaster']);
        } else {
          this.commonservice.message("Department Master Insert", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

  update() {
    debugger;
    if (this.formgroup) {
      this.departmentupdate.id = this.department.id;
      this.departmentupdate.name = this.formgroup.value.name;
      this.departmentupdate.status = this.formgroup.value.status;
      const save = JSON.stringify(this.departmentupdate);
      this.service.update(save).then(data => {
        debugger;
        this.commonservice.message("Department Master Update", data.result[0].message, "info");
        this.router.navigate(['../../../../../departmentmaster']);
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

  clear() {
    this.formgroup = this.fb.group({
      name: "",
      status: false
    });
    this.ontoggledefault();
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
    }, 0);
  }
}
