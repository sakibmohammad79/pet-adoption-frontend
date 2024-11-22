export function toISODate(dateInput: string | Date): string | null {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}
