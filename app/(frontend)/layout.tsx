import FrontNav from "@/components/front-navbar/FrontNav";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout--font">
      <FrontNav />
      <div className="layout--container mt-9">{children}</div>
    </div>
  );
}
