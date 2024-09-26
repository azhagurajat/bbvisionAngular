import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { Assetmaster, Assetstypeselect } from '../model/assetsmaster';
import { LoginPojo } from '../model/login';
import { AssetmasterService } from '../service/assetmaster.service';

@Component({
  selector: 'app-assetmasteradds',
  templateUrl: './assetmasteradds.component.html',
  styleUrls: ['./assetmasteradds.component.css']
})
export class AssetmasteraddsComponent implements OnInit {
  formgroup!: FormGroup;
  asset: Assetmaster = new Assetmaster();
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  @ViewChild('name') searchElement!: ElementRef;
  assetstypeselectedit: Assetstypeselect[] = [];
  savedata: boolean = true;
  assetstypeselect: Assetstypeselect[] = [
    { assetstypename: 'It asset' },
    { assetstypename: 'NonIt Asset' }
  ];
  login: LoginPojo = new LoginPojo();
  constructor(private router: Router, private service: AssetmasterService, private commonservice: CommonService, private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.asset = history.state[0];
    if (this.asset.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.assetstypeselectedit = this.assetstypeselect.filter(
      as => as.assetstypename === this.asset.assettypename
    );
    this.formgroup = this.fb.group({
      name: [this.asset.name, [Validators.required]],
      prefixcode: [this.asset.prefixcode, [Validators.required]],
      assettypename: [this.asset.assettypename, [Validators.required]],
      status: [this.asset.status, [Validators.required]]
    });
    if (this.assetstypeselectedit.length > 0) {
      this.formgroup.controls.assettypename.setValue(this.assetstypeselectedit[0].assetstypename);
    } else {
      this.formgroup.controls.assettypename.setValue(this.assetstypeselect[0].assetstypename);
    }
    this.ontoggledefault();
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
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
      this.asset.name = this.formgroup.value.name;
      this.asset.status = this.formgroup.value.status;
      this.asset.created_by = this.login.empcode;
      this.asset.assettypename = this.formgroup.value.assettypename;
      this.asset.prefixcode = this.formgroup.value.prefixcode;
      const save = JSON.stringify(this.asset);
      this.service.save(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Asset Master Insert", data.result[0].message, "info");
          this.router.navigate(['../assetmaster']);
        } else {
          this.commonservice.message("Asset Master Insert", data.result[0].message, "error");
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
      this.asset.name = this.formgroup.value.name;
      this.asset.status = this.formgroup.value.status;
      this.asset.modified_by = this.login.empcode;
      this.asset.assettypename = this.formgroup.value.assettypename;
      this.asset.prefixcode = this.formgroup.value.prefixcode;
      const save = JSON.stringify(this.asset);
      this.service.update(save).then(data => {
        if (data.result[0].status === true) {
          this.commonservice.message("Asset Master Update", data.result[0].message, "info");
          this.router.navigate(['../assetmaster']);
        } else {
          this.commonservice.message("Asset Master Update", data.result[0].message, "error");
        }
      }, err => {
        this.commonservice.message("Error", err, "error");
      });
    } else {
      this.commonservice.message("Warning", "Form Invalid", "warn");
    }
  }

}

