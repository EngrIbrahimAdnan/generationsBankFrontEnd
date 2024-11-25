import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar/NavBar";

export default function about() {
  const returnToHomePage = "../";
  return (
    <div>
      <NavBar />
      <div>about page</div>
    </div>
  );
}
