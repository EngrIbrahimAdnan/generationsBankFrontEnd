import React from "react";
import Link from "next/link";
import routes from "../../constants/routes";

function NavBar() {
  return (
    <div>
      <Link href={routes.home}>
        <div>Home</div>
      </Link>

      <Link href={routes.login}>
        <div>Login</div>
      </Link>

      <Link href={routes.register}>
        <div>Register</div>
      </Link>

      <Link href={routes.about}>
        <div>About</div>
      </Link>
    </div>
  );
}

export default NavBar;
