import { Component, ElementRef, HostListener, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from './common/common.service';
import { EventdialogComponent } from './eventdialog/eventdialog.component';
import { Children, NavItem } from './common/navitem';
import { LoginPojo } from './master/model/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  apidata: any[] = [];
  emp: boolean = false;
  hr: boolean = false;
  finance: boolean = false;
  hod: boolean = false;
  topnav: boolean = true;
  childrenitems: Children[] = [];
  @ViewChild('appDrawer') appDrawer: ElementRef | undefined;
  version = VERSION;
  navItems: NavItem[] = [
    {
      menuname: 'master',
      displayName: 'Master',
      disabled: false,
      iconName: 'input',
      children: [{
        menuname: 'departmentmaster',
        displayName: 'Department Master',
        disabled: false,
        iconName: 'input',
        route: 'departmentmaster',
      },
      {
        menuname: 'departmentmapping',
        displayName: 'Department Mapping',
        disabled: false,
        iconName: 'input',
        route: 'departmentmapping',
      },
      {
        menuname: 'companymaster',
        displayName: 'Company Master',
        disabled: false,
        iconName: 'input',
        route: 'companymaster',
      },
      {
        menuname: 'questionmaster',
        displayName: 'Question Master',
        disabled: false,
        iconName: 'input',
        route: 'questionmaster',
      },
      {
        menuname: 'resourcemaster',
        displayName: 'Resource Master',
        disabled: false,
        iconName: 'input',
        route: 'resourcemaster',
      },
      {
        menuname: 'feedbackmaster',
        displayName: 'Feedback Master',
        disabled: false,
        iconName: 'input',
        route: 'feedbackmaster',
      },
      {
        menuname: 'servicemaster',
        displayName: 'Service Master',
        disabled: false,
        iconName: 'input',
        route: 'servicemaster',
      },
      {
        menuname: 'interviewroundsmaster',
        displayName: 'Interview Rounds',
        disabled: false,
        iconName: 'input',
        route: 'interviewroundsmaster',
      },
      {
        menuname: 'interviewmappingmaster',
        displayName: 'Interview Rounds Mapping',
        disabled: false,
        iconName: 'input',
        route: 'interviewmappingmaster',
      },
      {
        menuname: 'rolemaster',
        displayName: 'Role Master',
        disabled: false,
        iconName: 'input',
        route: 'rolemaster',
      },
      {
        menuname: 'prefixmaster',
        displayName: 'Prefixcode Master',
        disabled: false,
        iconName: 'input',
        route: 'prefixmaster',
      },
      {
        menuname: 'clientmaster',
        displayName: 'Client Master',
        disabled: false,
        iconName: 'input',
        route: 'clientmaster',
      },
      {
        menuname: 'sectionmaster',
        displayName: 'Section Master',
        disabled: false,
        iconName: 'input',
        route: 'sectionmaster',
      },
      {
        menuname: 'divisionmaster',
        displayName: 'Division Master',
        disabled: false,
        iconName: 'input',
        route: 'divisionmaster',
      },
      {
        menuname: 'designationmaster',
        displayName: 'Designation Master',
        disabled: false,
        iconName: 'input',
        route: 'designationmaster',
      }
        ,
      {
        menuname: 'callsmaster',
        displayName: 'Calls Master',
        disabled: false,
        iconName: 'input',
        route: 'callsmaster',
      },
      {
        menuname: 'productmaster',
        displayName: 'Product Master',
        disabled: false,
        iconName: 'input',
        route: 'productmaster',
      },
      {
        menuname: 'assetmaster',
        displayName: 'Asset Master',
        disabled: false,
        iconName: 'input',
        route: 'assetmaster',
      },
      {
        menuname: 'jobdescription',
        displayName: 'job description',
        disabled: false,
        iconName: 'input',
        route: 'jobdescription',
      },
      {
        menuname: 'consultantmaster',
        displayName: 'consultantmaster',
        disabled: false,
        iconName: 'input',
        route: 'consultantmaster',
      },
      {
        menuname: 'userrolemater',
        displayName: 'User role master',
        disabled: false,
        iconName: 'input',
        route: 'userrolemaster',
      },]
    },
    // {
    //   menuname: 'asset',
    //   displayName: 'Assets',
    //   disabled: false,
    //   iconName: 'input',
    //   children: [{
    //     menuname: 'simmaster',
    //     displayName: 'Sim Master',
    //     disabled: false,
    //     iconName: 'input',
    //     route: 'simmaster',
    //   },]
    // },
    {
      menuname: 'utilities',
      displayName: 'Utilities',
      disabled: false,
      iconName: 'input',
      children: [{
        menuname: 'salaryadvance',
        displayName: 'Salary Advance',
        disabled: false,
        iconName: 'input',
        route: 'salaryadvance',
      }],
    },
    {
      menuname: 'crm',
      displayName: 'CRM',
      disabled: false,
      iconName: 'input',
      children: [{
        menuname: 'enquiry',
        displayName: 'Enquiry',
        disabled: false,
        iconName: 'input',
        route: 'enquiry',
      },
      {
        menuname: 'lead',
        displayName: 'Lead',
        disabled: false,
        iconName: 'input',
        route: 'lead',
      },
      {
        menuname: 'costsheet',
        displayName: 'Cost Sheet',
        disabled: false,
        iconName: 'input',
        route: 'costsheet',
      },
      {
        menuname: 'costsheetreverse',
        displayName: 'Cost Sheet Reverse',
        disabled: false,
        iconName: 'input',
        route: 'costsheetreverse',
      }]
    },
    {
      menuname: 'resource',
      displayName: 'Resource',
      disabled: false,
      iconName: 'input',
      children: [{
        menuname: 'resourceform',
        displayName: 'Resource Form',
        disabled: false,
        iconName: 'input',
        route: 'resourceform',
      },
      {
        menuname: 'resourcelist',
        displayName: 'Resource List ',
        disabled: false,
        iconName: 'input',
        route: 'resourcelist',
      },
      {
        menuname: 'jobdescriptionviewmaster',
        displayName: 'Job description Form',
        disabled: false,
        iconName: 'input',
        route: 'jobdescriptionviewmaster',
      },
      {
        menuname: 'jobdescriptionlistmaster',
        displayName: 'Jobdescription List',
        disabled: false,
        iconName: 'input',
        route: 'jobdescriptionlistmaster',
      }


      ]

    }
  ]
  login: LoginPojo = new LoginPojo();
  constructor(private navService: CommonService, public dialog: MatDialog, private router: Router) {
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.topnav = true;
      this.router.navigate(['dashboard']);
    } else {
      this.topnav = false;
      this.router.navigate(['/']);
    }

  }
  @HostListener('window:beforeunload') goToPage() {
    this.router.navigate(['dashboard']);
  }
  // tempintraval!: any;
  ngOnInit(): void {
    // var sss = sessionStorage.getItem('logindet');
    // if (sss) {
    //   this.login = JSON.parse(sss);
    // }
    // if (this.login) {
    //   this.topnav = true;
    //   this.router.navigate(['dashboard']);
    // } else {
    //   this.router.navigate([''])
    // }

    // this.tempintraval = setInterval(() => {
    //   console.log("123");
    //   this.navService.checkData().subscribe(res => this.apidata = res);
    // }, 5000);

  }

  upload() {
    const dialogRef = this.dialog.open(EventdialogComponent, {
      width: '250px',
      data: { row: "e" }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
  // ngOnDestroy(): void {
  //   this.tempintraval.unsubscribe();
  // }
  async dashboardview() {
    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    } else {
      this.router.navigate([''])
    }
    if (this.login.empLevel === "Hr") {
      this.emp = false;
      this.hr = true;
      this.finance = false;
      this.hod = false;
    } else if (this.login.empLevel === "Finance") {
      this.emp = false;
      this.hr = false;
      this.finance = true;
      this.hod = false;
    } else if (this.login.empLevel === "Hod") {
      this.emp = false;
      this.hr = false;
      this.finance = false;
      this.hod = true;
    } else {
      this.emp = true;
      this.hr = false;
      this.hod = false;
      this.finance = false;
    }
  }

}
