import { Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren } from "react";
import { Container } from "./Container";
import Logo from "./Logo";

const links = [
  { name: "Profile", href: "/me" },
  {
    name: "Top",
    href: "/me/top",
    children: [
      { name: "Tracks", href: "/me/top/tracks" },
      { name: "Artists", href: "/me/top/artists" },
    ],
  },
  { name: "Recent", href: "/me/recent/tracks" },
  {
    name: "Saved",
    href: "/me/saved",
    children: [
      { name: "Tracks", href: "/me/saved/tracks" },
      { name: "Artists", href: "/me/saved/artists" },
    ],
  },
  { name: "Playlists", href: "/me/playlists" },
];

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="border-b border-gray-200 bg-white">
        {({ open }) => (
          <>
            <Container>
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Logo
                        className="h-8 w-auto"
                        strokeClass="stroke-indigo-500"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {links.map((link, i) =>
                      link.children ? (
                        <Popover.Group
                          key={`${link.name}_${i}`}
                          className="hidden lg:flex lg:gap-x-12"
                        >
                          <Popover className="relative">
                            <Popover.Button
                              className={clsx(
                                router.pathname.startsWith(
                                  link.href || "undefined"
                                )
                                  ? "border-indigo-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "inline-flex items-center border-b-2 px-4 pt-1 text-sm font-medium h-full gap-x-2"
                              )}
                            >
                              {link.name}
                              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute top-full z-10 mt-3 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                  {link.children.map((nested, j) => (
                                    <div
                                      key={`${link.name}_${i}_${nested.name}_${j}`}
                                      className="relative flex items-center"
                                    >
                                      <Link
                                        href={nested.href || ""}
                                        className={clsx(
                                          nested.href === router.pathname
                                            ? "text-gray-900 bg-indigo-50"
                                            : "text-gray-500 hover:text-gray-900",
                                          "block font-medium rounded-lg p-4 px-8 text-sm leading-6 hover:bg-gray-50"
                                        )}
                                      >
                                        {nested.name}
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </Popover>
                        </Popover.Group>
                      ) : (
                        <Link
                          key={`${link.name}_${i}`}
                          href={link.href || ""}
                          className={clsx(
                            link.href === router.pathname
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-4 pt-1 text-sm font-medium"
                          )}
                        >
                          {link.name}
                        </Link>
                      )
                    )}
                  </div>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {/* Put user profile image and name here */}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </Container>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {links.map((link, i) =>
                  link.children ? (
                    <div
                      key={`${link.name}_${i}`}
                      className="block pr-4 text-base font-medium border-transparent text-gray-600"
                    >
                      <span className="block ml-4 py-2 text-base font-medium">
                        {link.name}
                      </span>
                      {link.children.map((nested, j) => (
                        <Disclosure.Button
                          key={`${link.name}_${i}_${nested.name}_${j}`}
                          as={Link}
                          href={nested.href || ""}
                          className={clsx(
                            nested.href === router.pathname
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                            "block border-l-4 py-2 pl-8 pr-4 text-base font-medium"
                          )}
                        >
                          {nested.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  ) : (
                    <Disclosure.Button
                      key={`${link.name}_${i}`}
                      as={Link}
                      href={link.href || ""}
                      className={clsx(
                        link.href === router.pathname
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                    >
                      {link.name}
                    </Disclosure.Button>
                  )
                )}
              </div>
              {/* Put user profile image and name here */}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </div>
  );
};

export default Layout;
