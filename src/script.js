import { interval, Observable, of , concat, merge, combineLatest, zip} from "rxjs";
import { filter, first, last, map, skip, startWith, take, takeLast, tap, withLatestFrom, scan} from "rxjs/operators";

//  const foo = interval(500).pipe(take(4));
//  const more = interval(300).pipe(take(5));
// let foo = of(1,2,3,4,5,6,7,8,9);
//#region Use calculate like an own observable
// let multiply = (x, n) => x* n;
// let divide = (x, n) => x/n;
// let add = (x, n) => x+n;
// let substract = (x, n) => x-n;

// function calculate(transformationFn, n) {
//     const result = function (source) {
//       return new Observable((observer) => {
//         return source.subscribe({
//           next: (x) => observer.next(transformationFn(x, n)),
//           error: (err)=> observer.error(err),
//           complete: ()=>observer.complete()
//         });
//       });
//     }; 
//     return result;
//   }

// let bar1 = foo.pipe(
//     calculate(multiply, 10), 
//     take(5)
//     ).subscribe(
//          x => console.log(`Next bar1: ${x}`),
//          (err)=> console.log(`Error ${err}`),
//          ()=> console.log("Bar1 Complete")
//     );
//#endregion

//#region use map to do something
// let bar = foo.pipe(map(x => (x+1)*10), take(5));
// bar.subscribe(
//   (x) => console.log('next ' + x),
//   (err) => console.log('error ' + err),
//   () => console.log('done')
// );
//#endregion

//#region using concat to excecute the two observables in order 
// let bar1 = foo.pipe(
//     calculate(multiply, 10), 
//     take(5)
//     );

// let bar = foo.pipe(map(x => (x+1)*10), take(5));

// concat(bar1, bar).subscribe(console.log)

//#endregion

//#region Using do for debuggion purposes (idk why thy dont use tap)
// let bar = foo.pipe(
//     tap((x) => console.log("before " + x)),
//     map((x) => x * 10),
//     tap((x) => console.log("after " + x))
//   )
//let barSamaAsDo = foo.map(function(x){return x})
//#endregion

//#region some important operators

// const bar = foo.pipe(
// //filter(x => x>2), //filtra los datos dada una condicion
// //take(5), //toma los primeros 5 valores y despues los ignora
// //first(), //toma solo el primer valor
// //skip(1), //igonora los primeros n valores que le pongas en el argumento
// //takeLast(3), //muy parecido a take, solo que en vez de tomar los primeros valores, toma los ultimos
// //last(), //lo mismo que first pero al reves 
// );
//  const bar = concat(foo, more) // ejecuta primero foo y despues more

//const bar= merge(foo, more)

//#region combineLatest
/*
----0----1----2----(3|)     (weight)
--0--1--2--3--(4|)          (height)
   combineLatest((x, y) => x+y)
----01--23-4--(56)-(7|)
*/

// This is deprecated. To combine observables, use combineLatest(observable, observable)
// let combined = foo.pipe(combineLatest(more, (x, y) => x + y));
//const bar = combineLatest(foo, more, (x,y) => x+y);
//#endregion


 //#endregion

//#region  withLatestForm
//en este ejemplo toma el ultimo valor, con la condicion del seguondo observable
// const foo = zip(interval(500), of("H", "e", "l", "l", "o"), (_, c) => c).pipe(
//     take(5)
//   );
  
//   const bar = zip(interval(300), of(0, 1, 0, 1, 0, 1, 0), (_, n) => n).pipe(
//     take(7)
//   );
  
//   /*
//   ----H----e----l----l----o|     (foo)
//   --0--1--0--1--0--1--0|         (bar)
//     withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
//   ----h----e----l----L----o|
//   */
  
//   const result = foo.pipe(
//     withLatestFrom(bar, (c, n) => {
//       return n === 1 ? c.toUpperCase() : c.toLowerCase();
//     })
//   );
  
//   result.subscribe(
//     function (x) {
//       console.log("next " + x);
//     },
//     function (err) {
//       console.log("error " + err);
//     },
//     function () {
//       console.log("done");
//     }
//   );
//#endregion

//#region Zip operator
// /*
// ---0---1---2---3---4|     (foo)
// ---0---1---2---3|     (more)
//   zip((x,y) => x)
// ---0---2---4---6|
// */

// // First of foo + First of bar => First of output
// // Second of foo + Second of bar => Second of output
// // ...
// // n-th of foo + n-th of bar => n-th of output
// const bar = zip(foo, more, (x, y)=>x+y)

// bar
// //.pipe(startWith(5))
// .subscribe(
//   (x) => console.log('next ' + x),
//   (err) => console.log('error ' + err),
//   () => console.log('done')
// );
//#endregion

//#region scan operator

// let foo = of('h', 'e', 'l', 'l', 'o');
// let bar = interval(600).pipe(
//   take(5)
// )

// /*
// (hello|)                          (foo)
// -----0-----1-----2-----3-----4|   (bar)
//        zip((x,y) => x)
// -----h-----e-----l-----l-----o|
//   scan((acc, x) => acc+x, '')
// -----h-----(he)--(hel)-(hell)(hello|)
// */

// let combined = zip(foo, bar, (x,y) => x).pipe(scan((acc, x) => acc+x, ''));

// combined.subscribe(
//   (x) => console.log('next ' + x),
//   (err) => console.log('error ' + err),
//   () => console.log('done')
// );

//#endregion

//#region Group Consecutive Values Together with RxJS Operator buffer

