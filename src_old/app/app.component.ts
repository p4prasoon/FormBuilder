import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
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
 
  TotalView:any = [0];
  selectedView = 0;
  
  constructor(private dragulaService: DragulaService) {
    window.localStorage.removeItem('views');
  }

  addView(e){
    let that = this;
    this.TotalView.push(1);
    let btn = document.getElementById("btnGrp");
    let elem = document.createElement("input");
    elem.type = "button";
    this.selectedView++;
    elem.value = "view-"+(this.selectedView+1);

    elem.onclick = function(e){
      that.setActiveView(e);
    }
    btn.insertBefore(elem,btn.childNodes[btn.children.length-1]);
  }
  setActiveView(e){
    let clickedView = e.target.value.split('-')[1];
    this.selectedView = clickedView-1;
  }
}
