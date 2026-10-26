import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingForm } from "@/components/BookingForm";

const { submitMock } = vi.hoisted(() => ({ submitMock: vi.fn() }));

vi.mock("@tanstack/react-start", () => ({
  useServerFn: () => submitMock,
}));

vi.mock("@/lib/booking.functions", () => ({
  submitTrialBooking: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: import("react").ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

beforeEach(() => {
  submitMock.mockReset();
});

async function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/اسم ولي الأمر/), {
    target: { value: "أم أحمد" },
  });
  fireEvent.change(screen.getByLabelText(/رقم واتساب ولي الأمر/), {
    target: { value: "+966 50 123 4567" },
  });

  fireEvent.click(screen.getByRole("combobox", { name: /سن الطالب/ }));
  fireEvent.click(await screen.findByRole("option", { name: "9 سنة" }));

  fireEvent.click(document.getElementById("exp-beginner")!);

  fireEvent.click(screen.getByRole("combobox", { name: /المسار المفضل/ }));
  fireEvent.click(await screen.findByRole("option", { name: /سكراتش/ }));
}

describe("Trial booking form", () => {
  it("announces validation errors and focuses the first invalid field", async () => {
    render(<BookingForm />);

    fireEvent.click(screen.getByRole("button", { name: /احجز السيشن التجريبية المجانية/ }));

    const parentName = screen.getByLabelText(/اسم ولي الأمر/);
    await waitFor(() => expect(parentName).toHaveFocus());
    expect(parentName).toHaveAttribute("aria-invalid", "true");
    expect(parentName).toHaveAttribute("aria-describedby", "parentName-error");
    expect(screen.getByRole("alert")).toHaveTextContent("راجع البيانات التالية");
  });

  it("shows a retry message when the booking service rejects the request", async () => {
    submitMock.mockResolvedValue({ ok: false, error: "storage" });
    render(<BookingForm />);

    await fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /احجز السيشن التجريبية المجانية/ }));

    expect(await screen.findByText("حصلت مشكلة في إرسال الطلب.")).toBeInTheDocument();
    expect(submitMock).toHaveBeenCalledTimes(1);
  });

  it("shows the confirmation state after a successful booking", async () => {
    submitMock.mockResolvedValue({ ok: true });
    render(<BookingForm />);

    await fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /احجز السيشن التجريبية المجانية/ }));

    expect(
      await screen.findByRole("heading", { name: /تم استلام طلبك بنجاح/ }),
    ).toBeInTheDocument();
    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock.mock.calls[0][0].data.parentWhatsapp).toBe("+966501234567");
  });
});
