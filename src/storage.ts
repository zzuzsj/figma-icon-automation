// get github settings
export function getLocalData(key) {
  return figma.clientStorage.getAsync(key);
}

// set github settings
export function setLocalData(key, data) {
  figma.clientStorage.setAsync(key, data);
}
