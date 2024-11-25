import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar/NavBar";

export default function register() {
  const slogansToLoop = ["This is phrase one", "this is phrase two"];

  const slogans = slogansToLoop.map((slogan) => <p key={slogan}>{slogan}</p>);

  return (
    <div>
      <NavBar />
      <div>register page</div>
      <div>{slogans}</div>
    </div>
  );
}
