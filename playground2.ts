// example 1

type IsNeverAsIntegerViewOfBoolean<T> = ([T] extends [never] ? [T] : [])['length'];

type IsNever<ValueToTestForNeverity> = (
  <A>() => A extends IsNeverAsIntegerViewOfBoolean<ValueToTestForNeverity> ? true : false
) extends (
  <A>() => A extends IsNeverAsIntegerViewOfBoolean<never> ? true : false
) ? true : false


type test1 = IsNever<0>;
//     ^?
// False as expected

type test2 = IsNever<never>;
//     ^?
// true as expected

//////////////////////////////////////////////////////////////////////////////////////

// example 2

//                                          swapped `? [] : [T]` here
type IsNotNeverAsIntegerViewOfBoolean<T> = ([T] extends [never] ? [] : [T])['length'];

type IsNotNeverBroken<ValueToTestForNeverity> = (
  <A>() => A extends IsNeverAsIntegerViewOfBoolean<ValueToTestForNeverity> ? true : false
) extends (
  // changed `never` to `0` here
  <A>() => A extends IsNeverAsIntegerViewOfBoolean<0> ? true : false
) ? true : false


type test3 = IsNotNeverBroken<never>;
//     ^?
// false as expected

type test4 = IsNotNeverBroken<0>;
//     ^?
// for some fucking reason it's false
