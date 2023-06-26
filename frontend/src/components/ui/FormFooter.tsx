import React from "react";
import UnderlineLink from "../UnderlineLink/UnderlineLink";
import Divider from "../Divider";

const FormFooter = () => {
  return (
    <div className="text-sm text-tertiaryContent flex flex-col gap-4">
      <UnderlineLink href="">Forgot Your Password ?</UnderlineLink>
      <Divider />
      <p className=" text-center">
        Don&apos;t have an account ?{" "}
        <UnderlineLink href="">Sign Up</UnderlineLink>
      </p>
    </div>
  );
};

export default FormFooter;
