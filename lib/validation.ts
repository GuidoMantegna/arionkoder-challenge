import type { ValidationResult } from "./types"

export function validateBooking(formData: {
  name: string
  email: string
  date: string
  time: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Name is required"
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = "Email is required"
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format"
  }

  // Validate date
  if (!formData.date) {
    errors.date = "Date is required"
  } else {
    const selectedDate = new Date(formData.date)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)

    if (selectedDate < tomorrow) {
      errors.date = "Date must be in the future"
    }
  }

  // Validate time
  if (!formData.time) {
    errors.time = "Time is required"
  } else {
    const [hours, minutes] = formData.time.split(":").map(Number)
    if (hours < 9 || hours >= 18) {
      errors.time = "Time must be between 9 AM and 6 PM"
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
