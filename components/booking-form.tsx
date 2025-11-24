"use client";

import type React from "react";

import { useState } from "react";
import { validateBooking } from "@/lib/validation";
import type { Service, Booking } from "@/lib/types";

interface BookingFormProps {
  service: Service;
  centerId: string;
  onSuccess: (booking: Booking) => void;
  onCancel: () => void;
}

export function BookingForm({
  service,
  centerId,
  onSuccess,
  onCancel,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateBooking(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 500));

    const booking: Booking = {
      id: `booking_${Date.now()}`,
      serviceId: service.id,
      centerId,
      name: formData.name,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      serviceName: service.name,
      price: service.price,
      duration: service.duration,
      createdAt: new Date().toISOString(),
    };

    onSuccess(booking);
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[50vh] overflow-y-auto"
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="fullName"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            errors.name
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-border focus:ring-2 focus:ring-primary/20"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Email
        </label>
        <input
          // type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            errors.email
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-border focus:ring-2 focus:ring-primary/20"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          role="textbox"
          value={formData.date}
          onChange={handleChange}
          min={minDate}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            errors.date
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-border focus:ring-2 focus:ring-primary/20"
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="time"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Time
        </label>
        <input
          type="time"
          name="time"
          id="time"
          role="textbox"
          value={formData.time}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            errors.time
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-border focus:ring-2 focus:ring-primary/20"
          }`}
        />
        {errors.time && (
          <p className="text-red-500 text-sm mt-1">{errors.time}</p>
        )}
      </div>

      <div className="flex gap-3 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all active:scale-95 cursor-pointer"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-muted text-foreground hover:bg-muted/80 font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
