/**
 * Calculates the 'skip' value for pagination.
 *
 * @param currentPage - The current page number.
 * @param limit - The number of items per page.
 * @returns The calculated 'skip' value.
 */

export const calculateSkip = (currentPage: number, limit: number): number => {
  if (currentPage < 1 || limit < 1) {
    throw new Error('currentPage and limit must be positive numbers')
  }

  return (currentPage - 1) * limit
}
