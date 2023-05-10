import raw from "../../assets/data/data.json" assert { type: "json" }


export default defineEventHandler(() => {

  const data = raw
    // .reverse()
    .sort((a, b) => {
      // Sortera enligt SFS-logik, på först år sedan löpnummer
      const [aYear, aNr] = a.sfs.split(":")
      const [bYear, bNr] = b.sfs.split(":")
      if (aYear > bYear) return -1
      if (aYear < bYear) return 1
      if (parseInt(aNr) > parseInt(bNr)) return -1
      if (parseInt(aNr) < parseInt(bNr)) return 1
      if (a["kapitel i OSL"] && b["kapitel i OSL"]) {
        // Kan vara null
        // Obs sortera stigande här
        if (a["kapitel i OSL"] > b["kapitel i OSL"]) return 1
        if (a["kapitel i OSL"] < b["kapitel i OSL"]) return -1
      }
      return 0
    })
    .map(row => ({
      ...row,
      "chapter": row["kapitel i OSL"],
      "paragraph": row["paragraf i OSL"],
      "chapter-paragraph": [row["kapitel i OSL"], row["paragraf i OSL"]],
      "validity": row["antal år sekretessen gäller"],
    }))

  return data
})