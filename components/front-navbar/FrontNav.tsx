"use client";

import { Fragment, useEffect } from "react";
import Button from "@/components/main-button";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SignedOut, SignedIn } from "@/components/auth";
import { useRouter } from "next/navigation";
import useAuthStore, { testAuth, setLogout, setLogin } from "@/store/authStore";

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import DarkModeSwitch from "@/components/dark-mode-front/DarkModeSwitcher";
import useThemeStore from "@/store/themeStore";
import IsLoadingComponent from "@/components/is-loading";
import Link from "next/link";
import useGeneralStore from "@/store/generalStore";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const pathname = usePathname();
  const navigation = [
    { name: "Home", href: "/", current: pathname == `/` },
    // { name: "About Us", href: "/about", current: pathname.includes(`about`) },
    // { name: "Contact Us", href: "/contact", current: pathname.includes(`about`) },
    { name: "All Games", href: "/games", current: pathname.includes(`games`) },
    { name: "All Accounts", href: "/accounts", current: pathname.includes(`accounts`) },
  ];
  let currentTheme = useThemeStore((s) => s.currentTheme);

  let generalIsLoading = useGeneralStore((s) => s.generalIsLoading);

  // let router = useRouter();
  useEffect(() => {
    if (currentTheme == `dark`) {
      document?.querySelector(`body`)?.classList.add(`dark`);
    } else {
      document?.querySelector(`body`)?.classList.remove(`dark`);
    }
  }, [currentTheme]);

  let { user } = useAuthStore();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useThemeStore.persist.rehydrate();
    let token: any;
    if (getCookie(`hesaby-user-token`)) {
      token = getCookie(`hesaby-user-token`)?.toString();
    } else if (localStorage.getItem(`hesaby-user-token`)) {
      token = localStorage.getItem(`hesaby-user-token`);
    }
    //  __________________
    setTimeout(() => {
      if (!token) {
        setLogout();
      } else {
        testAuth();
      }
    }, 500);
  }, []);

  // authDispatch
  return (
    <Disclosure as="nav" className="bg-gray-200 fixed top-0 z-40 w-full dark:bg-zinc-900 ">
      {({ open }: { open: any }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          `  dark:text-gray-300 `,
                          item.current
                            ? "bg-gray-800 text-white"
                            : " text-blue-950 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* <Loading */}
              <IsLoadingComponent loading={generalIsLoading} />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <DarkModeSwitch />

                <SignedOut className="">
                  <Button href="/auth" className="py-1 px-4 text-md">
                    <div>Sign Up / Log in</div>
                  </Button>
                </SignedOut>

                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}

                <SignedIn>
                  <div className="flex justify-center items-center">
                    <Link href="/sell-your-account">
                      <Button className="py-2 px-4 text-md">
                        <div>Sell Your Account</div>
                      </Button>
                    </Link>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={`/profile/${user.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // authDispatch({ type: `LOGOUT` });
                                  setTimeout(() => {
                                    setLogout();
                                    // window.location.reload();
                                    // window.location.href = "/";
                                  }, 200);
                                }}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
