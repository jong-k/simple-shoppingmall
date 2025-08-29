export function Container({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto px-4 md:px-10 lg:px-16">{children}</div>;
}
