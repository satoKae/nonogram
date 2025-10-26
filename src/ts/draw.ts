type DrawMode = 'setPaint' | 'setBlank' | 'erase' | 'none';

let isDrawing: boolean = false;
const paintedCells = new Set<string>();
let paintingMode: DrawMode = 'none';

export function boardMouseMove(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    const targetElement: HTMLElement = event.target;

    if (!targetElement) {
      return;
    }

    applyDrawing(targetElement);

    const x: number = Number(targetElement.getAttribute('data-cell-x'));
    const y: number = Number(targetElement.getAttribute('data-cell-y'));
  }
}

export function boardContextMenu(event: PointerEvent) {
  event.preventDefault();
}

export function boardMouseDown(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    const targetElement: HTMLElement = event.target;
    if (!targetElement || !targetElement.classList.contains('board-cell')) {
      return;
    }

    isDrawing = true;

    if (targetElement.hasAttribute('data-status')) {
      paintingMode = 'erase';
    } else if (event.button === 0) {
      paintingMode = 'setPaint';
    } else if (event.button === 2) {
      paintingMode = 'setBlank';
    }

    applyDrawing(targetElement);
  }
}

export function documentMouseUp(event: MouseEvent) {
  isDrawing = false;
  paintingMode = 'none';
  paintedCells.clear();
}

function applyDrawing(targetElement: HTMLElement) {
  if (
    !targetElement.classList.contains('board-cell') ||
    !isDrawing ||
    paintedCells.has(targetElement.id)
  ) {
    return;
  }
  paintedCells.add(targetElement.id);

  switch (paintingMode) {
    case 'setPaint':
      if (targetElement.hasAttribute('data-status')) {
        break;
      }
      targetElement.setAttribute('data-status', 'painted');
      break;

    case 'setBlank':
      if (targetElement.hasAttribute('data-status')) {
        break;
      }
      targetElement.setAttribute('data-status', 'blank');
      break;

    case 'erase':
      targetElement.removeAttribute('data-status');
  }
}
