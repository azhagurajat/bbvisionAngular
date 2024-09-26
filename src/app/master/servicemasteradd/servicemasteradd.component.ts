import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { LoginPojo } from '../model/login';
import { ServiceMaster } from '../model/servicemaster';
import { ServicemasterService } from '../service/servicemaster.service';
import { ServicemasterComponent } from '../servicemaster/servicemaster.component';


@Component({
  selector: 'app-servicemasteradd',
  templateUrl: './servicemasteradd.component.html',
  styleUrls: ['./servicemasteradd.component.css']
})
export class ServicemasteraddComponent implements OnInit {
  @ViewChild(ServicemasterComponent) childReference: any;
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  servicemaster: ServiceMaster = new ServiceMaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: ServicemasterService, private router: Router, private commonservice: CommonService) { }
  sub!: any;
  ngOnInit(): void {
    this.servicemaster = history.state[0];
    if (this.servicemaster.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.servicemaster.name, [Validators.required]],
      status: [this.servicemaster.status, [Validators.required]]
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
      this.servicemaster.name = this.formgroup.value.name;
      this.servicemaster.status = this.formgroup.value.status;
      this.servicemaster.created_by = this.login.empcode;
      const save = JSON.stringify(this.servicemaster);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Service Master Insert", data.result[0].message, "info");
          this.router.navigate(['../servicemaster']);
        } else {
          this.commonservice.message("Service Master Insert", data.result[0].message, "error");
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
      this.servicemaster.name = this.formgroup.value.name;
      this.servicemaster.status = this.formgroup.value.status;
      this.servicemaster.modified_by = this.login.empcode; debugger;
      const save = JSON.stringify(this.servicemaster);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Service Master Update", data.result[0].message, "info");
          this.router.navigate(['../servicemaster']);
        } else {
          this.commonservice.message("Service Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

}
