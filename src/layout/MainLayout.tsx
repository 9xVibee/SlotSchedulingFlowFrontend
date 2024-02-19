import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/utils/store";
import { LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MainLayout = () => {
  const { logoutUser, user } = useUserDetails();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    toast("Logout Successfull");
  };

  return (
    <div className="w-full h-[100vh] sm:px-10 relative md:px-10 lg:px-20">
      <div className="absolute top-3 right-2 sm:right-4 md:right-8 flex gap-2 items-center">
        <ModeToggle />
        {user.email && (
          <Button
            onClick={handleLogout}
            variant="default"
            className="outline-none"
            size="icon"
          >
            <LogOut />
          </Button>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
