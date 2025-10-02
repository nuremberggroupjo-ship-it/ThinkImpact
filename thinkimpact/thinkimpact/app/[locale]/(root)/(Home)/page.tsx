import { Banner } from "@/components/banner/banner";
import { getTranslations } from "next-intl/server";



export default async function Home() {

  return (
    <div className="flex justify-center pl-1 pr-1 pt-1">
     <Banner />
    </div>
  );
}
