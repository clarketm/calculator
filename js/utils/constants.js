export const ReducerKey = {
  GLOBAL: "global"
};

export const PrimitiveType = {
  BOOLEAN: "boolean",
  FUNCTION: "function",
  NUMBER: "number",
  OBJECT: "object",
  STRING: "string",
  SYMBOL: "symbol",
  UNDEFINED: "undefined"
};

export const InstanceType = {
  OBJECT: Object,
  ARRAY: Array,
  REGEXP: RegExp,
  DATE: Date
};

export const KeyType = {
  OPERATOR: "operator",
  OPERAND: "operand",
  CLEAR: "clear",
  EQUALS: "equals",
  PERCENT: "percent",
  NEGATE: "negate",
  DECIMAL: "decimal"
};

export const Keys = [
  [
    {
      text: "AC",
      textDirty: "C",
      style: { flex: 1 },
      type: KeyType.CLEAR,
      color: "#A5A5A5"
    },
    { text: "+/-", style: { flex: 1 }, type: KeyType.NEGATE, color: "#A5A5A5" },
    { text: "%", style: { flex: 1 }, type: KeyType.PERCENT, color: "#A5A5A5" },
    { text: "÷", style: { flex: 1 }, type: KeyType.OPERATOR, color: "#EE9A35" }
  ],
  [
    { text: "7", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "8", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "9", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "×", style: { flex: 1 }, type: KeyType.OPERATOR, color: "#EE9A35" }
  ],
  [
    { text: "4", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "5", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "6", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "-", style: { flex: 1 }, type: KeyType.OPERATOR, color: "#EE9A35" }
  ],
  [
    { text: "1", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "2", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "3", style: { flex: 1 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: "+", style: { flex: 1 }, type: KeyType.OPERATOR, color: "#EE9A35" }
  ],
  [
    { text: "0", style: { flex: 2 }, type: KeyType.OPERAND, color: "#2E2E2E" },
    { text: ".", style: { flex: 1 }, type: KeyType.DECIMAL, color: "#2E2E2E" },
    { text: "=", style: { flex: 1 }, type: KeyType.EQUALS, color: "#EE9A35" }
  ]
];
