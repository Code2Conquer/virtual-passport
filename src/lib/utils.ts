export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  return `${date.getDate().toString().padStart(2, "0")} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function getStampColor(
  countryCode: string
): "red" | "blue" | "green" | "black" | "purple" {
  const european = ["FR", "GB", "DE", "IT", "ES", "NL", "CH", "AT", "BE", "PT", "SE", "NO", "DK", "FI", "IE", "GR", "CZ", "PL", "HU", "RO"];
  const asian = ["JP", "CN", "KR", "IN", "SG", "HK", "TW"];
  const middleEastern = ["AE", "SA", "QA", "OM", "BH", "KW", "JO", "LB", "IL", "TR", "EG"];
  const southeastAsian = ["TH", "ID", "MY", "VN", "PH", "KH", "MM", "LA"];

  if (european.includes(countryCode)) return "red";
  if (asian.includes(countryCode)) return "blue";
  if (middleEastern.includes(countryCode)) return "green";
  if (southeastAsian.includes(countryCode)) return "purple";
  return "black";
}

export function generateMRZ(name: string, passportNumber: string): string {
  const parts = name.toUpperCase().split(" ");
  const surname = parts[parts.length - 1];
  const givenNames = parts.slice(0, -1).join("<");
  const mrz = `P<IND${surname}<<${givenNames}`;
  return mrz.padEnd(44, "<");
}
