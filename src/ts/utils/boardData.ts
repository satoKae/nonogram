type CellStatus = 0 | 1;

export class BoardData {
  constructor(
    private _data: CellStatus[],
    private _width: number,
    private _height: number,
  ) {}

  static fromBase64String(data: string): BoardData {
    return BoardData.fromUint8Array(
      Uint8Array.from(atob(data), (c) => c.charCodeAt(0)),
    );
  }

  static fromUint8Array(data: Uint8Array): BoardData {
    if (data.length < 2) {
      throw new Error();
    }

    const width = data[0];
    const height = data[1];

    const totalCells = width * height;
    const dataLengthInBytes = Math.ceil(totalCells / 8);
    const dataStart = 2;

    if (data.length !== dataStart + dataLengthInBytes) {
      throw new Error();
    }

    const boardData = new Array<CellStatus>(totalCells);

    for (let i = 0; i < totalCells; i++) {
      const byteIndex = dataStart + Math.floor(i / 8);
      const bitIndex = 7 - (i % 8);

      if ((data[byteIndex] & (1 << bitIndex)) !== 0) {
        boardData[i] = 1;
      } else {
        boardData[i] = 0;
      }
    }

    return new BoardData(boardData, width, height);
  }

  get data() {
    return this._data;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  private getData(x: number, y: number): CellStatus {
    return this._data[this._width * y + x];
  }

  private convertToHint(data: CellStatus[]): number[] {
    let count: number = 0;
    let target: CellStatus = 0;
    const hint: number[] = [];
    for (const cell of data) {
      if (cell !== target) {
        if (target == 1 && count !== 0) {
          hint.push(count);
        }
        target = (target + 1) % 2;
        count = 0;
      }
      count++;
    }
    if (target === 1) {
      hint.push(count);
    }
    if (hint.length === 0) {
      hint.push(0);
    }
    return hint;
  }

  getColumnHint(x: number): number[] {
    const columnData: CellStatus[] = new Array<CellStatus>(this._height);
    for (let y = 0; y < this._height; y++) {
      columnData[y] = this.getData(x, y);
    }
    return this.convertToHint(columnData);
  }

  getRowHint(y: number): number[] {
    const RowData: CellStatus[] = this._data.slice(
      this._width * y,
      this._width * (y + 1),
    );
    return this.convertToHint(RowData);
  }

  toUint8Array(): Uint8Array {
    const uint8Array = new Uint8Array(Math.ceil(this._data.length / 8));
    for (let i = 0; i < this._data.length; i++) {
      const byteIndex = Math.floor(i / 8);
      const bitIndex = 7 - (i % 8);
      if (this._data[i] === 1) {
        uint8Array[byteIndex] |= 1 << bitIndex;
      }
    }
    return new Uint8Array([this._width, this._height, ...uint8Array]);
  }

  toBase64String(): string {
    return btoa(String.fromCharCode(...this.toUint8Array()));
  }
}

export function getBoardData(board: HTMLElement): BoardData {
  return new BoardData(
    Array.from(board.children).map((cell) =>
      cell.getAttribute('data-status') === 'painted' ? 1 : 0,
    ),
    Number(board.style.getPropertyValue('--column-size')),
    Number(board.style.getPropertyValue('--row-size')),
  );
}
