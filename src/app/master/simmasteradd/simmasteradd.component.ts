import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { SimMaster } from '../model/simmaster';
import { SimmasterComponent } from '../simmaster/simmaster.component';

@Component({
  selector: 'app-simmasteradd',
  templateUrl: './simmasteradd.component.html',
  styleUrls: ['./simmasteradd.component.css']
})
export class SimmasteraddComponent implements OnInit {
  @ViewChild(SimmasterComponent) childReference: any;
  formgroup!: FormGroup;
  sim: SimMaster = new SimMaster();
  name: any;
  name1: any;
  name2: any;
  statuses: any;
  @ViewChild('name') nameElement!: ElementRef;
  status: string = "InActive";
  statuscolor: string = "rgb(153 153 153)";
  save: any;
  savedata: boolean = true;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  sub!: any;
  ngOnInit(): void {
    debugger;
    this.sub = this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      this.name1 = params.get('name1');
      this.name2 = params.get('name2');
      this.statuses = params.get('status');
      this.save = params.get('save');
      console.log(params);
    });
    debugger;
    this.sim.name = this.name;
    this.sim.name1 = this.name1;
    this.sim.name2 = this.name2;
    this.sim.status = this.statuses;

    if (this.save === "add") {
      this.savedata = true;
    } else {
      this.savedata = false;
    }
    this.formgroup = this.fb.group({
      name: [this.sim.name, [Validators.required]],
      name1: [this.sim.name1, [Validators.required]],
      name2: [this.sim.name2, [Validators.required]],
      status: [this.sim.status, [Validators.required]]
    })
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
  saveform(){

  }

  update(){
    
  }
}
