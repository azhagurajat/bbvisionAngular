import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { EventdialogComponent } from '../eventdialog/eventdialog.component';
import { MatAccordion } from '@angular/material/expansion';
import tippy from "tippy.js";
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTable } from '@angular/material/table';
import { LeavedialogComponent } from '../leavedialog/leavedialog.component';
import { DatePipe, formatDate } from '@angular/common';
import { LeaveTypeSave } from '../master/model/leaveform';
import { LoginPojo } from '../master/model/login';
import { DashboardService } from '../master/service/dashboard.service';
//f
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatAccordion) paymentaccordion!: MatAccordion;
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  @ViewChild('table', { static: false }) table!: MatTable<any>;
  @ViewChild('filter', { static: false }) filter!: ElementRef;
  eventname: string = "";
  att: string = "All";
  attendancetoggle!: boolean;
  Events = [];
  Eventsdialog: any[] = [];
  calendarOptions!: CalendarOptions;
  employee: boolean = false;
  hr: boolean = false;
  finance: boolean = false;
  hod: boolean = false;
  leavesave: LeaveTypeSave = new LeaveTypeSave();
  public pieChartLabels: string[] = ['Present', 'HalfDay', 'Permission', 'CompOff', 'Absent'];
  public pieChartcolors = [
    {
      backgroundColor: [
        '#4A274F',
        '#fff',
        '#8BD8BD',
        '#8AAAE5',
        '#358597'
      ]
    }
  ];
  public interviewstatuslabels: string[] = ['Going On', 'Completed', 'Pending'];
  public interviewstatuscolor = [
    {
      backgroundColor: [
        '#FFFFFF',
        '#1656d2',
        '#0e3786'
      ]
    }
  ];
  public interviewstatusData: number[] = [30, 40, 30];
  public pieChartData: number[] = [40, 20, 20, 10, 10];
  public pieChartType: string = 'pie';
  public pics: any = [
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." },
    { url: "assets/images/business.png", description: "You’ve always been our technical guru, and your passion for your work is clear." }];
  public attendancelist: any = [
    { url: "assets/images/business.png", empname: "Priya Preethi", color: "green", status: "P" },
    { url: "assets/images/business.png", empname: "Aathi", color: "orange", status: "H" },
    { url: "assets/images/business.png", empname: "Surya", color: "red", status: "A" },
    { url: "assets/images/business.png", empname: "Venkat", color: "green", status: "P" },
    { url: "assets/images/business.png", empname: "Valli", color: "orange", status: "H" },
  ];
  public paymentstatus: any = [
    { clientname: "CLMS", amount: "Rs.2000" },
    { clientname: "Vridhi", amount: "Rs.2000" },
    { clientname: "HRMS", amount: "Rs.2000" },
    { clientname: "Stockcat", amount: "Rs.2000" },
    { clientname: "Grt", amount: "Rs.2000" },
  ];
  public paymentcleared: any = [
    { clientname: "CLMS", amount: "Rs.2000" },
    { clientname: "Vridhi", amount: "Rs.2000" },
    { clientname: "HRMS", amount: "Rs.2000" },
    { clientname: "Stockcat", amount: "Rs.2000" },
    { clientname: "Grt", amount: "Rs.2000" },
  ];
  public checkclearancestatus: any = [
    { clientname: "CLMS", amount: "Rs.2000", status: "cleared" },
    { clientname: "Vridhi", amount: "Rs.2000", status: "pending" },
    { clientname: "HRMS", amount: "Rs.2000", status: "pending" },
    { clientname: "Stockcat", amount: "Rs.2000", status: "cleared" },
    { clientname: "Grt", amount: "Rs.2000", status: "pending" },
  ];
  public vendorpayment: any = [
    { name: 'MLM', paid: 'Rs.2000', due: '1000' },
    { name: 'KRM', paid: 'Rs.2000', due: '1000' },
    { name: 'QSE', paid: 'Rs.2000', due: '1000' },
    { name: 'RKM', paid: 'Rs.2000', due: '1000' }
  ]
  public payments: any = [
    { name: "Pending Payments", amount: "Rs.20,000" },
    { name: "Payments Cleared", amount: "Rs.20,000" },
    { name: "Check Clearance Status", amount: "Rs.4000" }
  ];
  public joblist: any = [
    { url: "assets/images/angular.png", jobname: "Senior Angular Developer", time: "FullTime", days: "2 days ago", color: "blue" },
    { url: "assets/images/node.png", jobname: "Node Js Developer", time: "PartTime", days: "5 days ago", color: "orange" },
    { url: "assets/images/php.png", jobname: "Junior Php Developer", time: "FullTime", days: "3 hours ago", color: "blue" },
  ];
  public projectlist: any = [
    { logo: "assets/images/Vriddhi.png", empname: "Preethi", project: "HRMS", start: "02 Mar 2021", end: "19 Aug 2021", deadline: "1 day more", color: "red" },
    { logo: "assets/images/blogo.png", empname: "Aathi", project: "CRMS", start: "06 Jan 2021", end: "21 Jul 2021", deadline: "6 days more", color: "orange" },
    { logo: "assets/images/bluebase.png", empname: "Surya", project: "VRIDHI", start: "09 May 2021", end: "8 Jun 2021", deadline: "15 days more", color: "yellow" },
    { logo: "assets/images/Vriddhi.png", empname: "Suman", project: "IGAS", start: "18 July 2021", end: "03 Dec 2021", deadline: "9 days more", color: "green" }
  ];
  public birthday: any = [
    { url: "assets/images/simbu.jpg", description: "Aathi  🎂 🙂 " },
    { url: "assets/images/v.jpg", description: "Suman  🎂 🙂 " },
    { url: "assets/images/mal.jpg", description: "Saravanan  🎂 🙂 " },
  ]
  public orders: any = [
    { icon: "thumb_up", count: "3", color: "green", reason: "", name: "Won" },
    { icon: "thumb_down", count: "1", color: "red", reason: "Amount Issue", name: "Lost" }
  ]
  public support: any = [
    { icon: "cloud_download", count: "3", color: "orange", name: "Opening" },
    { icon: "cloud_done", count: "2", color: "green", name: "Closed" },
    { icon: "cloud_off", count: "1", color: "red", name: "Pending" }
  ]
  public newjoinees: any = [
    { name: "Preethi", description: "Angular Developer. Welcomes You" },
    { name: "Priya", description: "PHP Developer. Welcomes You" },
    { name: "Raji", description: "Java Developer. Welcomes You" },
    { name: "Aathi", description: "Senior Angular Developer. Welcomes You" },
    { name: "Surya", description: "Junior Angular Developer. Welcomes You" },
    { name: "Venkat", description: "Junior PHP Developer. Welcomes You" },
  ]
  public vendorstatus: any = [
    { name: "MLM", order: "KeyBoard", status: "Ordered", eod: "02/09/2021" },
    { name: "QLN", order: "Mouse", status: "Pending", eod: "21/10/2021" },
    { name: "MLM", order: "Monitor", status: "Shipping", eod: "16/12/2021" },
    { name: "QLN", order: "Remote", status: "Ordered", eod: "08/11/2021" },
    { name: "MLM", order: "AC", status: "Shipping", eod: "06/08/2021" },
    { name: "QLN", order: "Batteries", status: "Pending", eod: "02/10/2021" },
  ]
  public salaryadv: any = [
    { name: "Guru", amount: "Rs.5000", date: "02/04/2021" },
    { name: "Deva", amount: "Rs.8000", date: "09/06/2021" },
    { name: "Jeya", amount: "Rs.10,000", date: "12/08/2021" },
    { name: "Guru", amount: "Rs.5000", date: "02/04/2021" },
    { name: "Deva", amount: "Rs.8000", date: "09/06/2021" },
    { name: "Jeya", amount: "Rs.10,000", date: "12/08/2021" }
  ]
  public conveyance: any = [
    { url: "assets/images/bg.jpg/", name: "Ms.prithika", amount: "Rs.12000" },
    { url: "assets/images/bg.jpg/", name: "Ms.preethi", amount: "Rs.12000" },
    { url: "assets/images/bg.jpg/", name: "Ms.prithika", amount: "Rs.12000" },
    { url: "assets/images/bg.jpg/", name: "Ms.preethi", amount: "Rs.12000" },
    { url: "assets/images/bg.jpg/", name: "Ms.prithika", amount: "Rs.12000" }
  ];
  public welcome: any = [
    { name: "Ms.prithika" },
    { name: "Ms.preethi" },
    { name: "Ms.prithika" },
    { name: "Ms.preethi" },
    { name: "Ms.prithika" },
    { name: "Ms.preethi" },
    { name: "Ms.prithika" },
    { name: "Ms.preethi" },
    { name: "Ms.prithika" },
    { name: "Ms.preethi" },
    { name: "Ms.prithika" },
    { name: "Ms.preethi" },
    { name: "Ms.prithika" },
    { name: "Ms.preethi" }
  ];
  searchText: string = "";
  searchJob: string = "";
  searchProject: string = "";
  searchstatus: string = "";
  searchdocstatus: string = "";
  example: any;
  scheduled = [
    { name: 'Mr. Nice' },
    { name: 'Narco' },
    { name: 'Bombasto' },
    { name: 'Celeritas' },
    { name: 'Magneta' },
    { name: 'RubberMan' },
    { name: 'Dynama' },
    { name: 'Dr IQ' },
    { name: 'Magma' },
    { name: 'Tornado' },

  ];
  status = [
    { name: 'Mr. Nice', status: "MD Cleared" },
    { name: 'Narco', status: "Test" },
    { name: 'Bombasto', status: "Aptitude" },
    { name: 'Celeritas', status: "Hr Round" },
    { name: 'Magneta', status: "Aptitude" },
    { name: 'RubberMan', status: "Technical" },
    { name: 'Dynama', status: "MD Cleared" },
    { name: 'Dr IQ', status: "Aptitude" },
    { name: 'Magma', status: "Hr Round" },
    { name: 'Tornado', status: "Technical" },

  ];
  docstatus = [
    { candidatename: 'Mr. Nice', status: "Submitted" },
    { candidatename: 'Narco', status: "Not Submitted" },
    { candidatename: 'Bombasto', status: "Submitted" },
    { candidatename: 'Celeritas', status: "Not Submitted" },
    { candidatename: 'Magneta', status: "Submitted" },
    { candidatename: 'RubberMan', status: "Not Submitted" },
    { candidatename: 'Dynama', status: "Submitted" },
    { candidatename: 'Dr IQ', status: "Not Submitted" },
    { candidatename: 'Magma', status: "Submitted" },
    { candidatename: 'Tornado', status: "Not Submitted" },

  ];

  compliance = [
    { name: 'GST', amount: "Rs.200" },
    { name: 'ESI', amount: "Rs.200" },
    { name: 'PF', amount: "Rs.200" },
    { name: 'Professional', amount: "Rs.200" },
    { name: 'Tax', amount: "Rs.200" },
    { name: 'IncomeTax', amount: "Rs.200" },
    { name: 'MediClaim', amount: "Rs.200" }
  ];
  renewal = [{ name: 'CRMS', status: "Success" },
  { name: 'MED', status: "Failed" },
  { name: 'GHJ', status: "OnGoing" }]
  callstatus = [
    { icon: "call_received", color: "orange", name: 'Incomming', count: "1" },
    { icon: "call_made", color: "green", name: 'OutGoing', count: "2" },
    { icon: "directions_bike", color: "blue", name: 'Direct', count: "3" }
  ]
  amc = [
    { name: 'MED', payment: "Rs.3000", date: "09/07/2021" },
    { name: 'GHJ', payment: "Rs.5000", date: "11/09/2021" },
    { name: 'KEO', payment: "Rs.2000", date: "07/06/2021" },
    { name: 'POL', payment: "Rs.4000", date: "03/02/2021" }]
  displayedColumnsdoc: string[] = ['candidatename', 'status'];
  dataSourcedoc: any[] = [];
  displayedColumnsstatus: string[] = ['name', 'status'];
  dataSourcestatus: any[] = [];
  displayedColumnsvendor: string[] = ['name', 'paid', 'due'];
  dataSourcevendor: any[] = [];
  displayedColumnsvendorstatus: string[] = ['name', 'order', 'status', 'eod'];
  dataSourcevendorstatus: any[] = [];
  displayedColumnscompliance: string[] = ['name', 'amount'];
  dataSourcecompliance: any[] = [];
  displayedColumnsrenewal: string[] = ['name', 'status'];
  dataSourcerenewal: any[] = [];
  displayedColumnsamc: string[] = ['name', 'payment', 'date'];
  dataSourceamc: any[] = [];
  login: LoginPojo = new LoginPojo();
  leavetype: any[] = [];
  constructor(public appcomp: AppComponent, public dialog: MatDialog, private nameservice: CommonService, private dashboardservice: DashboardService, private router: Router
  ) {
    this.nameservice.getEvents().subscribe(data => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        weekends: true,
        events: data,
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        // validRange: {
        //   start: '2021-07-28'
        // }
      };
    });
    // this.nameservice.closeNav();

  }
  handleEventClick(arg: any) {

  }
  handleDateClick(arg: any) {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    if (arg.dateStr < formattedDate) {
      alert("Back Date Not Allowed");
      return;
    }
    this.nameservice.getEvents().subscribe(data => {
      this.Events = data;
    });
    this.Eventsdialog = [{ eventname: 'Leave' }, { eventname: 'OnDuty' }, { eventname: 'Permission' }];
    // for (let e of this.Events) {
    //   if (e['start'] === arg.dateStr) {
    //     this.Eventsdialog.push(e);
    //   }
    // }
    if (this.Eventsdialog.length !== 0) {
      this.eventname = "";
      const dialogRef = this.dialog.open(EventdialogComponent, {
        maxWidth: '300px',
        minWidth: '300px',
        data: { row: this.Eventsdialog }
      });
      dialogRef.afterClosed().subscribe((data) => {

        this.eventname = data.eventname
        if (this.eventname !== "") {
          this.leavepopup(arg.date);
        }
      });
    }
  }
  leavepopup(date: any) {
    const dialogRefleave = this.dialog.open(LeavedialogComponent, {
      maxWidth: '450px',
      minWidth: '400px',
      data: { row: this.eventname, date: date, leavetype: this.leavetype }
    });
    dialogRefleave.afterClosed().subscribe((data) => {
      var sss = sessionStorage.getItem('logindet');
      if (sss) {
        this.login = JSON.parse(sss);
      }
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      const fromdate = formatDate(data.fromdate, format, locale);
      const todate = formatDate(data.todate, format, locale);
      this.leavesave.from_date = fromdate;
      this.leavesave.to_date = todate;
      this.leavesave.taken_days = data.days;
      this.leavesave.status = 1;
      this.leavesave.StaffId = this.login.empcode;
      this.leavesave.leave_type_id = data.leavetype.leave_type_id;
      const save = JSON.stringify(this.leavesave);
      this.dashboardservice.submitleavetype(save).then(data => {
        alert(data.message);
      }, err => {
        alert(err);
      });
    });
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  public chartClicked(e: any): void {
    console.log(e);
  }
  async ngOnInit() {
    await this.getleavetype();
    await this.appcomp.dashboardview();
    this.employee = this.appcomp.emp;
    this.hr = this.appcomp.hr;
    this.finance = this.appcomp.finance;
    this.hod = this.appcomp.hod;
    this.dataSourcedoc = this.docstatus;
    this.dataSourcestatus = this.status;
    this.dataSourcevendor = this.vendorpayment;
    this.dataSourcevendorstatus = this.vendorstatus;
    this.dataSourcecompliance = this.compliance;
    this.dataSourcerenewal = this.renewal;
    this.dataSourceamc = this.amc;
  }
  async getleavetype() {
    //azasdfasdfasdfasdf


    var sss = sessionStorage.getItem('logindet');
    if (sss) {
      this.login = JSON.parse(sss);
    }
    if (sss) {
      await this.dashboardservice.getleavetype(this.login.empcode).then(data => {
        console.log(data);
        this.leavetype = data.leavetype;
      }, err => {
        this.nameservice.message("Leave_balance", err.message, "error");
      });
    }
  }
  // onEventRender(info: any) {
  //   const tooltip = new Tooltip(info.el, {
  //     title: info.event.title,
  //     placement: 'top',
  //     trigger: 'hover',
  //     container: 'body'
  //   });
  // }
  eventDidMount(info: any) {
    tippy(info.el, {
      content: 'Content to display inside tooltip',
    })
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

  onToggle(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    if (event.checked) {
      this.att = "Dept Wise"
      this.attendancetoggle = true;
    } else {
      this.att = "All"
      this.attendancetoggle = false;
    }
  }
}
