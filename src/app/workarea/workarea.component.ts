import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Inject,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { DOCUMENT } from "@angular/common";

import { FormComponent } from "../form/form.component";

import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

let itemId = 0;

class types {
  id: number;
  constructor(public name: any, public icon) {
    this.id = itemId++;
  }
}

@Component({
  selector: "app-workarea",
  templateUrl: "./workarea.component.html",
  styleUrls: ["./workarea.component.css"],
})
export class WorkareaComponent implements OnInit, AfterViewInit {
  @ViewChild(FormComponent, { static: false }) child: FormComponent;
  @Input() index: number;
  @Input() computedAttributes: any;
  @Output() messageEvent = new EventEmitter<string>();
  views: any = [0];
  actvAttrTitle: string = "View";
  droppedItems: any = [];
  droppeedItems: any = [];
  allAttributes: any = [
    {
      name: "Header",
      types: [
        { typeName: "Header Name", defaultValue: "" },
        { typeName: "Columns", defaultValue: "1" },
        { typeName: "IS Skippable", defaultValue: "false" },
      ],
    },
    {
      name: "View",
      types: [
        { typeName: "View Name", defaultValue: "" },
        { typeName: "Orientation", defaultValue: "1" },
        { typeName: "Capture Geo Location", defaultValue: "false" },
        { typeName: "IS Skippable", defaultValue: "false" },
        { typeName: "Show Welcome Message", defaultValue: "false" },
      ],
    },
    {
      name: "Text",
      types: [
        { typeName: "Label", defaultValue: "Change Label" },
        { id: 22, typeName: "background-color", defaultValue: "#FFFFFF" },
        { id: 23, typeName: "margin-left", defaultValue: "2" },
        { id: 24, typeName: "margin-top", defaultValue: "0" },
        { id: 25, typeName: "margin-right", defaultValue: "2" },
        { id: 26, typeName: "margin-bottom", defaultValue: "0" },
        { id: 27, typeName: "color", defaultValue: "#000000" },
        { id: 28, typeName: "font-size", defaultValue: "16" },
        { id: 29, typeName: "BG Layout", defaultValue: "@drawable/rectangle" },
        { id: 111, typeName: "height", defaultValue: "0" },
        { id: 112, typeName: "width", defaultValue: "0" },
        { id: 128, typeName: "Column No", defaultValue: "1" },
        { id: 129, typeName: "Column Span", defaultValue: "1" },
        { id: 131, typeName: "Row Span", defaultValue: "1" },
        { id: 159, typeName: "Default Value", defaultValue: "" },
        { id: 160, typeName: "Read Only", defaultValue: "false" },
        { id: 165, typeName: "Multiline", defaultValue: "false" },
      ],
    },
    {
      name: "Numeric Text",
      types: [
        { typeName: "Label", defaultValue: "Change Label" },
        { id: 22, typeName: "background-color", defaultValue: "#FFFFFF" },
        { id: 23, typeName: "margin-left", defaultValue: "4" },
        { id: 24, typeName: "margin-top", defaultValue: "0" },
        { id: 25, typeName: "margin-right", defaultValue: "2" },
        { id: 26, typeName: "margin-bottom", defaultValue: "0" },
        { id: 27, typeName: "color", defaultValue: "#000000" },
        { id: 28, typeName: "font-size", defaultValue: "16" },
        { id: 29, typeName: "BG Layout", defaultValue: "@drawable/rectangle" },
        { id: 111, typeName: "height", defaultValue: "0" },
        { id: 112, typeName: "width", defaultValue: "0" },
        { id: 128, typeName: "Column No", defaultValue: "1" },
        { id: 129, typeName: "Column Span", defaultValue: "1" },
        { id: 131, typeName: "Row Span", defaultValue: "1" },
        { id: 159, typeName: "Default Value", defaultValue: "" },
        { id: 160, typeName: "Read Only", defaultValue: "false" },
        { id: 165, typeName: "Multiline", defaultValue: "false" },
      ],
    },
  ];
  selectedAttributes: any = [];
  activeAttributes: any;
  TotalHeader: any = [0];
  selectedHeader = 0;

