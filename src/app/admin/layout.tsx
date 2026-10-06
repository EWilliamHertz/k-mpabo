import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="antialiased bg-stone-100 text-stone-900 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
