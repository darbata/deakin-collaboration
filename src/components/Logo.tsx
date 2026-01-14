import {Link} from "react-router";

export default function Logo() {
    return (
        <Link to={"/"}>
            <h1 className="font-space text-3xl font-medium">
                DSEC
            </h1>
        </Link>
    )
}