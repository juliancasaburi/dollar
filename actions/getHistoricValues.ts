export const getHistoricValues = async () => {
  const data = await fetch(
    "https://api.argentinadatos.com/v1/cotizaciones/dolares/oficial"
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
