import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcos',
  templateUrl: './barcos.component.html',
  styleUrls: ['./barcos.component.css']
})
export class BarcosComponent implements OnInit {
  grid: number[][] = [];
  ships: number = 30;
  gameOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Inicializar la matriz con celdas vacías
    for (let i = 0; i < 30; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 30; j++) {
        this.grid[i][j] = 0;
      }
    }

    // Colocar los barcos en posiciones aleatorias sin repetir
    let count = 0;
    while (count < this.ships) {
      let row = Math.floor(Math.random() * 30);
      let col = Math.floor(Math.random() * 30);
      if (this.grid[row][col] === 0) {
        this.grid[row][col] = 1;
        count++;
      }
    }
  }

  getShipImage(row: number, col: number): string {
    return this.grid[row][col] === 1 ? 'assets/barco2.png' :
           this.grid[row][col] === 2 ? 'assets/fuego.png' : 'assets/agua.png';
  }
  
  handleClick(row: number, col: number): void {
    const cell = this.grid[row][col];
    if (cell === 1) {
      alert("¡Le diste a un barco!");
      this.grid[row][col] = 2;
      this.ships--;
      if (this.ships === 0) {
        this.gameOver = true;
      }
    } else {
      alert("¡Fallaste!");
    }
  }
}
