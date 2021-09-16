import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InterviewroundsmasterComponent } from '../interviewroundsmaster/interviewroundsmaster.component';
import { InterviewroundsMaster, Costsheetadd, Totaladd, Interviewrounds1 } from '../model/interviewroundsmaster';


@Component({
  selector: 'app-interviewroundsmasteradd',
  templateUrl: './interviewroundsmasteradd.component.html',
  styleUrls: ['./interviewroundsmasteradd.component.css']
})
export class InterviewroundsmasteraddComponent implements OnInit {
  @ViewChild(InterviewroundsmasterComponent) childReference: any;
  formgroup!: FormGroup;
  interviewrounds: InterviewroundsMaster = new InterviewroundsMaster();
  name: any;
  name1: any;
  statuses: any;
  @ViewChild('name') nameElement!: ElementRef;
  @ViewChild('name1') name1Element!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  save: any;
  savedata: boolean = true;

  selectedRow!: number;
  checkboxes!: boolean[];


  selection = new SelectionModel<Costsheetadd>(true, []);
  displayedColumns: string[] = ['check', 'phase',]
  displayedColumns1: string[] = ['totaladd']
  costsheetadd: Costsheetadd[] = [
    { check: '', phase: 'good', }]
  data = Object.assign(this.costsheetadd);
  dataSource = new MatTableDataSource<Costsheetadd>(this.data);
  total: Totaladd[] = [
    { totaladd: '' }]
  data1 = Object.assign(this.total);
  dataSource1 = new MatTableDataSource<Totaladd>(this.data1);



  interviewrounds1: Interviewrounds1[] = [];

  view: boolean = true;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  sub!: any;
  async ngOnInit() {
    debugger;

    this.interviewrounds = history.state[0];
    this.interviewrounds1 = this.interviewrounds.interviewrounds1;
    if (this.interviewrounds.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }


    if (this.interviewrounds.save === "view") {
      this.view = true;
    } else {
      this.view = false;
    }

    this.formgroup = this.fb.group({
      name: [this.interviewrounds.name, [Validators.required]],
      status: [this.interviewrounds.status, [Validators.required]],
      //interviewfeedback: this.interviewrounds.interviewrounds1 || new FormArray([])
     // interviewfeedback: this.fb.array([this.createItem()])
     //name1: [this.interviewrounds1.name1, [Validators.required]],
    });

   

    debugger;
    console.log(this.formgroup.value)
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
  setClickedRow(index: number) {
    this.selectedRow = index;
  }
  toggleSelection(event: any, i: any) {
    debugger;
    this.checkboxes[i] = event.target.checked;

  }

  delete() {
    debugger;

    for (let i = this.checkboxes.length - 1; i >= 0; i--) {
      // If selected, then delete that row.
      if (this.checkboxes[i]) {
        this.costsheetadd.splice(i, 1);
      }
      this.checkboxes = this.checkboxes.filter(checkbox => checkbox === false);
    }
  }

  isAllSelected() {
    debugger;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    debugger;
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }



  add(): void {
    debugger;
    this.costsheetadd.push({ check: '', phase: '' });
    this.dataSource.data = this.costsheetadd;
  }

  removeSelectedRows() {
    debugger;
    this.selection.selected.forEach(item => {
      debugger;
      let index: number = this.data.findIndex((d: Costsheetadd) => d === item);
      if (index === 0) {
        return;
      }
      console.log(this.data.findIndex((d: Costsheetadd) => d === item));
      this.dataSource.data.splice(index, 1);

      this.dataSource = new MatTableDataSource<Costsheetadd>(this.dataSource.data);
    });
    this.selection = new SelectionModel<Costsheetadd>(true, []);
  }
 createItem() {
      return this.fb.group({
        name1: [''],
        headingname: ['']
      })
    }

  saveform() {

  }

  update() {

  }
}
