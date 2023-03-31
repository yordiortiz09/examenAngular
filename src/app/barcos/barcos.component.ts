import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcos',
  templateUrl: './barcos.component.html',
  styleUrls: ['./barcos.component.css'],
})
export class BarcosComponent implements OnInit {
  grid1: number[][] = [];
  grid2: number[][] = [];
  ships: number = 5;
  ships1: number = 5;
  gameOver: boolean = false;
  isPlayer1Turn: boolean = true;

  constructor() {}

  ngOnInit(): void {
    // Inicializar las matrices con celdas vacías
    for (let i = 0; i < 8; i++) {
      this.grid1[i] = [];
      this.grid2[i] = [];
      for (let j = 0; j < 8; j++) {
        this.grid1[i][j] = 0;
        this.grid2[i][j] = 0;
      }
    }

    // Colocar los barcos en posiciones aleatorias sin repetir en ambas tablas
    let count1 = 0;
    while (count1 < this.ships) {
      let row = Math.floor(Math.random() * 8);
      let col = Math.floor(Math.random() * 8);
      if (this.grid1[row][col] === 0) {
        this.grid1[row][col] = 1;
        count1++;
        console.log(
          `Barco generado en la fila ${row}, columna ${col} de la tabla 1`
        );
      }
    }

    let count2 = 0;
    while (count2 < this.ships) {
      let row = Math.floor(Math.random() * 8);
      let col = Math.floor(Math.random() * 8);
      if (this.grid2[row][col] === 0) {
        this.grid2[row][col] = 1;
        count2++;
        console.log(
          `Barco generado en la fila ${row}, columna ${col} de la tabla 2`
        );
      }
    }
  }

  getShipImage1(row: number, col: number): string {
    return this.grid1[row][col] === 1
      ? 'assets/barco2.png'
      : this.grid1[row][col] === 2
      ? 'assets/fuego.png': 'assets/agua.png';
  }

  getShipImage2(row: number, col: number): string {
    return this.grid2[row][col] === 1 ? 'assets/barco2.png' : this.grid2[row][col] === 2? 'assets/fuego.png'
      : 'assets/agua.png';
  }

  handleClick1(row: number, col: number): void {
    if (!this.isPlayer1Turn) {
      return alert('¡No es tu turno!');
    }
  if (this.gameOver) {
      return alert('¡El juego ha terminado!');
    }
    const cell = this.grid1[row][col];
    if (cell === 1) {
      alert('¡Le diste a un barco!');
      this.grid1[row][col] = 2;
      this.ships--;
      if (this.ships === 0) {
        this.gameOver = true;
        alert('¡Jugador 1 ganó!');
        return;
      }
    } else if (cell === 2 || cell === 3) { // La celda ya ha sido atacada antes
      return alert('Ya has atacado esa celda antes.');
    } else {
      alert('¡Fallaste!');
      this.grid1[row][col] = 3;
    }
  
    this.isPlayer1Turn = false;
  }
  
  handleClick2(row: number, col: number): void {
    if (this.isPlayer1Turn) {
      return alert('¡No es tu turno!');
    }
    if (this.gameOver) {
      return alert('¡El juego ha terminado!');
    }
  
    const cell = this.grid2[row][col];
    if (cell === 1) {
      alert('¡Le diste a un barco!');
      this.grid2[row][col] = 2;
      this.ships1--;
      if (this.ships1 === 0) {
        alert('¡Jugador 2 ha ganado!');
        this.gameOver = true;
      }
    } else if (cell === 2 || cell === 3) { // La celda ya ha sido atacada antes
      return alert('Ya has atacado esa celda antes.');
    } else {
      alert('¡Fallaste!');
      this.grid2[row][col] = 3;
    }
  
   
      this.isPlayer1Turn = true;
  
  }
}
