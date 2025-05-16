import {
  ClusterProvider,
  ReactQueryProvider,
  SolanaProvider,
} from '@/provider';
import '@/style/global.css';
import { Toaster } from 'react-hot-toast';

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
            <SolanaProvider>
              {children}
              <Toaster position="bottom-right" />
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
