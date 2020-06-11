import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input()droppedItems:any;
  @Input()index:number;
  @Output() attributeEvent = new EventEmitter();
  @Input()computedAttributes:any;
  @Input()header:any;
  droppeedItems:any =[];
  constructor() { }

  ngOnInit() {
    let _view = this.index+"-"+this.header;
    this.droppedItems = this.computedAttributes.filter(x=>x.view == _view);
  }
  ngOnChanges(_changes){}
  showAttribute(_val,_event){
    let _obj = {_val:_val,_event:_event}
    this.attributeEvent.emit(_obj);
  }
  removeItems(_uid){
    let _drpdIndex = this.droppedItems.findIndex(x => x.UID == _uid);              
    this.droppedItems.splice(_drpdIndex,1);
  }

}
