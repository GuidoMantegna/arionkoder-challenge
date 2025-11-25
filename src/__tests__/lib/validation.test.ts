import { validateBooking } from "@/lib/validation";

describe("validateBooking", () => {
  describe("name validation", () => {
    it("should reject empty name", () => {
      const result = validateBooking({
        name: "",
        email: "test@example.com",
        date: "2025-12-25",
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
    });

    it("should reject name with only whitespace", () => {
      const result = validateBooking({
        name: "   ",
        email: "test@example.com",
        date: "2025-12-25",
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
    });

    it("should reject name shorter than 2 characters", () => {
      const result = validateBooking({
        name: "A",
        email: "test@example.com",
        date: "2025-12-25",
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe("Name must be at least 2 characters");
    });

    it("should accept valid name", () => {
      const result = validateBooking({
        name: "John Doe",
        email: "test@example.com",
        date: "2025-12-25",
        time: "10:00",
      });

      expect(result.errors.name).toBeUndefined();
    });
  });

  describe("email validation", () => {
    it("should reject empty email", () => {
      const result = validateBooking({
        name: "John Doe",
        email: "",
        date: "2025-12-25",
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe("Email is required");
    });

    it("should reject invalid email format", () => {
      const testCases = ["invalid", "invalid@", "@example.com", "invalid@.com"];

      testCases.forEach((email) => {
        const result = validateBooking({
          name: "John Doe",
          email,
          date: "2025-12-25",
          time: "10:00",
        });

        expect(result.valid).toBe(false);
        expect(result.errors.email).toBe("Invalid email format");
      });
    });

    it("should accept valid email", () => {
      const result = validateBooking({
        name: "John Doe",
        email: "john@example.com",
        date: "2025-12-25",
        time: "10:00",
      });

      expect(result.errors.email).toBeUndefined();
    });
  });

  describe("date validation", () => {
    it("should reject empty date", () => {
      const result = validateBooking({
        name: "John Doe",
        email: "test@example.com",
        date: "",
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.date).toBe("Date is required");
    });

    it("should reject past dates", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const result = validateBooking({
        name: "John Doe",
        email: "test@example.com",
        date: yesterdayStr,
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.date).toBe("Date must be in the future");
    });

    it("should reject today as booking date", () => {
      const today = new Date().toISOString().split("T")[0];

      const result = validateBooking({
        name: "John Doe",
        email: "test@example.com",
        date: today,
        time: "10:00",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.date).toBe("Date must be in the future");
    });

    it("should accept future dates", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      const result = validateBooking({
        name: "John Doe",
        email: "test@example.com",
        date: tomorrowStr,
        time: "10:00",
      });

      expect(result.errors.date).toBeUndefined();
    });
  });

  describe("time validation", () => {
    it("should reject empty time", () => {
      const result = validateBooking({
        name: "John Doe",
        email: "test@example.com",
        date: "2025-12-25",
        time: "",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.time).toBe("Time is required");
    });

    it("should reject times before 9 AM", () => {
      const testCases = ["08:00", "07:30", "00:00"];

      testCases.forEach((time) => {
        const result = validateBooking({
          name: "John Doe",
          email: "test@example.com",
          date: "2025-12-25",
          time,
        });

        expect(result.valid).toBe(false);
        expect(result.errors.time).toBe("Time must be between 9 AM and 6 PM");
      });
    });

    it("should reject times at or after 6 PM", () => {
      const testCases = ["18:00", "19:00", "23:59"];

      testCases.forEach((time) => {
        const result = validateBooking({
          name: "John Doe",
          email: "test@example.com",
          date: "2025-12-25",
          time,
        });

        expect(result.valid).toBe(false);
        expect(result.errors.time).toBe("Time must be between 9 AM and 6 PM");
      });
    });

    it("should accept times between 9 AM and 6 PM", () => {
      const testCases = ["09:00", "12:00", "17:59", "13:30"];

      testCases.forEach((time) => {
        const result = validateBooking({
          name: "John Doe",
          email: "test@example.com",
          date: "2025-12-25",
          time,
        });

        expect(result.errors.time).toBeUndefined();
      });
    });
  });

  describe("complete validation", () => {
    it("should return valid for complete valid form", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      const result = validateBooking({
        name: "John Doe",
        email: "john@example.com",
        date: tomorrowStr,
        time: "14:00",
      });

      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("should collect multiple errors", () => {
      const result = validateBooking({
        name: "",
        email: "invalid-email",
        date: "",
        time: "",
      });

      expect(result.valid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(1);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.date).toBeDefined();
      expect(result.errors.time).toBeDefined();
    });
  });
});
