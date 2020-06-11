import { Component, ViewChildren, QueryList } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { WorkareaComponent } from './workarea/workarea.component';

let itemId = 0;

class types {
  id: number;
  constructor(public name: any) {
    this.id = itemId++;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  @ViewChildren('child') child: QueryList<WorkareaComponent>


  TotalView: any = [0];
  selectedView = 0;
  Attributes: any = [];

  constructor(private dragulaService: DragulaService) {
    window.localStorage.removeItem('views');
  }

  addView(e) {
    let that = this;
    this.TotalView.push(this.selectedView + 1);
    this.selectedView = this.TotalView.length - 1;
    let btn = document.getElementById("btnGrp");
    let elem = document.createElement("input");
    elem.type = "button";
    elem.name = "View";
    elem.value = "view-" + (this.TotalView.length);
    elem.onclick = function (e) {
      that.setActiveView(e);
    }
    btn.insertBefore(elem, btn.childNodes[btn.children.length - 1]);
    this.setActiveClass(elem);
    let _arr: any = this.child.toArray();
    for (let i = 0, len = _arr.length; i < len; i++) {
      if (this.selectedView == _arr[i].index) {
        _arr[i].DfltAttrRender(e);
      }
    }
  }
  setActiveView(e) {
    let clickedView = e.target.value.split('-')[1];
    this.selectedView = clickedView - 1;
    this.setActiveClass(e.target);
    let _arr: any = this.child.toArray();
    for (let i = 0, len = _arr.length; i < len; i++) {
      if (this.selectedView == _arr[i].index) {
        _arr[i].DfltAttrRender(e);
      }
    }
  }
  changeVWName() {
    let elem = document.getElementById("btnGrp").getElementsByTagName('input');
    for (let i = 0, len = elem.length; i < len; i++) {
      elem[i].value = 'view-' + (i + 1);
    }
  }
  setActiveClass(_elem) {
    let isCertainButtonAlreadyActive = _elem.parentElement.querySelector(".active");
    // if a Button already has Class: .active
    if (isCertainButtonAlreadyActive) {
      isCertainButtonAlreadyActive.classList.remove("active");
    }

    _elem.className += " active";
  }
  receiveMessage(_attr: any) {
    if (typeof (_attr) == "string") {
      this.TotalView.splice(Number(_attr), 1);
      this.Attributes = this.Attributes.filter(({view}) => !view.includes(_attr+'-'));
      this.changeVWName();
    } else {
      if (this.Attributes.length == 0) {
        this.Attributes = this.Attributes.concat(_attr);
      } else {
        let uids = new Set(this.Attributes.map(d => d.UID));
        this.Attributes = [...this.Attributes, ..._attr.filter(d => !uids.has(d.UID))];
      }
    }
  }
}