  constructor(
    private dragulaService: DragulaService,
    @Inject(DOCUMENT) document
  ) {}
  ngOnInit() {
    let views = JSON.parse(window.localStorage.getItem("views"));
    if (!!views && views.indexOf(this.index) === -1) {
      views.push(this.index);
      window.localStorage.setItem("views", JSON.stringify(views));

      this.dragulaService.createGroup("VAMPIRES" + this.index, {
        copy: (el, source) => {
          return source.id === "left";
        },
        copyItem: (item: types) => {
          return new types(item.name, item.icon);
        },
        accepts: (el, target, source, sibling) => {
          // To avoid dragging from right to left container
          return target.id !== "left";
        },
      });

      this.dragulaService
        .dropModel("VAMPIRES" + this.index)
        .subscribe((args) => {
          if (args.source.id != args.target.id) {
            let uniqueID = "_" + Math.random().toString(36).substr(2, 9);
            args.item["UID"] = uniqueID;
            var _obj = this.allAttributes.find(
              (x) => x.name === args.item.name
            );
            this.selectedAttributes.push(JSON.parse(JSON.stringify(_obj)));
            this.selectedAttributes[this.selectedAttributes.length - 1][
              "UID"
            ] = uniqueID;
            let _view = this.index,
              _header = this.selectedHeader;
            this.selectedAttributes[this.selectedAttributes.length - 1][
              "view"
            ] = _view + "-" + _header;
            this.selectedAttributes[
              this.selectedAttributes.length - 1
            ].types.forEach((element) => {
              element["UID"] = uniqueID;
            });
            this.activeAttributes = this.selectedAttributes[
              this.selectedAttributes.length - 1
            ].types;
            this.actvAttrTitle = "";
            this.activeAttributes["UID"] = uniqueID;
            args.item["style"] = this.applyInitialStyles(
              args.item,
              this.activeAttributes
            );
            this.droppeedItems.push(args.item);
            this.droppedItems.push(args.item);
            this.messageEvent.emit(this.selectedAttributes);
          }
        });
    }
    if (views == null) {
      window.localStorage.setItem("views", JSON.stringify(this.views));

      this.dragulaService.createGroup("VAMPIRES" + this.index, {
        copy: (el, source) => {
          return source.id === "left";
        },
        copyItem: (item: types) => {
          return new types(item.name, item.icon);
        },
        accepts: (el, target, source, sibling) => {
          // To avoid dragging from right to left container
          return target.id !== "left";
        },
      });

      this.dragulaService
        .dropModel("VAMPIRES" + this.index)
        .subscribe((args) => {
          if (args.source.id != args.target.id) {
            let uniqueID = "_" + Math.random().toString(36).substr(2, 9);
            args.item["UID"] = uniqueID;
            var _obj = this.allAttributes.find(
              (x) => x.name === args.item.name
            );
            this.selectedAttributes.push(JSON.parse(JSON.stringify(_obj)));
            this.selectedAttributes[this.selectedAttributes.length - 1][
              "UID"
            ] = uniqueID;
            let _view = this.index,
              _header = this.selectedHeader;
            this.selectedAttributes[this.selectedAttributes.length - 1][
              "view"
            ] = _view + "-" + _header;
            this.selectedAttributes[
              this.selectedAttributes.length - 1
            ].types.forEach((element) => {
              element["UID"] = uniqueID;
            });
            this.activeAttributes = this.selectedAttributes[
              this.selectedAttributes.length - 1
            ].types;
            this.actvAttrTitle = "";
            args.item["style"] = this.applyInitialStyles(
              args.item,
              this.activeAttributes
            );
            this.droppeedItems.push(args.item);
            this.messageEvent.emit(this.selectedAttributes);
          }
        });
    }
    let uniqueID = "_" + Math.random().toString(36).substr(2, 9);
    let attributes = this.allAttributes.find((x) => x.name === "View");
    this.activeAttributes = attributes.types;
    this.constructViews();
  }
  //Insert headers on viewInitialization
  constructViews() {}

