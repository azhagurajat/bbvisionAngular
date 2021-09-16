import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { LoginPojo } from '../model/login';
import { Sectionmaster } from '../model/sectionmaster';
import { SectionmasterService } from '../service/sectionmaster.service';

@Component({
  selector: 'app-sectionmasteradd',
  templateUrl: './sectionmasteradd.component.html',
  styleUrls: ['./sectionmasteradd.component.css']
})
export class SectionmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  section: Sectionmaster = new Sectionmaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private service: SectionmasterService, private commonservice: CommonService) { }
  sub!: any;
  ngOnInit(): void {
    this.section = history.state[0];
    if (this.section.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.section.name, [Validators.required]],
      status: [this.section.status, [Validators.required]]
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
      this.section.name = this.formgroup.value.name;
      this.section.status = this.formgroup.value.status;
      this.section.created_by = this.login.empcode;
      const save = JSON.stringify(this.section);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Section Master Insert", data.result[0].message, "info");
          this.router.navigate(['../sectionmaster']);
        } else {
          this.commonservice.message("Section Master Insert", data.result[0].message, "error");
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
      this.section.name = this.formgroup.value.name;
      this.section.status = this.formgroup.value.status;
      this.section.modified_by = this.login.empcode;
      const save = JSON.stringify(this.section);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Section Master Update", data.result[0].message, "info");
          this.router.navigate(['../sectionmaster']);
        } else {
          this.commonservice.message("Section Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }
}
