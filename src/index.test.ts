import { sum, shoppingList, ThrowError, fetchData, fetchDataLazy } from ".";

// Matcher を使用する
test("toBe", () => {
  expect(sum(2, 2)).toBe(4);
});

test("not toBe", () => {
  expect(sum(2, 2)).not.toBe(5);
});

test("toEqual", () => {
  const data = { a: 1, b: 2 };
  expect(data).toEqual({ a: 1, b: 2 });
});

test("not toEqual", () => {
  const data = { a: 1, b: 2 };
  expect(data).not.toEqual({ a: 1, b: 1 });
});

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});

test("to throw", () => {
  expect(() => ThrowError()).toThrow("この関数はエラーをthrowします");
  expect(() => ThrowError()).toThrow(/関数/);
});

/******************非同期コードのテスト************************/

// doneを使用した場合
test("the data is peanut butter", (done) => {
  function callback(data: string) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

// Promisesを使用した場合

test("the data is peanut butter at Promises resolve", () => {
  return fetchDataLazy("resolve").then((data) => {
    expect(data).toBe("peanut butter");
  });
});

test("the data is peanut butter at Promises reject", () => {
  return fetchDataLazy("reject").catch((data) => {
    expect.assertions(1);
    expect(data).toMatch("error");
  });
});

// resolves & rejects Matcherバージョン
test("the data is peanut butter at Promises resolves Matcher", () => {
  return expect(fetchDataLazy("resolve")).resolves.toBe("peanut butter");
});

test("the data is peanut butter at Promises rejects Matcher", () => {
  return expect(fetchDataLazy("reject")).rejects.toMatch("error");
});

// async awaitも使用可能
test("the data is peanut butter at Promises resolves Matcher async await", async () => {
  return await expect(fetchDataLazy("resolve")).resolves.toBe("peanut butter");
});

test("the data is peanut butter at Promises rejects Matcher async await", async () => {
  return await expect(fetchDataLazy("reject")).rejects.toMatch("error");
});

/*********************セットアップと排気*****************************/

// テスト毎にセットアップを行う

// テスト前に実行される
beforeEach(() => {
  console.log("beforeEach");
});

// テスト後に実行される
afterEach(() => {
  console.log("afterEach");
});
