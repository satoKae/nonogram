import { BoardData } from '../src/ts/utils/boardData';
type CellStatus = 0 | 1;

describe('BoardData', () => {
  it('列と行、それぞれのヒントを計算する', () => {
    const data: CellStatus[] = [
      1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1,
    ];
    const boardData = new BoardData(data, 5, 5);

    expect(boardData.getRowHint(0)).toEqual([2, 2]);
    expect(boardData.getRowHint(1)).toEqual([1, 1, 1]);
    expect(boardData.getRowHint(2)).toEqual([3]);
    expect(boardData.getRowHint(3)).toEqual([1, 1]);
    expect(boardData.getRowHint(4)).toEqual([5]);

    expect(boardData.getColumnHint(0)).toEqual([2, 2]);
    expect(boardData.getColumnHint(1)).toEqual([1, 1, 1]);
    expect(boardData.getColumnHint(2)).toEqual([2, 1]);
    expect(boardData.getColumnHint(3)).toEqual([1, 3]);
    expect(boardData.getColumnHint(4)).toEqual([2, 1]);
  });

  it('何も塗られていないとき', () => {
    const data: CellStatus[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const boardData = new BoardData(data, 3, 3);

    expect(boardData.getRowHint(0)).toEqual([0]);
    expect(boardData.getColumnHint(0)).toEqual([0]);
  });

  it('すべて塗られているとき', () => {
    const data: CellStatus[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    const boardData = new BoardData(data, 3, 3);

    expect(boardData.getRowHint(0)).toEqual([3]);
    expect(boardData.getColumnHint(0)).toEqual([3]);
  });

  it('Uint8Arrayへのシリアライズ', () => {
    const data: CellStatus[] = [
      1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1,
      0, 0, 1, 1, 0, 1, 0, 0, 0, 1,
    ];
    const boardData = new BoardData(data, 7, 5);
    const uint8Array = boardData.toUint8Array();
    const newBoardData = new BoardData(uint8Array);

    expect(uint8Array).toBe(
      new Uint8Array([
        0b00000111, 0b00000101, 0b11011101, 0b01011101, 0b00101111, 0b10011010,
        0b00100000,
      ]),
    );
    expect(newBoardData.data).toEqual(boardData.data);
    expect(newBoardData.width).toBe(7);
    expect(newBoardData.height).toBe(5);
  });

  it('Base64へのシリアライズ', () => {
    const data: CellStatus[] = [
      1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1,
      0, 0, 1, 1, 0, 1, 0, 0, 0, 1,
    ];
    const boardData = new BoardData(data, 7, 5);
    const base64String = boardData.toBase64String();

    expect(base64String).toBe('BwXdXS+aIA==');
  });
});
