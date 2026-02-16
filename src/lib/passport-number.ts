export function generatePassportNumber(
  userId: string,
  issueYear: number
): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0;
  }
  const numeric = Math.abs(hash) % 100000;
  return `VP-${issueYear}-${numeric.toString().padStart(5, "0")}`;
}
