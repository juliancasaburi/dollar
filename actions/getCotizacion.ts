export const getCotizacion = async () => {
  const data = await fetch(
    "https://dolarapi.com/v1/dolares/oficial"
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
