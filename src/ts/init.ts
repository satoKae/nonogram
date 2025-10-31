import {
  boardContextMenu,
  boardMouseDown,
  boardMouseMove,
  documentMouseUp,
} from './draw.ts';
import { createNewElement, TagName } from './utils/element.ts';

export default function (
  app: HTMLElement,
  rowSize: number,
  columnSize: number,
): void {
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
  for (let y = 0; y < rowSize; y++) {
    rowHintElement
      .appendChild(createNewElement('div', 'row-hint-cell', TagName.rowHint(y)))
      .setAttribute('data-cell-y', y.toString());
  }

  // 縦ヒント
  for (let x = 0; x < columnSize; x++) {
    colHintElement
      .appendChild(createNewElement('div', 'col-hint-cell', TagName.colHint(x)))
      .setAttribute('data-cell-x', x.toString());
  }

  // 盤面
  boardElement.style.setProperty('--column-size', columnSize.toString());
  boardElement.style.setProperty('--row-size', rowSize.toString());

  boardElement.addEventListener('contextmenu', boardContextMenu);
  boardElement.addEventListener('mousemove', boardMouseMove);
  boardElement.addEventListener('mousedown', boardMouseDown);
  document.addEventListener('mouseup', documentMouseUp);

  for (let y = 0; y < rowSize; y++) {
    for (let x = 0; x < columnSize; x++) {
      const cellElement = boardElement.appendChild(
        createNewElement('div', 'board-cell', TagName.boardHint(x, y)),
      );

      cellElement.setAttribute('data-cell-x', x.toString());
      cellElement.setAttribute('data-cell-y', y.toString());
    }
  }

  document.getElementById('control')?.classList.remove('d-none');
}
