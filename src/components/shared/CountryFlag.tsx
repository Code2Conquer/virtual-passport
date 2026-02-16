import Image from "next/image";

interface CountryFlagProps {
  countryCode: string;
  size?: number;
}

export default function CountryFlag({
  countryCode,
  size = 20,
}: CountryFlagProps) {
  return (
    <Image
      src={`/images/flags/${countryCode}.svg`}
      alt={countryCode}
      width={size}
      height={Math.round(size * 0.75)}
      className="inline-block rounded-[2px] border border-black/10"
    />
  );
}
