import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/components/breadcrumb";
import { Separator } from "@/ui/components/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/components/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

import { AppSidebar } from "./-features/sidebar/app-sidebar";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

export default function IndexPage() {
  const { i18n } = useLingui();
  const sidebarToggleLabel = i18n._({
    id: "sidebar.toggle",
    message: "Toggle Sidebar",
  });
  const sidebarTitle = i18n._({
    id: "sidebar.mobile.title",
    message: "Sidebar",
  });
  const sidebarDescription = i18n._({
    id: "sidebar.mobile.description",
    message: "Displays the mobile sidebar.",
  });
  const closeLabel = i18n._({
    id: "common.close",
    message: "Close",
  });

  return (
    <SidebarProvider>
      <AppSidebar
        labels={{ title: sidebarTitle, description: sidebarDescription, close: closeLabel }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" label={sidebarToggleLabel} />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb
              aria-label={i18n._({
                id: "home.breadcrumb.aria",
                message: "Breadcrumb",
              })}
            >
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <Trans id="home.breadcrumb.section">Build Your Application</Trans>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Trans id="home.breadcrumb.page">Data Fetching</Trans>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
