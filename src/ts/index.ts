import init from './init.ts';
import '../css/global.css';
import '../css/board.css';
import { BoardData } from './utils/boardData.ts';
import { setHintData } from './utils/setBoardData.ts';

const app = document.getElementById('app');
if (app) {
  const params = new URL(document.location.toString()).searchParams;
  const data = params.get('data');
  try {
    const boardData = BoardData.fromBase64String(data || '');
    init(app, boardData.width, boardData.height);
    setHintData(boardData);
  } catch (e) {
    console.error(e);
  }
}
