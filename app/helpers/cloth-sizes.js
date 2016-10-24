export const clothSizes = [
  { label: 'SW', value: 'SW'},
  { label: 'MW', value: 'MW'},
  { label: 'S', value: 'S'},
  { label: 'M', value: 'M'},
  { label: 'L', value: 'L'},
  { label: 'XL', value: 'XL'},
  { label: 'XXL', value: 'XXL'},
  { label: 'XXXL', value: 'XXXL'},
  { label: 'XXXXL', value: 'XXXXL'},
];

const _blankSizeList = {};
clothSizes.forEach(s => { _blankSizeList[s.value] = 0; })

export const blankSizeList = Object.assign({}, _blankSizeList);
