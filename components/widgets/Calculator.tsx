"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { useRef } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { getCotizacion } from "@/actions/getCotizacion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const formSchema = z.object({
  dollars: z.number().gte(0.0, {
    message: "La cantidad debe ser mayor o igual a 0.0",
  }),
  pesosWithoutTaxes: z.number().gte(0),
  impuestoPais: z.number().gte(0),
  impuestoGanancias: z.number().gte(0),
  pesosWithImpuestos: z.number().gte(0),
})

export function Calculator() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dollars: 1.0,
      pesosWithoutTaxes: 0.0,
      impuestoPais: 0,
      impuestoGanancias: 0,
      pesosWithImpuestos: 0,
    },
  })

  const [isLoading, setIsLoading] = useState(true) // State to track loading status
  const [ventaValue, setVentaValue] = useState(0)
  const [copied, setCopied] = useState(false)
  const pesosWithImpuestosRef = useRef<HTMLInputElement | null>(null)

  // Fetch data before component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCotizacion()
        setVentaValue(data?.venta || 0)

        updateCalculations(data?.venta || 0)
        setIsLoading(false) // Set loading state to false after fetching
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleDollarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopied(false)
    const dollarsValue = parseFloat(e.target.value)
    form.setValue("dollars", dollarsValue)

    // Fetch data and recalculate based on the new "dollars" value
    const recalculate = async () => {
      try {
        updateCalculations(ventaValue)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    recalculate()
  }

  const updateCalculations = (ventaValue: number) => {
    const pesosWithoutTaxes = ventaValue * (form.getValues("dollars") || 1.0)
    form.setValue("pesosWithoutTaxes", pesosWithoutTaxes)

    // Calculate values based on pesosWithoutTaxes and update the form fields
    const pesosWithoutTaxes30percent = pesosWithoutTaxes * 0.3
    const pesosWithImpuestos =
      pesosWithoutTaxes + 2 * pesosWithoutTaxes30percent

    form.setValue(
      "impuestoPais",
      parseFloat(pesosWithoutTaxes30percent.toFixed(2))
    )
    form.setValue(
      "impuestoGanancias",
      parseFloat(pesosWithoutTaxes30percent.toFixed(2))
    )
    form.setValue(
      "pesosWithImpuestos",
      parseFloat(pesosWithImpuestos.toFixed(2))
    )
  }

  return isLoading ? ( // Show a loading skeleton while fetching data
    <Skeleton className="w-dwh h-96" />
  ) : (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="dollars"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de Dólares ($)</FormLabel>
              <FormControl>
              <Input
                type="number"
                min="0.1"
                step="0.1"
                placeholder="1.0"
                defaultValue={1.0}
                {...field}
                onChange={handleDollarsChange}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pesosWithoutTaxes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de pesos (ARS) sin impuestos:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1.0"
                  step="0.1"
                  placeholder="1.0"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="impuestoPais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>+ Impuesto PAÍS (30%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1.0"
                  step="0.1"
                  placeholder="1.0"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="impuestoGanancias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>+ Imp. a las ganancias (30%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1.0"
                  step="0.1"
                  placeholder="1.0"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pesosWithImpuestos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de pesos (ARS) con impuestos:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1.0"
                  step="0.1"
                  placeholder="1.0"
                  disabled
                  {...field}
                  ref={(el) => {
                    pesosWithImpuestosRef.current = el
                    field.ref(el)
                  }}
                />
              </FormControl>
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="mr-4 h-9 shrink-0"
                      >
                        <CopyToClipboard
                          text={field.value.toString()}
                          onCopy={() => setCopied(true)}
                        >
                          <ClipboardCopyIcon className="h-5 w-5" />
                        </CopyToClipboard>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copiar al portapapeles</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {copied ? (
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                    <span className="text-blue-500">Copiado!</span>
                  </div>
                ) : null}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
