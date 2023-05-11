export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-40 mx-auto w-96 sm:w-full md:w-4xl sm:px-10 lg:max-w-7xl">{children}</div>;
}
