import logo from "@/images/logo.png";
import { AppShell, Burger, Image, rem, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconContract,
  IconFileAnalytics,
  IconGauge,
  IconUser,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { ActionToggle } from "../ActionToggle/ActionToggle";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";

export default function Layout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <div
          style={{
            backgroundColor: "#777",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: rem(20),
            paddingRight: rem(20),
          }}
        >
          <div
            style={{
              display: "flex",
              gap: rem(20),
              alignItems: "center",
              height: "100%",
            }}
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Image alt="logo" src={logo.src} style={{ width: rem(40) }} />
          </div>
          <ActionToggle />
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea}>
          <LinksGroup
            onClick={toggle}
            icon={IconGauge}
            label="Page 1 - Home"
            link="/"
          />

          <LinksGroup
            icon={IconContract}
            label="Page Group 1"
            onClick={toggle}
            links={[
              { label: "Page 2", link: "/page-2" },
              { label: "Page 3", link: "/page-3" },
            ]}
          />

          <LinksGroup
            icon={IconUser}
            label="Page Group 2"
            onClick={toggle}
            links={[
              { label: "Page 4", link: "/page-4" },
              { label: "Page 5", link: "/page-5" },
            ]}
          />

          <LinksGroup
            onClick={toggle}
            icon={IconFileAnalytics}
            label="Page 6 - Sqlite"
            link="/page-6"
          />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
