import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { CompanyMaster } from '../model/companymaster';
import { LoginPojo } from '../model/login';
import { CompanymasterService } from '../service/companymaster.service';

@Component({
  selector: 'app-companymasteradd',
  templateUrl: './companymasteradd.component.html',
  styleUrls: ['./companymasteradd.component.css']
})
export class CompanymasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  company: CompanyMaster = new CompanyMaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;
  login: LoginPojo = new LoginPojo();
  constructor(private router: Router, private service: CompanymasterService, private fb: FormBuilder, private commonservice: CommonService) { }
  sub!: any;
  ngOnInit(): void {
    this.company = history.state[0];
    if (this.company.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.company.company, [Validators.required]],
      status: [this.company.status, [Validators.required]]
    });
    this.ontoggledefault();
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
    }, 0);
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
      this.company.company = this.formgroup.value.name;
      this.company.status = this.formgroup.value.status;
      this.company.created_by = this.login.empcode;
      this.company.status = this.formgroup.value.status;
      const save = JSON.stringify(this.company);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Company Master Insert", data.result[0].message, "info");
          this.router.navigate(['../companymaster']);
        } else {
          this.commonservice.message("Company Master Insert", data.result[0].message, "error");
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
      this.company.company = this.formgroup.value.name;
      this.company.status = this.formgroup.value.status;
      this.company.created_by = this.login.empcode;
      this.company.status = this.formgroup.value.status;
      const save = JSON.stringify(this.company);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Company Master Update", data.result[0].message, "info");
          this.router.navigate(['../companymaster']);
        } else {
          this.commonservice.message("Company Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }
}
