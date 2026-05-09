import raw from "../assets/data/data.json" with { type: "json" }

export default defineEventHandler(() => {
  interface Doc {
    sdate: string
    tags: string[]
  }

  const FIRST_YEARS = new Set(["2019", "2020", "2021", "2022"])
  const LAST_YEARS = new Set(["2023", "2024", "2025", "2026"])
  const MIN_DOCS = 10

  // Count tag frequency across all docs to find eligible tags
  const tagCounts: Record<string, number> = {}
  for (const doc of raw as Doc[]) {
    for (const tag of doc.tags ?? []) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }
  }

  const qualifyingTags = Object.entries(tagCounts)
    .filter(([, count]) => count >= MIN_DOCS)
    .map(([tag]) => tag)
    .sort()

  // Split docs into the two periods (valid dates only)
  const validDocs = (raw as Doc[]).filter(doc => doc.sdate !== "9" && doc.sdate?.length >= 4)
  const firstDocs = validDocs.filter(doc => FIRST_YEARS.has(doc.sdate.slice(0, 4)))
  const lastDocs = validDocs.filter(doc => LAST_YEARS.has(doc.sdate.slice(0, 4)))

  // Relative frequency per tag per period
  const data: Record<string, { first: number; last: number }> = {}
  for (const tag of qualifyingTags) {
    data[tag] = {
      first: firstDocs.filter(doc => doc.tags?.includes(tag)).length / firstDocs.length,
      last: lastDocs.filter(doc => doc.tags?.includes(tag)).length / lastDocs.length,
    }
  }

  return {
    tags: qualifyingTags,
    data,
    periods: {
      first: { label: "2019–2022", total: firstDocs.length },
      last: { label: "2023–2026", total: lastDocs.length },
    },
  }
})
