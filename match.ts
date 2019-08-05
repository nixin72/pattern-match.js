type pat<T, R> = [T|RegExp|[any], () => R];

export default function match<T, R> (input: T, conds: Array<pat<T,R>>, catchAll: () => R): R {
  if (catchAll === undefined || catchAll === null) {
    throw new Error("Must provide a default case to function match.");
  }

  for (let q = 0 ; q < conds.length ; q++) {
    let cond = conds[q][0];

    if (typeof input === typeof cond) {
      try {
        return sameType(input, conds[q][0], conds[q][1]);
      } catch { }
    }
    else if (typeof input === 'string' && cond instanceof RegExp) {
      try {
        return regex(input, toRegex(cond), conds[q][1]);
      } catch { }
    }
    else if (cond instanceof Array) {
      try {
        return inArray(input, cond, conds[q][1]);
      } catch { }
    }
    else if (input instanceof Array) {
      try {
        return inArray(cond, input, conds[q][1]);
      } catch { }
    }
  }

  return catchAll();
}

function sameType<T,R>(input: T, guard: T, func: () => R): R {
  if (input === guard) {
    return func();
  }

  throw new Error();
}

function regex<R>(input: string, guard: RegExp, func: () => R): R {
  if (guard.test(input)) {
    return func();
  }

  throw new Error();
}

function inArray<T, R>(input: T, array: Array<T|any>, func: () => R): R {
  if (array.some(el => el === input)) {
    return func()
  }

  throw new Error();
}

function toRegex(input: any): RegExp {
  return new RegExp(input);
}
