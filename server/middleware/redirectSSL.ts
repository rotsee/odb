import redirectSSL from "redirect-ssl"
export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  redirectSSL.create({
    enabled: config.NODE_ENV === "production",
   })
})
