// example 1

type IsNine<T> = (
  <U>() => U extends ([T] extends [9] ? [T] : [])['length'] ? true : false
) extends (
  <U>() => U extends 1 ? true : false
) ? true : false


type test1 = IsNine<0>;
//     ^?
// False as expected

type test2 = IsNine<9>;
//     ^?
// true as expected

//////////////////////////////////////////////////////////////////////////////////////

// example 2

type IsNotNineBroken1<T> = (
  //                           swapped `[T]` with `[]`
  <U>() => U extends ([T] extends [9] ? [] : [T])['length'] ? true : false
) extends (
  <U>() => U extends 1 ? true : false
) ? true : false


type test3 = IsNotNineBroken1<9>;
//     ^?
// false as expected

type test4 = IsNotNineBroken1<0>;
//     ^?
// for some fucking reason it's false

//////////////////////////////////////////////////////////////////////////////////////

// example 3

type IsNotNineAsOneOrZero<T> = ([T] extends [9] ? [] : [T])['length'];

type AreTheirStatusesOfBeingEqualToNineTheSame<A, B> = (
  <T>() => T extends IsNotNineAsOneOrZero<A> ? true : false
) extends (
  <T>() => T extends IsNotNineAsOneOrZero<B> ? true : false
) ? true : false;

type IsNotNineGood1<
  ValueToTestForBeingEqualToNine,
  UselessFlag = false,
> = 0 extends infer StandardExpectedNonNeverValue
  ? (UselessFlag extends false
      ? AreTheirStatusesOfBeingEqualToNineTheSame<
        ValueToTestForBeingEqualToNine,
        StandardExpectedNonNeverValue
      > // branch that's always being hit
      : 'branch that actually is never reached'
    )
  : never;

type IsNotNineGood2<
  ValueToTestForBeingEqualToNine,
  UselessFlag = false,
> = 0 extends infer StandardExpectedNonNeverValue
  ? (UselessFlag extends true
      ? 'branch that actually is never reached'
      : AreTheirStatusesOfBeingEqualToNineTheSame<
        ValueToTestForBeingEqualToNine,
        StandardExpectedNonNeverValue
      > // branch that's always being hit
    )
  : never;

type IsNotNineBroken2<
  ValueToTestForBeingEqualToNine,
> = 0 extends infer StandardExpectedNonNeverValue
  ? AreTheirStatusesOfBeingEqualToNineTheSame<
    ValueToTestForBeingEqualToNine,
    StandardExpectedNonNeverValue
  >
  : never;


type _test5 = IsNotNineGood1<2>;
//     ^?
// It's true as expected

type _test6 = IsNotNineGood1<9>;
//     ^?
// It's false as expected

type _test7 = IsNotNineGood2<2>;
//     ^?
// It's true as expected

type _test8 = IsNotNineGood2<9>;
//     ^?
// It's false as expected


type _test9 = IsNotNineBroken2<2>;
//     ^?
// for some fucking reason it's false

type _test10 = IsNotNineBroken2<9>;
//     ^?
// It's false as expected
