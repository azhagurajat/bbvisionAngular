import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificationselect, Consultantselect, Employeementstatusselect, Postappliedforselect, Referalselect, Referaltypeselect, Resource, Sourcetypeselect } from '../model/resourcemodel';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },

}
@Component({
  selector: 'app-resourceform',
  templateUrl: './resourceform.component.html',
  styleUrls: ['./resourceform.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ResourceformComponent implements OnInit {
  formgroup!: FormGroup;
  consultanted: boolean = false;
  raferal: boolean = false;

  internal: boolean = false;
  external: boolean = false;

  fresher: boolean = false;
  experience: boolean = false;
  refer: boolean = false;

  yes: boolean = false;
  no: boolean = false;
  status: any;
  statuscolor: string = "rgb(153 153 153)";
  resource: Resource = new Resource();
  save: any;
  savedata: any;
  fileToUpload: any;

  // consultants: Consultantselect[] = [];

  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('name') someRef!: MatSelect;
  sourceselect: Sourcetypeselect[] = [
    { sourcetype: 'Naukri', sourcetypecode: 0 },
    { sourcetype: 'Consultant', sourcetypecode: 1 },
    { sourcetype: 'WalkIn', sourcetypecode: 2 },
    { sourcetype: 'Fackbook', sourcetypecode: 3 },
    { sourcetype: 'indeed', sourcetypecode: 4 },
    { sourcetype: 'ReferalType', sourcetypecode: 5 },
  ];
  consultant: Consultantselect[] = [
    { consultantype: 'bluebase', consultantcode: 0 },
    { consultantype: 'Quadsel', consultantcode: 1 },
    { consultantype: 'Feat business solution', consultantcode: 2 },

  ];
  referaltype: Referaltypeselect[] = [
    { referaltypeadd: 'Internal', referaltypeaddcode: 0 },
    { referaltypeadd: 'External', referaltypeaddcode: 1 },

  ];
  referal: Referalselect[] = [
    { referaltype: 'preethi', referaltypecode: 0 },
    { referaltype: 'gopinath', referaltypecode: 1 },

  ];

  postapplied: Postappliedforselect[] = [
    { postappliedfortype: 'senior developer ', postappliedfortypecode: 0 },
    { postappliedfortype: 'junior developer ', postappliedfortypecode: 1 },

  ];
  employeement: Employeementstatusselect[] = [
    { employeementstatustype: 'Fresher', employeementstatustypecode: 0 },
    { employeementstatustype: 'Experience', employeementstatustypecode: 1 },

  ];
  certification: Certificationselect[] = [
    { certificationtype: 'Yes', certificationtypecode: 0 },
    { certificationtype: 'No', certificationtypecode: 1 },

  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    debugger;
    this.formgroup = this.fb.group({
      source: [this.resource.source, [Validators.required]],
      referalname: [this.resource.referelname],
      date: [this.resource.date],
      consultant: [this.resource.consultant],
      consultantadd: [this.resource.consultantadd],
      referaltype: [this.resource.referaltype],
      postappliedfor: [this.resource.postappliedfor, [Validators.required]],
      firstname: [this.resource.firstname, [Validators.required]],
      referalnameaddshow: [this.resource.referaladdshow],
      referalnameadd: [this.resource.referalname],
      lastname: [this.resource.lastname, [Validators.required]],
      gender: [this.resource.gender],
      mobilenumber: [this.resource.mobilenumber, [Validators.required]],
      whatsappnumber: [this.resource.whatsappnumber],
      emailid: [this.resource.emailid, [Validators.required]],
      adhaarnumber: [this.resource.adhaarnumber],
      degree: [this.resource.degree, [Validators.required]],
      college: [this.resource.college, [Validators.required]],
      yearsofpassout: [this.resource.yearsofpassout],
      percentage: [this.resource.percentage],
      employmentstatus: [this.resource.employeestatus],
      companyname: [this.resource.companyname],
      yearofexperience: [this.resource.yearsofexperience],
      totalexperience: [this.resource.totalexperience],
      releventexperience: [this.resource.releventexperience],
      expectedctc: [this.resource.expectedctc],
      currentctc: [this.resource.currentctc],
      certification: [this.resource.certification],
      certificate: [this.resource.certficate],
      certifiedfrom: [this.resource.certifiedfrom],
      validity: [this.resource.validity],
      noofyearexperience: [this.resource.noofyearexperience],
      resume: [this.resource.resume, [Validators.required]],
      status: [this.resource.status],
    });

    this.formgroup.controls.certification.setValue(0);
    this.certificationtypechangedefault(0);

   
    this.referaltypechangedefalt(0);

    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  sourcetypechange(event: any) {


    if (event.value === 1) {
      this.consultanted = true;
      this.raferal = false;
      this.formgroup.controls.consultantadd.setValue(this.consultant[0].consultantcode);

    } else if (event.value === 5) {
      this.consultanted = false;
      this.raferal = true;
      
    }
    console.log(event);
  }
  referaltypechange(event: any) {


    if (event.value === 0) {
      this.internal = true;
      this.external = false;
    } else if (event.value === 1) {
      this.internal = false;
      this.external = true;
    }
    console.log(event);
  }
  referaltypechangedefalt(event: any) {


    if (event === 0) {
      this.internal = true;
      this.external = false;
    } else if (event === 1) {
      this.internal = false;
      this.external = true;
    }
    console.log(event);
  }
  employeementtypechange(event: any) {
    if (event.value === 0) {
      this.fresher = true;
      this.experience = false;
    } else if (event.value === 1) {
      this.fresher = false;
      this.experience = true;
    }
  }

  certificationtypechange(event: any) {
    debugger;
    if (event.value === 0) {
      this.yes = true;
      this.no = false;
    } else if (event.value === 1) {
      this.yes = false;
      this.no = true;
    }
  }
  certificationtypechangedefault(event: any) {
    debugger;
    if (event === 0) {
      this.yes = true;
      this.no = false;
    } else if (event === 1) {
      this.yes = false;
      this.no = true;
    }
  }

  selectedname(event: any) {
    debugger;
    if (event.value === 0) {
      this.formgroup.controls.consultantadd.setValue("Rajeshwari");
    } else if (event.value === 1) {
      this.formgroup.controls.consultantadd.setValue("Girish");
    } else if (event.value === 2) {
      this.formgroup.controls.consultantadd.setValue("Guru");
    }
  }




}
