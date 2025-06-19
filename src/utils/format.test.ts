import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatDate, formatLastOnline } from "./format";

describe("formatDate", () => {
  it("should format a timestamp correctly", () => {
    // Mock a specific date: January 15, 2024 12:00:00 UTC
    const timestamp = 1705315200; // Unix timestamp for 2024-01-15 12:00:00 UTC

    const result = formatDate(timestamp);

    // The exact format depends on the locale, but it should be a valid date string
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("should handle zero timestamp", () => {
    const timestamp = 0; // Unix epoch: January 1, 1970

    const result = formatDate(timestamp);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("should handle negative timestamp", () => {
    const timestamp = -86400; // One day before epoch

    const result = formatDate(timestamp);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("should handle very large timestamp", () => {
    const timestamp = 9999999999; // Far future date

    const result = formatDate(timestamp);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });
});

describe("formatLastOnline", () => {
  let mockDate: Date;

  beforeEach(() => {
    // Mock current date to January 15, 2024 12:00:00 UTC
    mockDate = new Date("2024-01-15T12:00:00.000Z");
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should format "just now" for very recent timestamps (less than 1 minute)', () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 30; // 30 seconds ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("0m ago");
  });

  it("should format minutes correctly", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 1800; // 30 minutes ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("30m ago");
  });

  it("should format hours correctly", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 7200; // 2 hours ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("2h ago");
  });

  it("should format hours correctly for partial hours", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 5400; // 1.5 hours ago (90 minutes)

    const result = formatLastOnline(timestamp);

    expect(result).toBe("1h ago"); // Should round down to 1 hour
  });

  it("should format days correctly", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 172800; // 2 days ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("2d ago");
  });

  it("should format days correctly for partial days", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 129600; // 1.5 days ago (36 hours)

    const result = formatLastOnline(timestamp);

    expect(result).toBe("1d ago"); // Should round down to 1 day
  });

  it("should handle exactly 1 hour ago", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 3600; // Exactly 1 hour ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("1h ago");
  });

  it("should handle exactly 1 day ago", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 86400; // Exactly 1 day ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("1d ago");
  });

  it("should handle exactly 59 minutes ago (should show minutes)", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 3540; // 59 minutes ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("59m ago");
  });

  it("should handle exactly 23 hours ago (should show hours)", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 82800; // 23 hours ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("23h ago");
  });

  it("should handle timestamp exactly now (0 minutes difference)", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000); // Exactly now

    const result = formatLastOnline(timestamp);

    expect(result).toBe("0m ago");
  });

  it("should handle very old timestamps", () => {
    const timestamp = Math.floor(mockDate.getTime() / 1000) - 2592000; // 30 days ago

    const result = formatLastOnline(timestamp);

    expect(result).toBe("30d ago");
  });

  it("should handle zero timestamp", () => {
    const timestamp = 0; // Unix epoch

    const result = formatLastOnline(timestamp);

    // Should show a very large number of days
    expect(result).toMatch(/^\d+d ago$/);
  });

  it("should handle negative timestamp", () => {
    const timestamp = -86400; // One day before epoch

    const result = formatLastOnline(timestamp);

    // Should show a very large number of days
    expect(result).toMatch(/^\d+d ago$/);
  });
});
