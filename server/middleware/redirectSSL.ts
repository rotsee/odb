import redirectSSL from "redirect-ssl"
export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  return redirectSSL.create({
    enabled: config.NODE_ENV === "production",
   })
})
