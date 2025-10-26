type CellStatus = 0 | 1;

export class BoardData {
  private _data: CellStatus[];
  private _width: number;
  private _height: number;

  constructor(
    data: CellStatus[] | Uint8Array,
    width?: number,
    height?: number,
  ) {
    if (data instanceof Uint8Array) {
      if (data.length < 2) {
        throw new Error();
      }

      this._width = data[0];
      this._height = data[1];

      const totalCells = this._width * this._height;
      const dataLengthInBytes = Math.ceil(totalCells / 8);
      const dataStart = 2;

      if (data.length !== dataStart + dataLengthInBytes) {
        throw new Error();
      }

      this._data = new Array<CellStatus>(totalCells);

      for (let i = 0; i < totalCells; i++) {
        const byteIndex = dataStart + Math.floor(i / 8);
        const bitIndex = i % 8;

        if ((data[byteIndex] & (1 << bitIndex)) !== 0) {
          this._data[i] = 1;
        } else {
          this._data[i] = 0;
        }
      }
    } else {
      if (height === undefined || width === undefined) {
        throw new Error();
      }
      this._data = data;
      this._width = width;
      this._height = height;
    }
  }

  get data() {
    return this._data;
  }

  toUint8Array(): Uint8Array {
    const uint8Array = new Uint8Array(Math.ceil(this._data.length / 8));
    for (let i = 0; i < this._data.length; i++) {
      const byteIndex = Math.floor(i / 8);
      const bitIndex = i % 8;
      if (this._data[i] === 1) {
        uint8Array[byteIndex] |= 1 << bitIndex;
      }
    }
    return new Uint8Array([this._width, this._height, ...uint8Array]);
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
