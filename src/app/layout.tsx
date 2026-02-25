// Root layout — locale-specific layout lives in [locale]/layout.tsx
// This minimal wrapper is required by Next.js App Router
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
