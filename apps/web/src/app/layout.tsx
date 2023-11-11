import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";

export const metadata = {
  title: "Things",
  description: "By Gerst Yanis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scrollbar">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
