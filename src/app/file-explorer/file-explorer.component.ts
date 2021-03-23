import {Component} from '@angular/core';
import {FieldModel} from './models/field-model';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  gridFields: Array<FieldModel> = [
    {name: 'name', type: 'string'},
    {name: 'modificationDate', type: 'date'},
    {name: 'type', type: 'string'},
    {name: 'size', type: 'number'},
  ];

  constructor() {
  }
}
