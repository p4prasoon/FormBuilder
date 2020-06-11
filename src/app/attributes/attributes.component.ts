import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit,OnChanges {
@Input() index:number;
@Input() activeAttributes:any;
@Input() selectedHeader:string;
@Input() actvAttrTitle:string;
@Output() updateForm = new EventEmitter();
@Output() removeAttr = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes){
// console.log('changes',changes);
// this.activeAttributes = changes.activeAttributes.currentValue;
  }
  updateWorkArea (_val, _attribute){
    let _obj = {_val:_val,attribute: _attribute}
    this.updateForm.emit(_obj);
  }
  showRemove() {
    let _view = this.index + '-' + this.selectedHeader;
    let _title = this.actvAttrTitle;
    return (_view == '0-0' && (['View', 'Header'].indexOf(_title) != -1));
  }
  remove(){
    this.removeAttr.emit();
  }

}
