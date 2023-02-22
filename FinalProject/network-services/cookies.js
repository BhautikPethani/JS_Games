export function createToLocal(key, value) {
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
}

export function readFromLocal(key) {
  const getJson = localStorage.getItem(key);
  const fromJson = JSON.parse(getJson);
  return fromJson;
}

export function deleteFromLocal(key) {
  localStorage.removeItem(key);
}