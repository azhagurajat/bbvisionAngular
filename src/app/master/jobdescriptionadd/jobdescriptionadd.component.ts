import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { CompanymasterComponent } from '../companymaster/companymaster.component';
import { JobDescription } from '../model/jobdescription';
import { LoginPojo } from '../model/login';
import { JobdescriptionService } from '../service/jobdescription.service';

@Component({
  selector: 'app-jobdescriptionadd',
  templateUrl: './jobdescriptionadd.component.html',
  styleUrls: ['./jobdescriptionadd.component.css']
})
export class JobdescriptionaddComponent implements OnInit {
  @ViewChild(CompanymasterComponent) childReference: any;
  formgroup!: FormGroup;
  jobdesc: JobDescription = new JobDescription();
  login: LoginPojo = new LoginPojo();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;
  constructor(private router: Router, private fb: FormBuilder, private service: JobdescriptionService, private commonservice: CommonService) { }
  sub!: any;
  ngOnInit(): void {
    this.jobdesc = history.state[0];

    if (this.jobdesc.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      title: [this.jobdesc.name, [Validators.required]],
      status: [this.jobdesc.status, [Validators.required]]
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
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    }
    if (this.formgroup) {
      this.jobdesc.name = this.formgroup.value.title;
      this.jobdesc.status = this.formgroup.value.status;
      this.jobdesc.created_by = this.login.empcode;
      const save = JSON.stringify(this.jobdesc);
      debugger;
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("JobDescription Master Insert", data.result[0].message, "info");
          this.router.navigate(['../jobdescription']);
        } else {
          this.commonservice.message("JobDescription Master Insert", data.result[0].message, "error");
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
      this.jobdesc.name = this.formgroup.value.title;
      this.jobdesc.status = this.formgroup.value.status;
      this.jobdesc.modified_by = this.login.empcode;
      const save = JSON.stringify(this.jobdesc);
      this.service.update(save).then(data => {
        debugger;
        if (data.result[0].status === true) {
          debugger;
          this.commonservice.message("JobDescription Master Update", data.result[0].message, "info");
          this.router.navigate(['../jobdescription']);
        } else {
          this.commonservice.message("JobDescription Master Update", data.result[0].message, "error");
        }
      }, err => {
        debugger;
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }
}
