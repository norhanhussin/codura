import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: import("react").ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("Site header mobile navigation", () => {
  it("opens the menu and exposes section links", async () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: "فتح القائمة" }));

    expect(
      await screen.findByRole("navigation", { name: "التنقل على الهاتف" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "مسارات التعلم" })).toHaveAttribute("href", "/#paths");
    expect(screen.getByRole("link", { name: "الاشتراكات" })).toHaveAttribute("href", "/#pricing");
  });
});
