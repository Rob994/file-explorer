import {SORT_TYPE} from '../enums/sort-type-enum';
import {FieldModel} from './field-model';

export interface SortSettingsModel extends FieldModel {
  sortType: SORT_TYPE;
}
