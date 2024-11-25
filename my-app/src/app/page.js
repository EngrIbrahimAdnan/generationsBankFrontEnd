import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  const greetingMessage = <h1>Welcome to Generations Bank</h1>; //initialize a variable

  return (
    <div>
      <NavBar />
      <div>{greetingMessage}</div>
    </div>
  );
}
