'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Link, Button } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

export default function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleSignIn = () => {
    if (!session) {
      signIn('oci-iam', { callbackUrl: '/' });
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: `logout=${session?.idToken}` });
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <p className="font-bold text-inherit">OCI Auth &nbsp;</p>
          <Image height={36} width={36}src="/logo-react2.png"/>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            color="primary"
            variant="light"
            onPress={handleSignIn}
          >
            OAuth 2.0 & OIDC
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Link 
            href="https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/typescriptsdkgettingstarted.htm" 
            color="foreground"
            isExternal
          >
            OCI SDK Documentation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            href="https://authjs.dev" 
            color="foreground"
            isExternal
          >
            About Auth.js
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </NavbarItem>
        {session && (
          <NavbarItem>
            <div className="flex items-center gap-4">
              <span className="text-green-600 dark:text-green-400">
                {session.user?.name}
              </span>
              <Button
                color="default"
                variant="flat"
                onPress={handleSignOut}
              >
                Logout
              </Button>
            </div>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
