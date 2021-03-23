import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileExplorerComponent} from './file-explorer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FileExplorerRoutingModule} from './file-explorer-routing.module';
import {FormsModule} from '@angular/forms';
import {ManagementPanelComponent} from './components/management-panel/management-panel.component';
import {GridComponent} from './components/grid/grid.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    FileExplorerComponent,
    ManagementPanelComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FileExplorerRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [
    FileExplorerComponent
  ]
})
export class FileExplorerModule {
}
