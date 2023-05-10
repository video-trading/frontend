import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-20 mx-20">{children}</div>;
}
