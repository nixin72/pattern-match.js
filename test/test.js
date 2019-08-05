const match = require("../match").default;

(function runTests() {
  runTest(
    test_forces_catchAll,
    test_equality,
    test_regex,
    test_membership
  )
})();


function test_forces_catchAll() {
  try {
    let x = match("hello", []);
  }
  catch (err) {
    return true;
  }
}

function test_equality() {
  let x = match("test", [
    ["test", () => "pass"]
  ], () => "fail");

  return x === "pass";
}

function test_regex() {
  let x = match("test", [
    [/^te/, () => "pass"]
  ], () => "fail");

  return x === "pass";
}

function test_membership() {
  let x = match("test", [
    [["test"], () => "pass"]
  ], () => "fail");

  return x === "pass";
}

function runTest(...tests) {
  for (let test of tests) {
    const pass = test()
    if (!pass) {
      throw new Error(`Test ${test.toString()} failed`);
    }
  }
}
