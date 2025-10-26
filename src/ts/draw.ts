export function boardMouseMove(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    const targetElement: HTMLElement = event.target;

    if (!targetElement) {
      return;
    }

    if (!targetElement.classList.contains('board-cell')) {
      return;
    }

    const x = targetElement.getAttribute('data-cell-x');
    const y = targetElement.getAttribute('data-cell-y');
  }
}

export function boardContextMenu(event: PointerEvent) {
  event.preventDefault();
}

export function boardMouseDown(event: MouseEvent) {
  if (event.button === 0) {
    // 左
  } else if (event.button === 2) {
    // 右
  }
}

export function boardMouseUp(event: MouseEvent) {
  return;
}
