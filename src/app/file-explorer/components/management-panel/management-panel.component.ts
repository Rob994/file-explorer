import {Component, EventEmitter, Output} from '@angular/core';
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FileExplorerService} from '../../services/file-explorer.service';


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.css']
})
export class ManagementPanelComponent {
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;
  @Output() onChangePath: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fileExplorerService: FileExplorerService) {
  }

  previous() {
    this.fileExplorerService.isRoutingBack = true;
    this.fileExplorerService.navigateBack();
  }

}
