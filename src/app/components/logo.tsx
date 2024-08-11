import Link from "next/link";
import Image from "next/image";
import azizLogo from "@/images/officalAzizHelprt1.png";

export function Logo({
  height = 64,
  width = 64,
}: {
  height?: number;
  width?: number;
}) {
  return <Image src={azizLogo} alt="Aziz Logo" height={height} width={width} />;
}

export function NamedLogoWithLink() {
  return (
    <Link href="/" className="flex flex-row items-center gap-3">
      <Logo />
      <h3 className="font-semibold text-lg">Aziz</h3>
    </Link>
  );
}
