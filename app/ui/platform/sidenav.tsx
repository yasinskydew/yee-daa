import { ThemeToggle } from "../theme-toggle";
import NavLinks from "./nav-links";

export default function SideNav() {
    return (
        <nav className="flex flex-col">
            <NavLinks />
            <ThemeToggle />
        </nav>
    )
}