import { BoardData } from './boardData';
import { TagName } from './element';

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
