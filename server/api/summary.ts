import { GoogleSpreadsheet } from "google-spreadsheet"
import assert from "assert"


export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const doc = new GoogleSpreadsheet(config.googleSheetsId)

  doc.useApiKey(config.googleApiKey)
  await doc.loadInfo()
  assert(doc.title === "production")

  // const sheet = doc.sheetsByIndex[0]
  const sheet = doc.sheetsByTitle["data"]
  const rows = await sheet.getRows()

  return {
    r: rows[0].sfs,
  }
})