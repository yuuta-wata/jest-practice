export const sum = (a: number, b: number) => {
  return a + b;
};

export const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

export const ThrowError = () => {
  throw new Error("この関数はエラーをthrowします");
};

export const fetchData = (callback: (data: string) => void) => {
  const str = "peanut butter";
  callback(str);
};

export const fetchDataLazy = (mode: "resolve" | "reject") =>
  new Promise((resolve, reject) => {
    if (mode === "resolve") {
      resolve("peanut butter");
    } else {
      reject("error");
    }
  });
