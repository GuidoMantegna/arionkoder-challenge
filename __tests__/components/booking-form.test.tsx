import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingForm } from "@/components/booking-form";
import type { Service } from "@/lib/types";
import "@testing-library/jest-dom";

// Mock service data
const mockService: Service = {
  id: "service1",
  name: "Facial Treatment",
  duration: 60,
  price: 120,
  description: "Premium facial treatment",
  centerId: "center1",
};

describe("BookingForm", () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with all required fields", () => {
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  it("displays confirmation button and cancel button", () => {
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    expect(
      screen.getByRole("button", { name: /confirm booking/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("shows validation errors when submitting empty form", async () => {
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const submitButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it("clears error when user starts typing", async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const submitButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(/john doe/i);
    await user.type(nameInput, "Jane Doe");

    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  it("accepts valid form submission", async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const nameInput = screen.getByPlaceholderText(/john doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const dateInput = screen.getByRole("textbox", { name: /date/i });
    const timeInput = screen.getByRole("textbox", { name: /time/i });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(dateInput, tomorrowStr);
    await user.type(timeInput, "14:00");

    const submitButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      const booking = mockOnSuccess.mock.calls[0][0];
      expect(booking).toMatchObject({
        name: "Jane Doe",
        email: "jane@example.com",
        date: tomorrowStr,
        time: "14:00",
        serviceName: "Facial Treatment",
        price: 120,
      });
    });
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const nameInput = screen.getByPlaceholderText(/john doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const dateInput = screen.getByRole("textbox", { name: /date/i });
    const timeInput = screen.getByRole("textbox", { name: /time/i });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(dateInput, tomorrowStr);
    await user.type(timeInput, "14:00");

    const submitButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        service={mockService}
        centerId="center1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const nameInput = screen.getByPlaceholderText(/john doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const dateInput = screen.getByRole("textbox", { name: /date/i });
    const timeInput = screen.getByRole("textbox", { name: /time/i });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "invalid-email");
    await user.type(dateInput, tomorrowStr);
    await user.type(timeInput, "14:00");

    const submitButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
