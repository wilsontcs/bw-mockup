import { ContextProviders } from "./_components/context-providers";
import ClientLayout from "./_components/client-layout";

export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <ContextProviders>
      <ClientLayout>{props.children}</ClientLayout>
    </ContextProviders>
  );
}
