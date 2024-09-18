import Sidebar from '@/components/Sidebar';
import './globals.css';
import Providers from '@/redux/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers><div className="flex">
          <Sidebar />
          {children}
        </div></Providers>
      </body>
    </html>
  )
};
