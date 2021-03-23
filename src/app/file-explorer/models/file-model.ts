import {FieldModel} from './field-model';

export interface FileModel extends FieldModel {
  path: string;
  modificationDate: Date;
  size?: number;
  parentPath?: string;
}
