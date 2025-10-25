import init from './init.ts';
import '../css/global.css';
import '../css/board.css';
import { COLUMN_SIZE, ROW_SIZE } from './utils/consts.ts';

const app = document.getElementById('app');
if (app) {
  init(app, ROW_SIZE, COLUMN_SIZE);
}
