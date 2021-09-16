import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Buttons, Clientselect, Jdselect, JobdescriptionviewMaster, Replacement } from '../model/jobdescriptionviewmaster';
import { JobdescriptionviewmasterComponent } from '../jobdescriptionviewmaster/jobdescriptionviewmaster.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
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
  selector: 'app-jobdescriptionviewmasteradd',
  templateUrl: './jobdescriptionviewmasteradd.component.html',
  styleUrls: ['./jobdescriptionviewmasteradd.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class JobdescriptionviewmasteraddComponent implements OnInit {
  @ViewChild(JobdescriptionviewmasterComponent) childReference: any;
  formgroup!: FormGroup;
  jobdescription: JobdescriptionviewMaster = new JobdescriptionviewMaster();

  jdselect: Jdselect[] = [
    { jdtype: 'choose jd title', jdtypecode: 0 },
    { jdtype: 'angular developer', jdtypecode: 1 },
    { jdtype: 'java developer', jdtypecode: 2 },

  ];
  clientselect: Clientselect[] = [
    { clienttype: 'Uco Bank', clienttypecode: 0 },
    { clienttype: 'Health ERP', clienttypecode: 1 },
    { clienttype: 'DB world', clienttypecode: 2 },

  ];
  replacement: Replacement[] = [
    { replacementtype: 'select', replacementtypecode: 0 },
    { replacementtype: 'azhagu', replacementtypecode: 1 },
    { replacementtype: 'anto', replacementtypecode: 2 },

  ];
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  savedata: boolean = false;
  allocation: boolean = false;
  close: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    console.log(this.router.getCurrentNavigation()?.extras.state);

  }

  ngOnInit(): void {
    this.jobdescription = history.state[0];

    this.formgroup = this.fb.group({
      jdtitle: [this.jobdescription.jdtitle, [Validators.required]],
      client: [this.jobdescription.client, [Validators.required]],
      location: [this.jobdescription.location, [Validators.required]],
      experience: [this.jobdescription.experience, [Validators.required]],
      educationalqualification: [this.jobdescription.educationalqualification, [Validators.required]],
      certification: [this.jobdescription.certification, [Validators.required]],
      roles: [this.jobdescription.roles, [Validators.required]],
      skillsrequired: [this.jobdescription.skillsrequired, [Validators.required]],
      joining: [this.jobdescription.joining, [Validators.required]],
      closing: [this.jobdescription.closing, [Validators.required]],
      replacementfor: [this.jobdescription.replacementfor, [Validators.required]],
      ctc: [this.jobdescription.ctc, [Validators.required]],
      allocated: [this.jobdescription.allocate, [Validators.required]]


    });
    debugger;

    if (this.jobdescription.status === "view") {
      this.savedata = true;
      this.allocation = false;
      this.close = false;
    } else if (this.jobdescription.status === "allocate") {
      this.savedata = false;
      this.allocation = true;
      this.close = false;
    } else if (this.jobdescription.status === "close") {
      this.savedata = false;
      this.allocation = false;
      this.close = true;
    }

  }


  saveform() {

  }

  update() {

  }
}
