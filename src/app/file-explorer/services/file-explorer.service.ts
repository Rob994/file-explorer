import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileModel} from '../models/file-model';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {SortSettingsModel} from '../models/sort-settings-model';
import {SORT_TYPE} from '../enums/sort-type-enum';
import {FieldModel} from '../models/field-model';
import {FileExplorerComponent} from '../file-explorer.component';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  path: string;
  searchValue: string;
  isRoutingBack = false;
  routingHistory = [];
  currentRouteFiles: Array<FileModel>;
  sortSettings: SortSettingsModel = {
    name: '',
    type: '',
    sortType: SORT_TYPE.DEFAULT,
  };
  private files: Array<FileModel>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        if (!this.isRoutingBack) {
          this.routingHistory.push(this.router.url.substr(1));
        } else {
          this.isRoutingBack = false;
        }
      }
    });
    this.getCurrentRouteFiles();
  }

  navigate(url: string): void {
    this.path = url;
    this.checkPath(url);
    url = `fileExplorer/${url}`;
    this.router.resetConfig([
      {path: url, component: FileExplorerComponent}
    ]);
    this.searchValue = '';
    this.search();
    this.cleanSortSettings();
    this.router.navigateByUrl(url);
  }

  navigateBack(): void {
    const previousPath = this.routingHistory.pop();
    if (typeof previousPath === 'string') {
      this.router.resetConfig([
        {path: previousPath, component: FileExplorerComponent}
      ]);
      if (previousPath.includes('fileExplorer/')) {
        this.path = previousPath.replace('fileExplorer/', '');
      } else {
        this.path = previousPath.replace('fileExplorer', '');
      }
      this.searchValue = '';
      this.search();
      this.router.navigateByUrl((previousPath));
    }
  }

  getCurrentRouteFiles() {
    this.getPaths();
  }

  search() {
    if (this.searchValue) {
      if (this.path === '') {
        this.currentRouteFiles = this.files.filter(file => file.name.includes(this.searchValue));
      } else {
        this.currentRouteFiles = this.files.filter(file => (!file.parentPath || file.parentPath.includes(this.path)) &&
          file.name.includes(this.searchValue));
      }
    } else {
      if (this.path === '') {
        this.currentRouteFiles = this.files.filter(file => file.parentPath === undefined);
      } else {
        this.currentRouteFiles = this.files.filter(file => file.parentPath === this.path);
      }
    }
    this.cleanSortSettings();
  }

  columnSort(field: FieldModel) {
    if (this.sortSettings.name === '' || this.sortSettings.name !== field.name) {
      this.sortSettings.name = field.name;
      this.sortSettings.sortType = SORT_TYPE.SORT_UP;
      this.sortSettings.type = field.type;
    } else {
      if (this.sortSettings.sortType === SORT_TYPE.SORT_UP) {
        this.sortSettings.sortType = SORT_TYPE.SORT_DOWN;
      } else {
        this.cleanSortSettings();
      }
    }
    this.sortAlgorithm();
  }

  private checkPath(url: string) {
    const isContain = this.files.find(file => file.path === url);
    if (!isContain) {
      alert(`can not find ${url} path`);
    }
  }

  private cleanSortSettings() {
    this.sortSettings = {
      name: '',
      type: '',
      sortType: SORT_TYPE.DEFAULT,
    };
  }

  private sortAlgorithm() {
    if (this.sortSettings.sortType === SORT_TYPE.DEFAULT) {
      this.getCurrentRouteFiles();
    } else if (this.sortSettings.sortType === SORT_TYPE.SORT_UP) {
      this.currentRouteFiles.sort((a, b) => -this.sortConfigs(a[this.sortSettings.name], b[this.sortSettings.name]));
    } else {
      this.currentRouteFiles.sort((a, b) => this.sortConfigs(a[this.sortSettings.name], b[this.sortSettings.name]));
    }
  }

  private sortConfigs(prev: any, next: any): 1 | -1 {
    if (this.sortSettings.type === 'number') {
      prev = prev ? prev : 0;
      next = next ? next : 0;
      prev = Number(prev);
      next = Number(next);
    } else if (this.sortSettings.type === 'date') {
      prev = new Date(prev);
      next = new Date(next);
    }
    if (prev < next) {
      return 1;
    } else {
      return -1;
    }
  }

  private getPaths() {
    return this.httpClient.get('assets/files/paths.json').subscribe(res => {
      this.files = Object.values(res).map(item => {
        return item;
      });
      this.configurePaths('');
      this.search();
    });
  }

  private configurePaths(parentPath: string) {
    let findParents: Array<FileModel>;
    if (parentPath) {
      findParents = this.files.filter(item => {
        let parentIndex = item.path.indexOf(parentPath + '/');
        if (parentIndex !== -1) {
          parentIndex += parentPath.length + 1;
          if (item.path.indexOf('/', parentIndex) === -1) {
            item.parentPath = parentPath;
            item.name = item.path.slice(parentPath.length + 1, item.path.length);
            return true;
          } else {
            return false;
          }
        }
      });
    } else {
      findParents = this.files.filter(item => {
        if (item.path.indexOf('/') === -1) {
          item.name = item.path;
          return true;
        } else {
          return false;
        }
      });
    }
    if (findParents.length) {
      findParents.forEach(item => this.configurePaths(item.path));
    }
  }

}
