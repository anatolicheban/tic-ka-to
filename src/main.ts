import "./style.scss";
import { combinations, Coord, GameMatrix, Turn } from "./models.ts";

declare global {
  interface Window {
    game: Game;
  }
}

let game: Game;

export class Game {
  // app: null | Element;

  gameMatrix: GameMatrix;

  currTurn: Turn = "K";

  board: Element | null;

  isGameEnd = false;

  winnerEl: Element;

  constructor() {
    if (game) return game;
    game = this;
    window.game = game;
    this.initMatrix();
    this.board = document.getElementById("game-field");

    Array.from((this.board as Element).children).forEach((row, y) => {
      Array.from(row.children).forEach((field, x) => {
        field.addEventListener("click", () => {
          this.turn(x, y);
        });
      });
    });
    document.getElementById("reset")?.addEventListener("click", () => {
      this.resetGame();
    });

    this.winnerEl = document.getElementById("winner") as Element;
  }

  initMatrix() {
    this.gameMatrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  turn(x: number, y: number) {
    if (!this.gameMatrix[y][x] && !this.isGameEnd) {
      this.gameMatrix[y][x] = this.currTurn;
      this.checkForWin();
    }
    this.drawBoard();
  }

  drawBoard() {
    console.clear();
    this.gameMatrix.forEach((row) => console.log(row));
    for (let mY = 0; mY < this.gameMatrix.length; mY++) {
      for (let mX = 0; mX < this.gameMatrix[mY].length; mX++) {
        (this.board as Element).children[mY].children[mX].innerHTML =
          this.gameMatrix[mY][mX] !== null
            ? `<img src="/${this.gameMatrix[mY][mX]}.jpg" alt='${this.gameMatrix[mY][mX]}'/>`
            : "";
      }
    }
  }

  checkForWin() {
    for (let i = 0; i < combinations.length; i++) {
      if (
        combinations[i].every(
          (coord) => this.gameMatrix[coord[0]][coord[1]] === this.currTurn,
        )
      )
        return this.setWinner(this.currTurn, combinations[i]);
    }
    this.currTurn = this.currTurn === "K" ? "T" : "K";
  }

  setWinner(turn: Turn, comb: [Coord, Coord, Coord]) {
    comb.forEach((el) => {
      this.board?.children[el[0]].children[el[1]].classList.add("active");
    });
    this.stopGame();
    this.winnerEl.children[turn === "K" ? 1 : 0].classList.add("active");
  }

  stopGame() {
    this.isGameEnd = true;
  }

  resetGame() {
    for (let i = 0; i < this.winnerEl.children.length; i++) {
      this.winnerEl.children[i].classList.remove("active");
    }

    Array.from((this.board as Element).children).forEach((row) => {
      Array.from(row.children).forEach((field) => {
        field.classList.remove("active");
      });
    });

    this.initMatrix();
    this.drawBoard();
    this.currTurn = "K";
    this.isGameEnd = false;
  }
}

new Game();
