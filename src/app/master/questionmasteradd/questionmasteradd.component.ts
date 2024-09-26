import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { LoginPojo } from '../model/login';
import { QuestionMaster } from '../model/questionmaster';
import { QuestionmasterService } from '../service/questionmaster.service';

@Component({
  selector: 'app-questionmasteradd',
  templateUrl: './questionmasteradd.component.html',
  styleUrls: ['./questionmasteradd.component.css']
})
export class QuestionmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  question: QuestionMaster = new QuestionMaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  login: LoginPojo = new LoginPojo();
  save: any;
  savedata: boolean = true;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: QuestionmasterService, private router: Router, private commonservice: CommonService) { }
  sub!: any;
  ngOnInit(): void {
    debugger;
    this.question = history.state[0];
    if (this.question.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.question.name, [Validators.required]],
      status: [this.question.status, [Validators.required]]
    })
    this.ontoggledefault();
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
    }, 0);
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
  saveform() {
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    }
    if (this.formgroup) {
      this.question.name = this.formgroup.value.name;
      this.question.status = this.formgroup.value.status;
      this.question.created_by = this.login.empcode;
      const save = JSON.stringify(this.question);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Question Master Insert", data.result[0].message, "info");
          this.router.navigate(['../questionmaster']);
        } else {
          this.commonservice.message("Question Master Insert", data.result[0].message, "error");
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
      this.question.name = this.formgroup.value.name;
      this.question.status = this.formgroup.value.status;
      this.question.modified_by = this.login.empcode;
      const save = JSON.stringify(this.question);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Question Master Update", data.result[0].message, "info");
          this.router.navigate(['../questionmaster']);
        } else {
          this.commonservice.message("Question Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

}
