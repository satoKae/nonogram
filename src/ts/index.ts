import init from './init.ts';
import '../css/global.css';
import '../css/board.css';

const app = document.getElementById('app');
if (app) {
  init(app);
}