  ngAfterViewInit() {}

  updateWorkArea(_val, _attr) {
    let element = document.getElementById(_attr.UID);
    let styles = [
      "background-color",
      "margin-left",
      "margin-right",
      "margin-bottom",
      "margin-top",
      "color",
      "font-size",
      "height",
      "width",
    ];
    if (_attr.typeName == "Label") {
      element.firstChild["innerText"] = _val;
    } else if (styles.indexOf(_attr.typeName) != -1) {
      if (
        [
          "margin-left",
          "margin-right",
          "margin-bottom",
          "margin-top",
          "font-size",
          "height",
          "width",
        ].indexOf(_attr.typeName) != -1
      ) {
        element.style[_attr.typeName] = _val + "px";
      }
      element.style[_attr.typeName] = _val;
    }
    this.activeAttributes.find(
      (x) => x.typeName == _attr.typeName
    ).defaultValue = _val;
    console.log(this.selectedAttributes.find((x) => x.UID === _attr.UID).types);
  }

  showAttribute($event) {
    let _id = "";
    if ($event._event.target.tagName != "DIV") {
      _id = $event._event.target.parentElement.getAttribute("id");
    } else {
      _id = $event._event.target.getAttribute("id");
    }
    this.activeAttributes = this.selectedAttributes.find(
      (x) => x.UID === _id
    ).types;
    this.actvAttrTitle = "";
  }
  DfltAttrRender(_event) {
    let type = _event.target.name;
    this.actvAttrTitle = type;
    this.activeAttributes = this.allAttributes.find(
      (x) => x.name === type
    ).types;
  }

  applyInitialStyles(_args, _attr) {
    let obj = {
      "margin-left": _attr.find((x) => x.typeName === "margin-left")[
        "defaultValue"
      ],
      "margin-right": _attr.find((x) => x.typeName === "margin-right")[
        "defaultValue"
      ],
      "margin-top": _attr.find((x) => x.typeName === "margin-top")[
        "defaultValue"
      ],
      "margin-bottom": _attr.find((x) => x.typeName === "margin-bottom")[
        "defaultValue"
      ],
      "background-color": _attr.find((x) => x.typeName === "background-color")[
        "defaultValue"
      ],
      color: _attr.find((x) => x.typeName === "color")["defaultValue"],
      "font-size": _attr.find((x) => x.typeName === "font-size")[
        "defaultValue"
      ],
      height: _attr.find((x) => x.typeName === "height")["defaultValue"],
      width: _attr.find((x) => x.typeName === "width")["defaultValue"],
    };
    return {};
  }

