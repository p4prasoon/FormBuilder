import { Component, OnInit, Input } from '@angular/core';

let itemId = 0;

class types {
  id: number;
  constructor(public name: any,public icon) {
    this.id = itemId++;
  }
}

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  @Input() index:any
  constructor() { }
  tools = [
    new types('Text','fa-font'),
    new types('Numeric Text','fa-html5'),
    new types('Checkbox','fa-list'),
    new types('Dropdown List','fa-bars'),
    new types('Radio','fa-list-ul'),
    new types('Photograph','fa-camera'),
    new types('FingerPrint','fa-thumbs-o-up'),
    new types('DatePicker','fa-calendar'),
    new types('Audio','fa-headphones'),
    new types('Fetch Details','fa-refresh'),
    new types('Video','fa-video-camera'),
    new types('Rating','fa-star-o'),
    new types('Barcode','fa-barcode'),
    new types('RichTextBox','fa-file-text-o'),
    new types('Geo Location','fa-location-arrow'),
    new types('Additional Action','fa-plus'),
    new types('Seperator','fa-ellipsis-v'),
    new types('Signature','fa-pencil'),
    new types('Sensor','fa-thermometer-full'),
    new types('Attachments','fa-paperclip')
  ];

  ngOnInit() {
  }

}
