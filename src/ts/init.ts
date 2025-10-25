import { COLUMN_SIZE, ROW_SIZE } from './utils/consts.ts';
import { createNewElement, TagName } from './utils/element.ts';

export default function (app: HTMLElement): void {
  app.innerHTML = '';
  app.appendChild(createNewElement('div', 'corner'));
  const colHintElement = app.appendChild(
    createNewElement('div', 'col-hint', 'col-hint'),
  );
  const rowHintElement = app.appendChild(
    createNewElement('div', 'row-hint', 'row-hint'),
  );
  const boardElement = app.appendChild(
    createNewElement('div', 'board', 'board'),
  );

  // 横ヒント
  for (let y = 0; y < ROW_SIZE; y++) {
    rowHintElement
      .appendChild(createNewElement('div', 'row-hint-cell', TagName.rowHint(y)))
      .setAttribute('data-cell-y', y.toString());
  }

  // 縦ヒント
  for (let x = 0; x < COLUMN_SIZE; x++) {
    colHintElement
      .appendChild(createNewElement('div', 'col-hint-cell', TagName.colHint(x)))
      .setAttribute('data-cell-x', x.toString());
  }

  // 盤面
  boardElement.style.setProperty('--column-size', COLUMN_SIZE.toString());
  boardElement.style.setProperty('--row-size', ROW_SIZE.toString());

  for (let y = 0; y < ROW_SIZE; y++) {
    for (let x = 0; x < COLUMN_SIZE; x++) {
      const cellElement = boardElement.appendChild(
        createNewElement('div', 'board-cell', TagName.boardHint(x, y)),
      );

      cellElement.setAttribute('data-cell-x', x.toString());
      cellElement.setAttribute('data-cell-y', y.toString());
    }
  }
}
