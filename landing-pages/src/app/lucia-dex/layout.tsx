import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lucia DEX",
  description:
    "Lucia Protocol is a non-custodial lending and borrowing protocol, with the primary goal of providing both individuals and startups with seamless access to credit within a framework built on trust. At its core, Lucia revolutionizes the lending landscape by offering borrowers an unparalleled chance to secure credit, all backed by a meticulous credit assessment process that spans both on-chain and off-chain data sources. This credit is designed to offer essential support for managing day-to-day and operational expenses, contributing to financial stability.",
};

export default function LuciaDexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
