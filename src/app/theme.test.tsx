import { APPEARANCE_STORAGE_KEY, writeAppearancePreferences } from "@/app/preferences";
import { ThemeStateProvider, useThemeState } from "@/app/theme";
import { mockMatchMedia } from "@/test/events";
import { renderWithProviders } from "@/test/render";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";

function ThemePreferenceProbe() {
  const { resolvedTheme, setThemeMode, themeMode } = useThemeState();

  return (
    <section aria-label="Theme Preference">
      <p>{`${themeMode}:${resolvedTheme}`}</p>
      <button type="button" onClick={() => setThemeMode("dark")}>
        Use dark theme
      </button>
    </section>
  );
}

describe("ThemeStateProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("resolves system theme from matchMedia and updates when it changes", () => {
    const media = mockMatchMedia(false);

    renderWithProviders(
      <ThemeStateProvider>
        <ThemePreferenceProbe />
      </ThemeStateProvider>,
    );

    expect(screen.getByLabelText("Theme Preference")).toHaveTextContent("system:light");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("light");

    act(() => {
      media.setMatches(true);
    });

    expect(screen.getByLabelText("Theme Preference")).toHaveTextContent("system:dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("persists explicit theme changes and applies the resolved class", () => {
    writeAppearancePreferences({ locale: "en", themeMode: "light" });
    mockMatchMedia(true);

    renderWithProviders(
      <ThemeStateProvider>
        <ThemePreferenceProbe />
      </ThemeStateProvider>,
    );

    expect(screen.getByLabelText("Theme Preference")).toHaveTextContent("light:light");
    expect(document.documentElement).not.toHaveClass("dark");

    fireEvent.click(screen.getByRole("button", { name: "Use dark theme" }));

    expect(screen.getByLabelText("Theme Preference")).toHaveTextContent("dark:dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(JSON.parse(localStorage.getItem(APPEARANCE_STORAGE_KEY) ?? "{}")).toMatchObject({
      themeMode: "dark",
    });
  });
});
