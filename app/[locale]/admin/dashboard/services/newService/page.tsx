import React from "react";
import CreateNewService from "@/components/services/createNewService"
import { createService } from "../(fetch)/createService";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";

  const categories= await getAllcategories()
async function page() {
  

  return (
   <>
   <CreateNewService  action={createService} categories={categories}/>
   </>
  );
}

export default page;
