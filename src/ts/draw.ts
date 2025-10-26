let isDrawing: boolean = false;
const paintedCells = new Set<string>();

export function boardMouseMove(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    const targetElement: HTMLElement = event.target;

    if (
      !targetElement ||
      !targetElement.classList.contains('board-cell') ||
      !isDrawing ||
      paintedCells.has(targetElement.id)
    ) {
      return;
    }

    paintedCells.add(targetElement.id);
    const x: number = Number(targetElement.getAttribute('data-cell-x'));
    const y: number = Number(targetElement.getAttribute('data-cell-y'));

    targetElement.classList.toggle('painted');
  }
}

export function boardContextMenu(event: PointerEvent) {
  event.preventDefault();
}

export function boardMouseDown(event: MouseEvent) {
  isDrawing = true;
  if (event.button === 0) {
    // 左
  } else if (event.button === 2) {
    // 右
  }
}

export function documentMouseUp(event: MouseEvent) {
  isDrawing = false;
  paintedCells.clear();
}
