import { SignIn, SignedIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center my-32">
      <SignIn />
    </div>
  );
};

export default SignInPage;
