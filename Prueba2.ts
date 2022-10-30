// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;



import { concatMap, mergeMap, map, delayWhen } from "rxjs/operators";
import { of, interval,Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

//************************************************************************** */
//Observables  "return" values asynchronously
//************************************************************************** */
/*console.log('just after subscribe');
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
 

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');*/

//************************************************************************** */
//Observables can "return" multiple values over time
//************************************************************************** */

/*const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100); // "return" another value
  subscriber.next(200); // "return" yet another
});
 
console.log('before');
foo.subscribe((x) => {
  console.log(x);
});
console.log('after');*/


//But you can also "return" values asynchronously:
 
/*const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300); // happens asynchronously
  }, 1000);
});
 
console.log('before');

//foo.subscribe((x) => { console.log(x);});
foo.subscribe(
  {
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
})
console.log('after');
*/

/*import { concatMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

const pokemonId$ = of(1, 5, 6);

function getPokemonName(id: number) {
  return ajax
    .getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(map(({ name }) => name));
}

pokemonId$.pipe(concatMap((id) => getPokemonName(id))).subscribe(console.log);*/





const pokemonId$ = of(1, 5, 6);

function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    // El resultado de cada petición se retrasará por un periodo aleatorio de tiempo. Esto se hace para poder observar que, al utilizar mergeMap, los resultados de las peticiones se emitirán en un orden aleatorio
    delayWhen((_) => interval(getRandomNumber() * 1000))
  );
}

pokemonId$.pipe(concatMap((id) => getPokemonName(id))).subscribe(console.log);
// Salida: bulbasaur, charmeleon, charizard

// Con mergeMap, el orden de los resultados será aleatorio
//pokemonId$.pipe(mergeMap((id) => getPokemonName(id))).subscribe(console.log);
// Salida: charmeleon, bulbasaur, charizard