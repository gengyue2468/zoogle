import type { Route } from "./+types/home";
import Header from "~/components/header";
import Footer from "~/components/footer";
import Main from "~/components/main";
import SwitchToZoogleToast from "~/components/main/switch-to-zoogle-toast";
import { getHomeMeta } from "~/seo";

export function meta({}: Route.MetaArgs) {
  return getHomeMeta();
}

export default function Zoogle() {
  return (
    <SwitchToZoogleToast>
      <div className="h-dvh flex flex-col">
        <Header />
        <Main />
        <Footer />
      </div>
    </SwitchToZoogleToast>
  );
}
