import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { RolemasterComponent } from '../rolemaster/rolemaster.component';
import { Checked, RoleMaster } from '../model/rolemaster';

@Component({
  selector: 'app-rolemasteradd',
  templateUrl: './rolemasteradd.component.html',
  styleUrls: ['./rolemasteradd.component.css']
})
export class RolemasteraddComponent implements OnInit {
  @ViewChild(RolemasterComponent) childReference: any;
  formgroup!: FormGroup;
  formgroup1!: FormGroup;
  role: RoleMaster = new RoleMaster();
  rname: any;
  rcode: any;
  statuses: any;
  @ViewChild('rname') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  save: any;
  savedata: boolean = true;
  view: boolean = true;
  checked: Checked[] = 
  [{ headingname: "Recruitment",check:[
    { name: 'ApplicationForm', view: false, edit: true, All: false }, 
    { name: 'CTC Approval', view: false, edit: true, All: false }] },
    { headingname: "Master",check:[
      { name: 'Department Master', view: false, edit: true, All: false }, 
      { name: 'Division Master', view: false, edit: true, All: false }] }
  ]
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  sub!: any;
  ngOnInit(): void {
    debugger;
    this.sub = this.route.paramMap.subscribe(params => {
      this.rname = params.get('rname');
      this.rcode = params.get('rcode');
      this.statuses = params.get('status');
      this.save = params.get('save');
      console.log(params);
    });
    debugger;
    this.role.rname = this.rname;
    this.role.rcode = this.rcode;
    this.role.status = this.statuses;

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    if (this.save === "view") {
      this.view = true;
    } else {
      this.view = false;
    }

    this.formgroup = this.fb.group({
      rname: [this.role.rname, [Validators.required]],
      rcode: [this.role.rcode, [Validators.required]],
      status: [this.role.status, [Validators.required]]
    })
    debugger;
    this.formgroup1 = this.fb.group({
      rname: [this.role.rname, [Validators.required]],
      rcode: [this.role.rcode, [Validators.required]],
      status: [this.role.status, [Validators.required]]
    })
    //debugger;
   // console.log(this.formgroup.value)
    //console.log(this.formgroup1.value)
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
  ontoggle1default() {
    debugger;
    if (this.formgroup1.value.status === "true") {
      this.status = "Active";
      this.statuscolor = "#70ce70";
    } else if (this.formgroup1.value.status === "false") {
      this.formgroup1.patchValue({
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

  }

  update() {

  }
}
