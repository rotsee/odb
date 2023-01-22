import raw from "../../assets/data/data.json" assert { type: "json" }


export default defineEventHandler(() => {

  const data = raw
    .reverse()
    .map(row => ({
      ...row,
      "chapter": row["kapitel i OSL"],
      "paragraph": row["paragraf i OSL"],
      "chapter-paragraph": [row["kapitel i OSL"], row["paragraf i OSL"]],
      "validity": row["antal år sekretessen gäller"],
    }))

  return data
})