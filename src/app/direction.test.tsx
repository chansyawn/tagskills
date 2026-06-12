import { DirectionStateProvider } from "@/app/direction";
import { I18nStateProvider, useI18nState } from "@/app/i18n";
import { renderWithProviders } from "@/test/render";
import { useDirection } from "@/ui/components/direction";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

function DirectionProbe() {
  const direction = useDirection();
  const { locale, setLocale } = useI18nState();

  return (
    <section aria-label="Direction State">
      <p>{`${locale}:${direction}`}</p>
      <button type="button" onClick={() => setLocale("zh-Hans")}>
        Use Simplified Chinese
      </button>
      <button type="button" onClick={() => setLocale("pseudo")}>
        Use Pseudo RTL
      </button>
    </section>
  );
}

describe("DirectionStateProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    document.documentElement.dir = "ltr";
    localStorage.clear();
  });

  it("keeps English and Simplified Chinese left-to-right", async () => {
    renderWithProviders(
      <I18nStateProvider>
        <DirectionStateProvider>
          <DirectionProbe />
        </DirectionStateProvider>
      </I18nStateProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dir).toBe("ltr");
      expect(screen.getByLabelText("Direction State")).toHaveTextContent("en:ltr");
    });

    fireEvent.click(screen.getByRole("button", { name: "Use Simplified Chinese" }));

    await waitFor(() => {
      expect(document.documentElement.dir).toBe("ltr");
      expect(screen.getByLabelText("Direction State")).toHaveTextContent("zh-Hans:ltr");
    });
  });

  it("uses RTL for the dev-only pseudo locale", async () => {
    renderWithProviders(
      <I18nStateProvider>
        <DirectionStateProvider>
          <DirectionProbe />
        </DirectionStateProvider>
      </I18nStateProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Use Pseudo RTL" }));

    await waitFor(() => {
      expect(document.documentElement.dir).toBe("rtl");
      expect(screen.getByLabelText("Direction State")).toHaveTextContent("pseudo:rtl");
    });
  });
});
