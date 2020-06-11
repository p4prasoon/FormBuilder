import { Component, OnInit, Input} from '@angular/core';
import { DragulaService } from 'ng2-dragula';

let itemId = 0;

class types {
  id: number;
  constructor(public name: any) {
    this.id = itemId++;
  }
}

@Component({
  selector: 'app-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.css']
})

export class WorkareaComponent implements OnInit {
  @Input() index:number;
  vamps = [
    new types('Text'),
    new types('Numeric Text'),
    new types('Checkbox'),
    new types('Dropdown List'),
    new types('Radio'),
    new types('Photograph'),
    new types('FingerPrint'),
    new types('DatePicker'),
    new types('Audio'),
    new types('Fetch Details'),
    new types('Video'),
    new types('Rating'),
    new types('Barcode'),
    new types('RichTextBox'),
    new types('Geo Location'),
    new types('Additional Action'),
    new types('Seperator'),
    new types('Signature'),
    new types('Sensor'),
    new types('Attachments')
  ];
  views:any = [0];

  droppedItems:any = [];
  attributeItem:any = [
    {
      name:'Text',
      types:[
        {id:22,typeName:'BG Color',defaultValue:'#FFFFFF'},
        {id:23,typeName:'Margin Left',defaultValue:'2'},
        {id:24,typeName:'Margin Top',defaultValue:'0'},
        {id:25,typeName:'Margin Right',defaultValue:'2'},
        {id:26,typeName:'Margin Bottom',defaultValue:'0'},
        {id:27,typeName:'Text Color',defaultValue:'#FFFFFF'},
        {id:28,typeName:'Text Size',defaultValue:'#FFFFFF'},
        {id:29,typeName:'BG Layout',defaultValue:'#FFFFFF'},
        {id:111,typeName:'Height',defaultValue:'#FFFFFF'},
        {id:112,typeName:'Width',defaultValue:'#FFFFFF'},
        {id:128,typeName:'Column No',defaultValue:'#FFFFFF'},
        {id:129,typeName:'Column Span',defaultValue:'#FFFFFF'},
        {id:131,typeName:'Row Span',defaultValue:'#FFFFFF'},
        {id:159,typeName:'Default Value',defaultValue:'#FFFFFF'},
        {id:160,typeName:'Read Only',defaultValue:'#FFFFFF'},
        {id:165,typeName:'Multiline',defaultValue:'#FFFFFF'}
      ]
    }
  ];
  selectedAttributes:any;
  TotalView = [];

  constructor(private dragulaService: DragulaService) {
    // if(!window.localStorage.getItem('views'))
    // window.localStorage.setItem('views',JSON.stringify(this.views));

    
  }
  ngOnInit(){
    let views = JSON.parse(window.localStorage.getItem('views'));
    if(!!views && views.indexOf(this.index)=== -1){
      views.push(this.index);
      window.localStorage.setItem('views',JSON.stringify(views));

      this.dragulaService.createGroup("VAMPIRES"+this.index, {
        copy: (el, source) => {
          return source.id === 'left';
        },
        copyItem: (item:types) => {
      
          return new types(item.name);
        },
        accepts: (el, target, source, sibling) => {
          // To avoid dragging from right to left container
          return target.id !== 'left';
        }
      });
      
      this.dragulaService.dropModel("VAMPIRES"+this.index).subscribe(args => {
        this.droppedItems.push(args.item.name);
        this.selectedAttributes='';
        this.selectedAttributes = this.attributeItem.find(x => x.name === args.item.name).types;
        console.log('attribute:',this.attributeItem[0]);
        console.log(args);
      });
    }
    if(views == null){
      window.localStorage.setItem('views',JSON.stringify(this.views));
      
            this.dragulaService.createGroup("VAMPIRES"+this.index, {
              copy: (el, source) => {
                return source.id === 'left';
              },
              copyItem: (item:types) => {
            
                return new types(item.name);
              },
              accepts: (el, target, source, sibling) => {
                // To avoid dragging from right to left container
                return target.id !== 'left';
              }
            });
            
            this.dragulaService.dropModel("VAMPIRES"+this.index).subscribe(args => {
              this.droppedItems.push(args.item.name);
              this.selectedAttributes='';
              this.selectedAttributes = this.attributeItem.find(x => x.name === args.item.name).types;
              console.log('attribute:',this.attributeItem[0]);
              console.log(args);
            });
    }
    
  }

}
