import raw from "../assets/data/data.json" with { type: "json" }


export default defineEventHandler(() => {
  interface DataPoint {
    sekretess: string
    sdate: string
  }

  const data = raw
    .filter(x => x.sekretess)
    .filter(x => x.sdate !== "9") // FIXME i rådata
    .reduce((o: {[y: string]: {[k: string]: number}}, x: DataPoint) => {
    // .reduce((o, x) => {
      const y = x.sdate.slice(0, 4)
      if (!(y in o)) {
        o[y] = {"ökad": 0, "minskad": 0}
      }
      o[y][x.sekretess]++
      return o
    }, {})
  return data
})