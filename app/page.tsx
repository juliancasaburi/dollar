import { Calculator } from "@/components/widgets/Calculator";
import { HistoricValues } from "@/components/widgets/HistoricValues";

export default async function Home() {
  return (
    <>
      <section className="justify-center">
        <div className="flex items-start w-full">
          <div className="mr-10 mb-4 p-4 rounded-lg border w-full">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
              Calculadora de dólar oficial
            </h2>
            <Calculator />
          </div>
          <div className="p-4 rounded-lg border w-full">
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
