import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import ModeToggle from "./modetoggle";

const Menu = () => {

    return (  
        <div className="md:hidden">
<Sheet>
  <SheetTrigger>...</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>menu</SheetTitle>
      <div><ModeToggle/></div>
      <div>sds</div>
      <div>sds</div>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>


    );
}
 
export default Menu;