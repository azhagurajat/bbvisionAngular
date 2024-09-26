import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { CallsMaster } from '../model/callsmaster';
import { LoginPojo } from '../model/login';
import { CallsmsaterService } from '../service/callsmaster.service';

@Component({
  selector: 'app-callsmasteradd',
  templateUrl: './callsmasteradd.component.html',
  styleUrls: ['./callsmasteradd.component.css']
})
export class CallsmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  callsmaster: CallsMaster = new CallsMaster();
  login: LoginPojo = new LoginPojo();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;

  constructor(private router: Router, private service: CallsmsaterService, private commonservice: CommonService, private fb: FormBuilder) { }
  sub!: any;
  ngOnInit(): void {
    this.callsmaster = history.state[0];
    if (this.callsmaster.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.callsmaster.name, [Validators.required]],
      status: [this.callsmaster.status, [Validators.required]]
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
      this.callsmaster.name = this.formgroup.value.name;
      this.callsmaster.status = this.formgroup.value.status;
      this.callsmaster.created_by = this.login.empcode;
      const save = JSON.stringify(this.callsmaster);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Calls Master Insert", data.result[0].message, "info");
          this.router.navigate(['../callsmaster']);
        } else {
          this.commonservice.message("Calls Master Insert", data.result[0].message, "error");
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
      this.callsmaster.name = this.formgroup.value.name;
      this.callsmaster.status = this.formgroup.value.status;
      this.callsmaster.modified_by = this.login.empcode;
      const save = JSON.stringify(this.callsmaster);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Calls Master Update", data.result[0].message, "info");
          this.router.navigate(['../callsmaster']);
        } else {
          this.commonservice.message("Calls Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }
}
