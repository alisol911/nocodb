import { BoolType } from '../Api';
import UITypes from '../UITypes';

import { PgUi } from './PgUi';

export class SqlUiFactory {
  static create() {
    return PgUi;
  }
}

export type SqlUIColumn = {
  cn?: string;
  dt?: string;
  dtx?: string;
  ct?: string;
  nrqd?: BoolType;
  rqd?: BoolType;
  ck?: string;
  pk?: BoolType;
  un?: BoolType;
  ai?: BoolType;
  cdf?: string | any;
  clen?: number | any;
  np?: string;
  ns?: string;
  dtxp?: string;
  dtxs?: string;
  uidt?: UITypes;
  uip?: string;
  uicn?: string;
  altered?: number;
};
