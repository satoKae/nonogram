export function createNewElement(
  tagName: string,
  classNames?: string[] | string,
  id?: string,
  options?: ElementCreationOptions,
) {
  const element = document.createElement(tagName, options);
  if (typeof classNames === 'string') {
    element.classList.add(classNames);
  } else if (Array.isArray(classNames)) {
    element.classList.add(...classNames);
  }
  if (id) {
    element.id = id;
  }

  return element;
}

export const TagName = {
  rowHint: (y: string | number) => `row-hint-${y}`,
  colHint: (x: string | number) => `col-hint-${x}`,
  boardHint: (x: string | number, y: string | number) => `board-cell-${x}-${y}`,
};
