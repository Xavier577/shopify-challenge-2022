export default async function PromiseWrapper<T>(
  promise: Promise<T>,
): Promise<[T | undefined, any | undefined]> {
  try {
    let result = await promise;
    return [result, undefined];
  } catch (err) {
    return [undefined, err];
  }
}
