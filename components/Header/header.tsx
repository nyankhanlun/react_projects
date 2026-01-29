import Link from "next/link";
import classes from "./header.module.css";
import NavLink from "./NavLink";

export default function Header() {
    return <>
        <header className={classes.header}>
            <nav className={classes.nav}>
                <NavLink href="/songs" >
                    All Songs
                </NavLink>
                {/* <NavLink href="/artist" >
                    Artist
                </NavLink> */}
                <NavLink href="/songs/new" >
                    Add New Song
                </NavLink>
            </nav>
        </header>
    </>
}
