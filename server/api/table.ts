import raw from "../../assets/data/data.json" assert { type: "json" }


export default defineEventHandler(async () => {
  interface DataPoint {
    sekretess: string
    sdate: string
  }

  const data = raw
    .map(row => ({
      ...row,
      "chapter": row["kapitel i OSL"],
    }))

  return data
})