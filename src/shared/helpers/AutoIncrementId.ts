// this function is to mimick the auto increment in the database
// it is only to be used this in mocks

export default function AutoIncrementId(arr: any[]) {
  return arr.length + 1;
}
