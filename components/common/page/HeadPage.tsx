import Head from "next/head";

type TheadPageProps = {
  children: React.ReactNode;
  title: string;
};
export default function HeadPage({ children, title }: TheadPageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}
