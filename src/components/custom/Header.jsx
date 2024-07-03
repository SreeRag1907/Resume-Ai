import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <>
      <div className="flex justify-between items-center p-2 px-5 shadow-md shadow-pink-500/30  z-0">
        <Link to={"/"}>
          <img src="/logo.png" className="p-3 w-[230px] h[230px]"></img>
        </Link>

        {isSignedIn ? (
          <Link to={"/dashboard"}>
            <div className="flex items-center gap-4">
              <Button variant="outline">Dashboard</Button>
              <UserButton />
            </div>
          </Link>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
