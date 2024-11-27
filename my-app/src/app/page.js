import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/Home/HomePage";
import Feature from "./components/feature/page";
export default function Home() {
  // const greetingMessage = <h1>Welcome to Generations Bank</h1>; //initialize a variable

  return (
    <div>
      <NavBar />
      <HomePage /> {/* Use the renamed component */}
      <Feature />
    </div>
  );
}
