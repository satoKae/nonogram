import { BoardData } from './boardData';
import { createNewElement, TagName } from './element';

export function setBoardData(boardData: BoardData): void {
  boardData.data.forEach((data, i) => {
    const x = i % boardData.width;
    const y = Math.floor(i / boardData.height);
    if (data) {
      document
        .getElementById(TagName.boardHint(x, y))
        ?.setAttribute('data-status', 'painted');
    } else {
      document
        .getElementById(TagName.boardHint(x, y))
        ?.removeAttribute('data-status');
    }
  });
}

export function setHintData(boardData: BoardData): void {
  for (let x = 0; x < boardData.width; x++) {
    const hint = boardData.getColumnHint(x);
    const hintCellElement = document.getElementById(TagName.colHint(x));
    hint.forEach((n) => {
      const hintElement = createNewElement('div', ['hint']);
      hintElement.textContent = String(n);
      hintCellElement?.appendChild(hintElement);
    });
  }
  for (let y = 0; y < boardData.height; y++) {
    const hint = boardData.getRowHint(y);
    const hintCellElement = document.getElementById(TagName.rowHint(y));
    hint.forEach((n) => {
      const hintElement = createNewElement('div', ['hint']);
      hintElement.textContent = String(n);
      hintCellElement?.appendChild(hintElement);
    });
  }
}
