import AppLoader from "@/components/AppLoader";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          <AppLoader>
            {children}
          </AppLoader>
      </body>
    </html>
  );
}
