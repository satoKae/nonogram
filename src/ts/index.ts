import init from './init.ts';
import '../css/global.css';
import '../css/board.css';
import { BoardData, getBoardData } from './utils/boardData.ts';
import { setHintData } from './utils/setBoardData.ts';

const app = document.getElementById('app');

window.addEventListener('load', () => {
  if (app) {
    const params = new URL(document.location.toString()).searchParams;
    const data = params.get('data');
    try {
      if (data) {
        const boardData = BoardData.fromBase64String(data || '');
        init(app, boardData.height, boardData.width);
        setHintData(boardData);
      } else {
        const width = Number(prompt('盤面の幅を入力 (1以上30以下)'));
        if (!width || width < 1 || width > 30) {
          throw new Error();
        }

        const height = Number(prompt('盤面の高さを入力 (1以上30以下)'));
        if (!height || height < 1 || height > 30) {
          throw new Error();
        }

        init(app, height, width);
      }
    } catch (e) {
      console.error(e);
      location.search = '';
    }
  }

  const randomButton = document.getElementById('random-button');
  randomButton?.addEventListener('click', () => {
    if (confirm('現在の盤面はリセットされます。よろしいですか？')) {
      const board = document.getElementById('board');
      if (board) {
        const columnSize = Number(
          board.style.getPropertyValue('--column-size'),
        );
        const rowSize = Number(board.style.getPropertyValue('--row-size'));
        const url = new URL(document.location.toString());
        const randomBoardData = new BoardData(
          Array.from({ length: columnSize * rowSize }).map(
            (_): 0 | 1 => Math.floor(Math.random() * 2) as 0 | 1,
          ),
          columnSize,
          rowSize,
        );
        url.searchParams.set('data', randomBoardData.toBase64String());
        location.href = url.toString();
      }
    }
  });

  const saveButton = document.getElementById('save-button');
  saveButton?.addEventListener('click', () => {
    if (confirm('現在の盤面はリセットされます。よろしいですか？')) {
      const board = document.getElementById('board');
      if (board) {
        const boardData = getBoardData(board);
        const url = new URL(document.location.toString());
        url.searchParams.set('data', boardData.toBase64String());
        location.href = url.toString();
      }
    }
  });

  const newButton = document.getElementById('new-button');
  newButton?.addEventListener('click', (e) => {
    if (!confirm('現在の盤面はリセットされます。よろしいですか？')) {
      e.preventDefault();
    }
  });
});
