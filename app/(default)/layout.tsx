import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*@ts-expect-error */}
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
