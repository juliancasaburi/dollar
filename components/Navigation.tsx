import Link from "next/link";
import { ModeToggle } from "./ui/ModeToggle";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Navigation() {
  return (
    <nav className="mb-2 py-2 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="flex w-full justify-start items-center px-4 sm:px-6 lg:px-8">
        <ModeToggle />
        <Link
          passHref
          prefetch={false}
          aria-label="Código fuente en GitHub"
          href={"https://github.com/juliancasaburi/dollar"}
          className="shrink-0 ml-4"
        >
          <Button variant={"default"} className="h-9">
            <GitHubLogoIcon className="h-4 w-4 mr-3" />
            <span>Código fuente en GitHub</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
