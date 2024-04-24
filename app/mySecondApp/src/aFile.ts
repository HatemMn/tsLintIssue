export function getOtherBytes() {
  const rndArray = new Uint8Array(64);
  window.crypto.getRandomValues(rndArray);
  return rndArray;
}
