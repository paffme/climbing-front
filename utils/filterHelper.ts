export function futureCompetitions(): string {
  const now = new Date()

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  )

  const query = {
    startDate: {
      $gte: JSON.stringify(today)
    }
  }

  return JSON.stringify(query)
}
