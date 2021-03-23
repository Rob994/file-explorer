import {Component, Input} from '@angular/core';
import {FileExplorerService} from '../../services/file-explorer.service';
import {faFolder, faSortDown, faSortUp, faSort, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {FieldModel} from '../../models/field-model';
import {SORT_TYPE} from '../../enums/sort-type-enum';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  faFolder = faFolder;
  faFileAlt = faFileAlt;
  faSortDown = faSortDown;
  faSortUp = faSortUp;
  faSort = faSort;
  sortType = SORT_TYPE;
  @Input() fields: Array<FieldModel>;

  constructor(private fileExplorerService: FileExplorerService) {
  }
}
