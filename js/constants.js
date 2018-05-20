export const KeyType = {
  OPERATOR: 'operator',
  OPERAND: 'operand',
  CLEAR: 'clear',
  EQUALS: 'equals',
  PERCENT: 'percent',
  NEGATE: 'negate',
  DECIMAL: 'decimal',
};

export const Keys = [
  [
    {text: 'ac', type: KeyType.CLEAR, color: '#A5A5A5'},
    {text: '+/-', type: KeyType.NEGATE, color: '#A5A5A5'},
    {text: '%', type: KeyType.PERCENT, color: '#A5A5A5'},
    {text: '÷', type: KeyType.OPERATOR, color: '#EE9A35'}],
  [
    {text: '7', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '8', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '9', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '×', type: KeyType.OPERATOR, color: '#EE9A35'}],
  [
    {text: '4', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '5', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '6', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '-', type: KeyType.OPERATOR, color: '#EE9A35'}
  ],
  [
    {text: '1', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '2', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '3', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '+', type: KeyType.OPERATOR, color: '#EE9A35'}
  ],
  [
    {text: '0', type: KeyType.OPERAND, color: '#2E2E2E'},
    {text: '.', type: KeyType.DECIMAL, color: '#2E2E2E'},
    {text: '=', type: KeyType.EQUALS, color: '#EE9A35'}
  ],
];