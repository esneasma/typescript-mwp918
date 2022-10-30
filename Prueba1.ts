// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

import { from, of, Observable } from 'rxjs';
import { filter, map, delay, concatMap } from 'rxjs/operators';

console.log(  '######## Primer Ejemplo #####################################');
const myObs = from('Hello world');
myObs.subscribe((char) => console.log(char));
console.log(  '#############################################');

console.log(  '######## Segundo Ejemplo #####################################');
const myObs2 = from('Hello world');
const  filteredObs1 = myObs2.pipe(
  //concatMap((char) => of(char).pipe(delay(1000))),
  filter((char) => char != ' '),
  map(char => char.toUpperCase())
);

/* deprected
filteredObs1.subscribe( 
  char => console.log(char),
    (error) => console.log('error'),
      () => console.log('complete')
      );
*/
// Lo debemos poner de esta forma!!
 filteredObs1.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
  complete: () => console.info('complete')
 });

console.log(  '#############################################');

console.log(  '######## Tercer Ejemplo #####################################');
const observer = {
  next: (item: any) => {
    console.log('Next:' + item);
  },
  complete: () => {
    console.log('complete');
  },
  error: () => {
    console.log('error');
  },
};
myObs.subscribe(observer);
console.log(  '##############################################');

console.log(  '######## Cuarto Ejemplo #####################################');
let myObs3: Observable<any> = from([0, 1, 2, 3, -4, 5, 6, 7, 8, 9]);
const filteredObs = myObs3.pipe(
  concatMap((num) => of(num).pipe(delay(1000))),
  filter((num) => num != ' '),
  map((num) => {
    let numAux = Math.sqrt(num);
    console.log('map: ', num, numAux);
    if (num === 7) {
      throw Error('Provocamos el error');
    }

    return numAux;
  })
);

filteredObs.subscribe({
  next: (num: any) => {
    console.log('next: ', num);
  },
  complete: () => {
    console.log('Hemos terminado');
  },
  error: (error) => {
    console.log('Mostramos el error: ', error, error.message);
  },
});
console.log(
  '##############################################################################'
);

function next(next: any,arg1: (v: any) => void,error: any,arg3: (e: any) => void,complete: any,arg5: () => void) {
throw new Error('Function not implemented.');
}
