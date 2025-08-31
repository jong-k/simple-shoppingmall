import ReactQueryProvider from "./ReactQueryProvider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
