type PseudoEquals<A1, A2> = (
  <A>() => A extends A2 ? true : false
) extends (
  <A>() => A extends A1 ? true : false
) ? true : false;

type IsNotNeverAsIntegerViewOfBoolean<T> = ([T] extends [never] ? [] : [T])['length'];

type IsTheirNeverityStatusEqual<A, B> = PseudoEquals<
  IsNotNeverAsIntegerViewOfBoolean<A>,
  IsNotNeverAsIntegerViewOfBoolean<B>
>;

type IsNotNeverGood1<
  ValueToTestForNeverity,
  UselessFlag = false,
> = 0 extends infer StandardExpectedNonNeverValue
  ? (UselessFlag extends false
      ? IsTheirNeverityStatusEqual<
        ValueToTestForNeverity,
        StandardExpectedNonNeverValue
      > // branch that's always being hit
      : 'branch that actually is never reached'
    )
  : never;

type IsNotNeverGood2<
  ValueToTestForNeverity,
  UselessFlag = false,
> = 0 extends infer StandardExpectedNonNeverValue
  ? (UselessFlag extends true
      ? 'branch that actually is never reached'
      : IsTheirNeverityStatusEqual<
        ValueToTestForNeverity,
        StandardExpectedNonNeverValue
      > // branch that's always being hit
    )
  : never;

type IsNotNeverBroken<
  ValueToTestForNeverity,
> = 0 extends infer StandardExpectedNonNeverValue
  ? IsTheirNeverityStatusEqual<
    ValueToTestForNeverity,
    StandardExpectedNonNeverValue
  >
  : never;

type test1 = IsNotNeverGood1<2>;
//     ^?
// It's true as expected
type test2 = IsNotNeverGood2<2>;
//     ^?
// It's true as expected

type test3 = IsNotNeverBroken<2>;
//     ^?
// for some fucking reason it's false
