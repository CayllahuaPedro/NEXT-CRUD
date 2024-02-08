import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar({ params }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="bg-slate-900">
      <div
        className="container mx-auto flex justify-between items-center
      py-3"
      >
        <h3 className="font-bold text-3xl">
          <Link href="/">NEXTCRUD</Link>
        </h3>
        <ul className="flex gap-x-2 text-lg font-bold">
          {!session?.user ? (
            <>
              <li>
                <Link className="text-slate-300 hover:text-slate-200" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-slate-300 hover:text-slate-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-300 hover:text-slate-200"
                  href="/auth/register"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="text-slate-300 hover:text-slate-200"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-300 hover:text-slate-200"
                  href="/api/auth/signout"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/about" className="text-slate-300 hover:text-slate-200">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
