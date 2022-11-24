import { Base } from "./base.entity";

describe("Base class", () => {
  it("should make a base with no fields", () => {
    const base = new Base();
    expect(base).toBeTruthy();
    expect(base.createdAt).toBe("");
    expect(base.updatedAt).toBe("");
  });
});
