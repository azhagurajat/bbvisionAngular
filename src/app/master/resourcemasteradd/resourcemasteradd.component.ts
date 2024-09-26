import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { LoginPojo } from '../model/login';
import { ResourceMaster } from '../model/resourcemaster';
import { ResourcemasterComponent } from '../resourcemaster/resourcemaster.component';
import { ResourcemasterService } from '../service/resourcemaster.service';


@Component({
  selector: 'app-resourcemasteradd',
  templateUrl: './resourcemasteradd.component.html',
  styleUrls: ['./resourcemasteradd.component.css']
})
export class ResourcemasteraddComponent implements OnInit {
  @ViewChild(ResourcemasterComponent) childReference: any;
  formgroup!: FormGroup;
  login: LoginPojo = new LoginPojo();
  resource: ResourceMaster = new ResourceMaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = true;
  constructor(private router: Router, private service: ResourcemasterService, private commonservice: CommonService, private fb: FormBuilder) { }
  sub!: any;
  ngOnInit(): void {
    this.resource = history.state[0];
    if (this.resource.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.resource.name, [Validators.required]],
      status: [this.resource.status, [Validators.required]]
    })
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
      this.resource.name = this.formgroup.value.name;
      this.resource.status = this.formgroup.value.status;
      this.resource.created_by = this.login.empcode;
      this.resource.status = this.formgroup.value.status;
      const save = JSON.stringify(this.resource);
      debugger;
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Resource Master Insert", data.result[0].message, "info");
          this.router.navigate(['../resourcemaster']);
        } else {
          debugger;
          this.commonservice.message("Resource Master Insert", data.result[0].message, "error");
        }
      }, err => {
        debugger;
        this.commonservice.message("Error", err, "error");
      });
    } else {
      debugger;
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

  update() {
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    }
    if (this.formgroup) {
      this.resource.name = this.formgroup.value.name;
      this.resource.status = this.formgroup.value.status;
      this.resource.modified_by = this.login.empcode;
      this.resource.status = this.formgroup.value.status;
      const save = JSON.stringify(this.resource);
      debugger;
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Resource Master Update", data.result[0].message, "info");
          this.router.navigate(['../resourcemaster']);
        } else {
          debugger;
          this.commonservice.message("Resource Master Update", data.result[0].message, "error");
        }
      }, err => {
        debugger;
        this.commonservice.message("Error", err, "error");
      });
    } else {
      debugger;
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }
}
