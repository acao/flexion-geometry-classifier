var nixt = require("nixt");

const COMMAND = "node dist/cli";

const command = args => `${COMMAND} ${args}`;

describe("cli validates", () => {
  test("for number of sides", done => {
    nixt()
      .run(command("1 2"))
      .stdout(/not enough sides for a valid geometry!/)
      .end(done);
  });
  test("for proper values", done => {
    nixt()
      .run(command("1 2 cat"))
      .stdout(/invalid integer\/float provided/)
      .end(done);
  });
  test("for a matching classifier", done => {
    nixt()
      .run(command("1 2 2 2"))
      .stdout(/classifier does not exist for a geometry with 4 sides/)
      .end(done);
  });
});

describe("cli classifies", () => {
  test("detects an invalid triangle", done => {
    nixt()
      .run(command("4 6 11"))
      .stdout(/not a valid triangle/)
      .end(done);
  });
  test("detects an equilateral triangle", done => {
    nixt()
      .run(command("1.5 1.5 1.5"))
      .stdout(/equilateral/)
      .end(done);
  });
  test("detects an isosceles triangle", done => {
    nixt()
      .run(command("3 4 4"))
      .stdout(/isosceles/)
      .end(done);
  });
  test("detects a scalene triangle", done => {
    nixt()
      .run(command("4.4 7.3 9.1"))
      .stdout(/scalene/)
      .end(done);
  });
});
