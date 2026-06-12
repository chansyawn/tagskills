"use client";

import { useI18nState } from "@/app/i18n";
import type { LocaleCode, ThemeMode } from "@/app/preferences";
import { THEME_MODE_OPTIONS } from "@/app/preferences";
import { useThemeState } from "@/app/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/components/sidebar";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import {
  BookOpenIcon,
  CheckIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
  TagsIcon,
} from "lucide-react";

type SidebarNavItem = {
  title: MessageDescriptor;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

const navItems = [
  {
    title: msg({ id: "sidebar.nav.dashboard", message: "Dashboard" }),
    url: "#",
    icon: <LayoutDashboardIcon />,
    isActive: true,
  },
  {
    title: msg({ id: "sidebar.nav.tags", message: "Tags" }),
    url: "#",
    icon: <TagsIcon />,
  },
  {
    title: msg({ id: "sidebar.nav.skills", message: "Skills" }),
    url: "#",
    icon: <SparklesIcon />,
  },
  {
    title: msg({ id: "sidebar.nav.docs", message: "Docs" }),
    url: "#",
    icon: <BookOpenIcon />,
  },
] satisfies SidebarNavItem[];

function themeModeLabel(themeMode: ThemeMode): MessageDescriptor {
  switch (themeMode) {
    case "dark":
      return msg({ id: "settings.theme.dark", message: "Dark" });
    case "light":
      return msg({ id: "settings.theme.light", message: "Light" });
    case "system":
      return msg({ id: "settings.theme.system", message: "System" });
  }
}

function SidebarSettings() {
  const { i18n } = useLingui();
  const { activeLocale, localeOptions, setLocale } = useI18nState();
  const { resolvedTheme, setThemeMode, themeMode } = useThemeState();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton />}>
            <LanguagesIcon />
            <span>
              <Trans id="settings.language.title">Language</Trans>
            </span>
            <span className="ms-auto text-xs text-muted-foreground">{activeLocale.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <Trans id="settings.language.title">Language</Trans>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={activeLocale.key}
              onValueChange={(value) => {
                setLocale(value as LocaleCode);
              }}
            >
              {localeOptions.map((option) => (
                <DropdownMenuRadioItem key={option.key} value={option.key}>
                  {option.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton />}>
            {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
            <span>
              <Trans id="settings.theme.title">Theme</Trans>
            </span>
            <span className="ms-auto text-xs text-muted-foreground">
              {i18n._(themeModeLabel(themeMode))}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <Trans id="settings.theme.title">Theme</Trans>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={themeMode}
              onValueChange={(value) => {
                setThemeMode(value as ThemeMode);
              }}
            >
              {THEME_MODE_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option} value={option}>
                  {i18n._(themeModeLabel(option))}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { i18n } = useLingui();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <TagsIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">tagskills</span>
                <span className="truncate text-xs">
                  <Trans id="sidebar.workspace.description">Skill library</Trans>
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const title = i18n._(item.title);

            return (
              <SidebarMenuItem key={item.title.id}>
                <SidebarMenuButton
                  tooltip={title}
                  isActive={item.isActive}
                  render={<a href={item.url} />}
                >
                  {item.icon}
                  <span>{title}</span>
                  {item.isActive ? <CheckIcon className="ms-auto" /> : null}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSettings />
      </SidebarFooter>
    </Sidebar>
  );
}
