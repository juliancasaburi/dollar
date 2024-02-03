import { Calculator } from "@/components/widgets/Calculator";
import { HistoricValues } from "@/components/widgets/HistoricValues";

export default async function Home() {
  return (
    <>
      <section className="justify-center">
        <div className="flex flex-col md:flex-row items-start w-full">
          <div className="mb-4 p-4 rounded-lg border w-full lg:w-1/2 md:mr-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
              Calculadora de dólar oficial
            </h2>
            <Calculator />
          </div>
          <div className="mb-4 p-4 rounded-lg border w-full lg:w-1/2">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
              Cotizacion histórica dólar oficial
            </h2>
            <HistoricValues />
          </div>
        </div>
      </section>
    </>
  );
}