  addHeader(e) {
    let that = this;
    this.TotalHeader.push(1);
    this.selectedHeader = this.TotalHeader.length - 1;
    let btn = document.getElementById("btnView" + this.index);
    let elem = document.createElement("input");
    elem.type = "button";
    elem.name = "Header";
    elem.value = "header-" + this.TotalHeader.length;

    elem.onclick = function (e) {
      that.setActiveHeader(e);
    };
    btn.insertBefore(elem, btn.childNodes[btn.children.length - 1]);
    elem.click();
    this.activeAttributes = [];
    this.setActiveClass(elem);
    this.DfltAttrRender(e);
  }
  setActiveHeader(e) {
    let clickedView = e.target.value.split("-")[1];
    this.selectedHeader = clickedView - 1;
    this.setActiveClass(e.target);
    console.log("index:" + this.index, "header:" + this.selectedHeader);
    this.DfltAttrRender(e);
  }
  setActiveClass(_elem) {
    let isCertainButtonAlreadyActive = _elem.parentElement.querySelector(
      ".active"
    );
    // if a Button already has Class: .active
    if (isCertainButtonAlreadyActive) {
      isCertainButtonAlreadyActive.classList.remove("active");
    }

    _elem.className += " active";
  }
  save() {
    let _view = this.index + "-" + this.selectedHeader,
      _data = this.computedAttributes.filter((x) => x.view === _view);
  }
  remove() {
    if (this.actvAttrTitle === "Header") {
      let _prntNode = document.getElementById("btnView" + this.index),
        _elem: HTMLElement = _prntNode.querySelectorAll(
          "[value= header-" + this.selectedHeader + "]"
        )[0] as HTMLElement;
      _prntNode
        .querySelectorAll(
          "[value= header-" + (this.selectedHeader + 1) + "]"
        )[0]
        .remove();
      this.TotalHeader.pop();
      this.computedAttributes = this.computedAttributes.filter(
        ({ view }) => !view.includes(this.index + "-" + this.selectedHeader)
      );
      this.selectedAttributes = this.selectedAttributes.filter(
        ({ view }) => !view.includes(this.index + "-" + this.selectedHeader)
      );
      if (this.TotalHeader.length == 0) {
        this.computedAttributes = this.computedAttributes.filter(
          ({ view }) => !view.includes(this.index + "-")
        );
        let arr = document.getElementsByTagName("app-workarea");
        for (let i = 0, len = arr.length; i < len; i++) {
          let _id = document
            .getElementsByTagName("app-workarea")
            [i].getAttribute("ng-reflect-index");
          if (Number(_id) == this.index) {
            document
              .querySelectorAll("[value= view-" + (Number(_id) + 1) + "]")[0]
              .remove();
            let element: HTMLElement = document.querySelectorAll(
              "[value= view-" + _id + "]"
            )[0] as HTMLElement;
            element.click();
            this.messageEvent.emit(_id);
            break;
          }
        }
        return;
      }
      this.changeHdrName();
      _elem.click();
    } else if (this.actvAttrTitle === "View") {
      this.computedAttributes = this.computedAttributes.filter(
        ({ view }) => !view.includes(this.index + "-")
      );
      this.selectedAttributes = this.selectedAttributes.filter(
        ({ view }) => !view.includes(this.index + "-")
      );
      let arr = document.getElementsByTagName("app-workarea");
      for (let i = 0, len = arr.length; i < len; i++) {
        let _id = document
          .getElementsByTagName("app-workarea")
          [i].getAttribute("ng-reflect-index");
        if (Number(_id) == this.index) {
          document
            .querySelectorAll("[value= view-" + (Number(_id) + 1) + "]")[0]
            .remove();
          let element: HTMLElement = document.querySelectorAll(
            "[value= view-" + _id + "]"
          )[0] as HTMLElement;
          element.click();
          this.messageEvent.emit(_id);
          break;
        }
      }
    } else {
      let _cmptdIndex = this.computedAttributes.findIndex(
          (x) => x.UID == this.activeAttributes[0].UID
        ),
        _slctdIndex = this.selectedAttributes.findIndex(
          (x) => x.UID == this.activeAttributes[0].UID
        );
      this.computedAttributes.splice(_cmptdIndex, 1);
      this.selectedAttributes.splice(_slctdIndex, 1);
      this.child.removeItems(this.activeAttributes[0].UID);
      this.activeAttributes = [];
    }
  }
  changeHdrName() {
    let elem = document
      .getElementById("btnView" + this.index)
      .getElementsByTagName("input");
    for (let i = 0, len = elem.length; i < len; i++) {
      elem[i].value = "header-" + (i + 1);
    }
  }
  showRemove() {
    let _view = this.index + "-" + this.selectedHeader;
    let _title = this.actvAttrTitle;
    return _view == "0-0" && ["View", "Header"].indexOf(_title) != -1;
  }
  generatePdf(_event) {
    let data = document.getElementById("pdfContent");
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }
}
