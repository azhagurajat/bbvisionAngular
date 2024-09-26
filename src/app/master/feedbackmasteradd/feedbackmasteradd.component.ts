import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FeedbackmasterComponent } from '../feedbackmaster/feedbackmaster.component';
import { FeedbackMaster } from '../model/feedbackmaster';
import { LoginPojo } from '../model/login';
import { FeedbackmasterService } from '../service/feedbackmaster.service';

@Component({
  selector: 'app-feedbackmasteradd',
  templateUrl: './feedbackmasteradd.component.html',
  styleUrls: ['./feedbackmasteradd.component.css']
})
export class FeedbackmasteraddComponent implements OnInit {
  @ViewChild(FeedbackmasterComponent) childReference: any;
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  feedback: FeedbackMaster = new FeedbackMaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;
  constructor(private router: Router, private service: FeedbackmasterService, private commonservice: CommonService, private fb: FormBuilder) { }
  sub!: any;
  ngOnInit(): void {
    this.feedback = history.state[0];
    if (this.feedback.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.feedback.name, [Validators.required]],
      status: [this.feedback.status, [Validators.required]]
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
      this.feedback.name = this.formgroup.value.name;
      this.feedback.status = this.formgroup.value.status;
      this.feedback.created_by = this.login.empcode;
      this.feedback.status = this.formgroup.value.status;
      const save = JSON.stringify(this.feedback);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("FeedBack Master Insert", data.result[0].message, "info");
          this.router.navigate(['../feedbackmaster']);
        } else {
          this.commonservice.message("FeedBack Master Insert", data.result[0].message, "error");
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
      this.feedback.name = this.formgroup.value.name;
      this.feedback.status = this.formgroup.value.status;
      this.feedback.modified_by = this.login.empcode;
      this.feedback.status = this.formgroup.value.status;
      const save = JSON.stringify(this.feedback);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("FeedBack Master Update", data.result[0].message, "info");
          this.router.navigate(['../feedbackmaster']);
        } else {
          this.commonservice.message("FeedBack Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }
}
