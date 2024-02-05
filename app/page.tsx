import { Calculator } from "@/components/widgets/Calculator"
import { HistoricValues } from "@/components/widgets/HistoricValues"

export default async function Home() {
  return (
    <>
      <section className="justify-center">
        <h1 className="text-center mt-2 mb-2 pt-2 pb-2 text-4xl font-semibold tracking-tight">
          Dólar oficial
        </h1>
        <div className="flex w-full flex-col items-start md:flex-row">
          <div className="mb-4 w-full rounded-lg border p-4 md:mr-4 lg:w-1/2">
            <h2 className="text-center mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Calculadora dólar tarjeta
            </h2>
            <Calculator />
          </div>
          <div className="mb-4 w-full rounded-lg border p-4 lg:w-1/2">
            <h2 className="text-center mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Cotización histórica
            </h2>
            <HistoricValues />
          </div>
        </div>
      </section>
    </>
  )
}
