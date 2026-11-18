// 回归：适配器单元（adapter 模式）没有 sources，isCurrent 不能因此抛
// "Cannot read properties of undefined (reading 'every')"。
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "src", "dom.js"), "utf8");
const context = vm.createContext({ getComputedStyle: () => ({}) });
vm.runInContext(source, context, { filename: "dom.js" });

const { isCurrent } = context.LT_DOM;
assert.ok(typeof isCurrent === "function", "dom.js should expose isCurrent");

// 1) 适配器单元：只有 el，没有 sources
assert.equal(
  isCurrent({ mode: "adapter", el: { isConnected: true, closest: () => null } }),
  true,
  "adapter units have no sources: a connected element is enough",
);

// 2) 适配器单元落在禁区里（code/pre/translate=no 等）
assert.equal(
  isCurrent({ mode: "adapter", el: { isConnected: true, closest: () => ({ tagName: "CODE" }) } }),
  false,
  "adapter units inside a forbidden container are not current",
);

// 3) 元素已断开
assert.equal(isCurrent({ mode: "adapter", el: { isConnected: false } }), false);

// 4) 普通单元：sources 都还在原位
const node = { isConnected: true, parentElement: null, nodeValue: "hello" };
const parent = { closest: () => null };
node.parentElement = parent;
const el = { isConnected: true, contains: () => true };
assert.equal(
  isCurrent({ el, sources: [{ node, value: "hello", parent }] }),
  true,
  "regular units stay current while their text nodes are untouched",
);

// 5) 普通单元：页面改过文字
assert.equal(
  isCurrent({ el, sources: [{ node, value: "changed", parent }] }),
  false,
  "a rewritten text node invalidates the unit",
);

// 6) 空/异常入参也不该抛
assert.equal(isCurrent(undefined), false);
assert.equal(isCurrent({}), false);
