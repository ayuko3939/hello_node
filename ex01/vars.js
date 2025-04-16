const str = "42";
const num = 42;
const obj = {42 : 42}; // {key : val}
const bln = true;
let undef;

console.log(str + " is a " + typeof(str) + ".");
console.log(num + " is a " + typeof(num) +".");
console.log(obj[42] + " is an " + typeof(obj) +".");
console.log(obj + " is an " + typeof(obj) +".");
console.log(bln + " is a " + typeof(bln) +".");
console.log(undef + " is an " + typeof(undef) +".");


/*
const と let と var の違い

<const>
 - 再代入できない変数を定義するために使用される
 - ブロックスコープを持つ
 - 値を変更しようとするとエラーが発生する

<let>
 - 再代入可能な変数を定義するために使用される
 - ブロックスコープを持つ

<var>
 - 再代入可能な変数を定義するために使用される
 - ブロックスコープを持たない


*スコープ
 - 変数や関数が有効な範囲のこと

    *ブロックスコープ
     - {}で囲まれた範囲内でのみ有効なスコープのこと

    *関数スコープ
     - 関数内でのみ有効なスコープのこと

    *グローバルスコープ
     - プログラム全体で有効なスコープのこと
*/