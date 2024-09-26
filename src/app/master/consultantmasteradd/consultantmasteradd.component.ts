import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { ConsultantMaster } from '../model/consultant';

@Component({
  selector: 'app-consultantmasteradd',
  templateUrl: './consultantmasteradd.component.html',
  styleUrls: ['./consultantmasteradd.component.css']
})
export class ConsultantmasteraddComponent implements OnInit {
  formgroup!: FormGroup;
  consultant: ConsultantMaster = new ConsultantMaster();
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  save: any;
  savedata: boolean = true;
  slno1: any;
  name1: any;
  organization1: any;
  phno1: any;
  email1: any;
  phno12: any;
  email12: any;
  empname1: any;
  status1: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  sub!: any;

  ngOnInit(): void {
    
    this.sub = this.route.paramMap.subscribe(params => {

      this.name1 = params.get('name');
      this.organization1 = params.get('organization');
      this.phno1 = params.get('phoneno');
      this.email1 = params.get('email');
      this.phno12 = params.get('phoneno1');
      this.email12 = params.get('email1');
      this.empname1 = params.get('empname');
      this.status1 = params.get('status');
      this.save = params.get('save');
      console.log(params);
    });
   

    this.consultant.name = this.name1;
    this.consultant.organization = this.organization1;
    this.consultant.phoneno = this.phno1;
    this.consultant.email = this.email1;
    this.consultant.phoneno1 = this.phno12;
    this.consultant.email1 = this.email12;
    this.consultant.empname = this.empname1;
    this.consultant.status = this.status1;

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.consultant.name, [Validators.required]],
      organization: [this.consultant.organization, [Validators.required]],
      phoneno: [this.consultant.phoneno, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [this.consultant.email, [Validators.required, Validators.pattern(/^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)]],
      phoneno1: [this.consultant.phoneno1, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email1: [this.consultant.email1, [Validators.required, Validators.pattern(/^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)]],
      empname: [this.consultant.empname, [Validators.required]],
      status: [this.consultant.status, [Validators.required]]
    })
    console.log(this.formgroup.value);
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

  get f() {
    return this.formgroup.controls;
  }

  saveform() {

  }

  update() {

  }
}