// let foo = zip(interval(600), of('h', 'e', 'l', 'l', 'o')).pipe(
//     map(([x, y]) => y),
//     take(5)
//   );
  
//   let bar = interval(900).pipe(
//     take(3)
//   )
//   /*
//   -----h-----e-----l-----l-----o|       (foo)
//   --------0--------1--------2|          (bar)
  
//           buffer(bar)
  
//   --------h--------e--------ll|
//   */
  
//   let result = foo.pipe(buffer(bar));
  
//   result.subscribe(
//     (x) => console.log('next ' + x),
//     (err) => console.log('error ' + err),
//     () => console.log('done')
//   );

//#endregion

//#region Delay the Emission of Values from an RxJS Observable

// let foo = interval(100).pipe(
    //   take(5)
    // )
    
    // /*
    // --0--1--2--3--4|
    //  delayWhen(x => -----0|)
    // --------0--1--2--3--4|
    // */
    
    // // delay(1000)
    
    // //uncomment below to see delay operator output
    // // let result = foo.pipe(delay(2000))
    
    // let result = foo.pipe(delayWhen( x =>
    //   interval(x * x * 100).pipe(take(1))
    // ));
    
    // result.subscribe(
    //   (x) => console.log('next ' + x),
    //   (err) => console.log('error ' + err),
    //   () => console.log('done')
    // );
//#endregion

//#region Drop and Delay Observable Emissions with RxJS debounce

// let foo = interval(100).pipe(
//     take(5)
//   );
  
//   /*
//   --0--1--2--3--4|
//     debounceTime(1000) // delay
//     debounce           // delayWhen
//   ----0--1--2--3--4|
//   */
  
//   // uncomment the 3 lines below to see debounce code
//   // let result = foo.pipe(debounce(() =>
//   //   interval(1000)
//   // ));
  
//   let result = foo.pipe(debounceTime(5000));
  
//   result.subscribe(
//     (x) => console.log('next ' + x),
//     (err) => console.log('error ' + err),
//     () => console.log('done')
//   );
//#endregion

//#region Limit the Rate of Emissions from Observables with throttle in RxJS
// setting the interval to 1000, makes the output the same as the instructors. 
// let foo = interval(1000).pipe(
//     take(5)
//   )
  
//   /*
//   --0--1--2--3--4|
//     debounceTime(1000) // waits for silence, then emits
//     throttleTime(1000) // first emits, then causes silence
//   --0-----2-----4|
//   */
  
//   let result = foo.pipe(throttleTime(1000));
  
//   result.subscribe(
//     (x) => console.log('next ' + x),
//     (err) => console.log('error ' + err),
//     () => console.log('done')
//   );

//#endregion

//#region Filter Redundant Observable Emissions with RxJS distinct

// let foo = zip(interval(500), of('a', 'b', 'a', 'a', 'b')).pipe(
//   map(([x,y])=> y),
//   take(5)
// )

// /*
// --a--b--a--a--b|
//    distinctUntilChanged
// --a--b--a-----b|
// */

// let result = foo.pipe(distinctUntilChanged());

// result.subscribe(
//   (x) => console.log('next ' + x),
//   (err) => console.log('error ' + err),
//   () => console.log('done')
// );

//#endregion


//#region Handle Errors with RxJS catch

// let foo = interval(500).pipe(
//     map(() => Math.random()) 
//   )
  
//   let bar = foo.pipe(
//     map( x => {
//       if (x < 0.5) {
//         return x
//       } else {
//         throw new Error('Too large number')
//       }
//     })
//   )
  
//   /*
//   --a--b--c--d--2|     (foo)
//   map(toUpperCase)
//   --A--B--C--D--#      (bar)
//   catch(# => -Z|)
//   --A--B--C--D--Z|
//   */
  
//   let result = bar.pipe(
//     catchError((e, outputObs) => outputObs)
//   );
  
//   result.subscribe(
//     (x) => console.log('next ' + x),
//     (err) => console.log('error ' + err),
//     () => console.log('done')
//   );

//#endregion


//#region Resubscribe to an Observable on Error with RxJS retry

// // uncomment below to see retry operator
// // import { retry } from 'rxjs/operators';

// let foo = zip(interval(500), of('a', 'b', 'c', 'd', 2)).pipe(
//     map(([x,y])=> y)
//   )
  
//   let bar = foo.pipe(map(x => x.toUpperCase()));
  
//   /*
//   --a--b--c--d--2|     (foo)
//   map(toUpperCase)
//   --A--B--C--D--#      (bar)
//    retryWhen
//   --A--B--C--D-----------A--B--C--D-------------A--B--C--D---
//   */
  
//   // uncomment below to see retry operator
//   // let result = bar.pipe(retry(2));
  
//   let result = bar.pipe(retryWhen(errorObs => errorObs.pipe(delay(3000))));
  
//   result.subscribe(
//     (x) => console.log('next ' + x),
//     (err) => console.log('error ' + err),
//     () => console.log('done')
//   );

//#endregion


//#region Repeat the Execution of an Observable with RxJS repeat


// // of is an example of a Creation Operator
// let foo = of("a", "b", "c", "d");

// // Example of first Operator, Pipeable Operator
// let firstLetter = foo.pipe(first());

// firstLetter.subscribe((x) => console.log("First Operator Example " + x));

// // Example of map and repeat Operators, Pipeable Operators
// let mapExample = foo.pipe(map((x) => x.toUpperCase()));

// let result = mapExample.pipe(repeat(1));

// result.subscribe((x) => console.log("next " + x));

//#endregion
