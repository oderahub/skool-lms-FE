export default function isStateEmpty(state: any): boolean {
  if (state === null || state === "") {
    return true;
  }
  if (typeof state === "object") {
    return Object.values(state).every((value) => value === "");
  }
  return false;
}
