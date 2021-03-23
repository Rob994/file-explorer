import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'fileExplorer', loadChildren: () => import('../app/file-explorer/file-explorer.module').then(m => m.FileExplorerModule)},
  {path: '', pathMatch: 'full', redirectTo: 'fileExplorer'},
  {path: '**', redirectTo: 'fileExplorer'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
