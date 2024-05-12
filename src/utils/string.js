export function combineStrings(array) {
  let text;
  
  if (array.length === 0) {
    text = null;
  } else if (array.length === 1) {
    text = array[0];
  } else if (array.length === 2) {
    text = array.join(' and ');
  } else if (array.length >= 3) {
    const lastElement = array.pop();
    text = array.join(', ') + (' and ') + lastElement;
  }

  return text;
}