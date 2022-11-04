export async function delay({ millis }: { millis: number }) {
  return new Promise(resolve => setTimeout(resolve, millis))
}
