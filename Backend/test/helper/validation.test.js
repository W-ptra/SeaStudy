const { validateNumber } = require("../../helper/validation");

test("test validate number",async ()=>{
    const test1 = "abcde";
    const result1 = validateNumber(test1);
    expect(result1.operation).toBe(false);
    expect(result1.message).toContain("not Integer");

    const test2 = "-1";
    const result2 = validateNumber(test2);
    expect(result2.operation).toBe(false);
    expect(result2.message).toContain("can't 0 or negative");

    const test3 = "0";
    const result3 = validateNumber(test3);
    expect(result3.operation).toBe(false);
    expect(result3.message).toContain("can't 0 or negative");

    const test4 = "9999999999999999999999999999999999999999";
    const result4 = validateNumber(test4);
    expect(result4.operation).toBe(false);
    expect(result4.message).toContain("can't exceed 99999");

    const test5 = "20";
    const result5 = validateNumber(test5);
    expect(result5.operation).toBe(true);
})