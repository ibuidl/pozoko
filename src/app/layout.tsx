import {
  ClusterProvider,
  ReactQueryProvider,
  SolanaProvider,
} from '@/provider';
import '@/style/global.css';

export const metadata = {
  title: 'Zoku',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>{children}</SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
