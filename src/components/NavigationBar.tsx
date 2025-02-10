import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavigationBar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();



  return (
    <header className="flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 bord ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6 bord">
            {isUserAuthenticated && (
              <p className="text-black font-medium">{user.email}</p>
            )}
            <SheetClose asChild>
              <Link
                href="/"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/about"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                About
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/services"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Services
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/contact"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Contact
              </Link>
            </SheetClose>
            <SheetClose asChild>
              {isUserAuthenticated && (
                <Link
                  href="/dashboard"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Dashboard
                </Link>
              )}
            </SheetClose>

            <SheetClose asChild>
              <div>
                {/* if user is NOT authenticated, show´s login and register button*/}
                {!isUserAuthenticated && (
                  <>
                    <ul className="flex flex-row gap-2">
                      <li>
                        <Button variant="outline">
                          <LoginLink>Sign in</LoginLink>
                        </Button>
                      </li>
                      <li>
                        <Button variant="outline">
                          <RegisterLink>Register</RegisterLink>
                        </Button>
                      </li>
                    </ul>
                  </>
                )}

                {/* If user IS authenticated, shows logout button */}
                {isUserAuthenticated && (
                  <div>
                    <ul className="flex flex-col gap-2">
                   
                      <li>
                        <Button variant="destructive">
                          <LogoutLink className="">Log out</LogoutLink>
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden md:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6 " />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className=" hidden md:flex  justify-center mx-auto gap-6 bord">
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="/services"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Services
        </Link>
        <Link
          href="/contact"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Contact
        </Link>
        {isUserAuthenticated && (
          <Link
            href="/dashboard"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            Dashboard
          </Link>
        )}
      </nav>
      <div className=" ">
        {/*  if user is NOT authenticated, show´s login and register button*/}
        {!isUserAuthenticated && (
          <>
            <ul className="flex flex-row gap-2">
              <li>
                <Button variant="outline">
                  <LoginLink>Sign in</LoginLink>
                </Button>
              </li>
              <li>
                <Button variant="outline">
                  <RegisterLink>Register</RegisterLink>
                </Button>
              </li>
            </ul>
          </>
        )}

        {/* If user IS authenticated, shows logout button */}
        {isUserAuthenticated && (
          <div className="bord ">
            <ul className="flex flex-col items-center gap-2">
              <li>
                <p className="text-black font-medium">{user.email}</p>
              </li>
              <li>
                <Button variant="destructive">
                  <LogoutLink className="">Log out</LogoutLink>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="!w-10 !h-10"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
