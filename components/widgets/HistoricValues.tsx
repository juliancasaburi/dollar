"use client"

import React, { useState, useEffect, Fragment } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"
import { getHistoricValues } from "@/actions/getHistoricValues"
import { HistoricData } from "@/lib/types"
import { DatePickerWithRange } from "./DatePickerWithRange"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { DollarLineChart } from "./DollarLineChart"

export function HistoricValues() {
  const [isLoading, setIsLoading] = useState(true) // State to track loading status

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    // range = last week
    from: addDays(new Date(), -7),
    to: new Date(),
  })

  const [filteredData, setFilteredData] = useState<HistoricData[]>([])
  const [allData, setAllData] = useState<HistoricData[]>([])

  function filterData(
    allData: HistoricData[],
    selectedDateRange: DateRange
  ): HistoricData[] {
    return allData
      .filter(
        (entry) =>
          new Date(addDays(entry.fecha, 1)) >=
            (selectedDateRange.from ?? new Date()) &&
          new Date(entry.fecha) <= (selectedDateRange.to ?? new Date())
      )
      .reverse()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricValues()
        setAllData(data)
        setFilteredData(filterData(data, selectedDateRange))
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return isLoading ? ( // Show a loading skeleton while fetching data
    <Skeleton className="w-dwh h-1/2" />
  ) : (
    <Fragment>
      <DollarLineChart data={filteredData} />
      <DatePickerWithRange
        className="mb-4 mt-4"
        initialFrom={selectedDateRange.from}
        initialTo={selectedDateRange.to}
        onDateRangeChange={(range) => {
          setSelectedDateRange(range)
          const filtered = filterData(allData, range)
          setFilteredData(filtered)
        }}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Compra</TableHead>
            <TableHead>Venta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map(
            (
              entry,
              index // Use filteredData for rendering
            ) => (
              <TableRow key={index}>
                <TableCell>
                  {new Intl.DateTimeFormat(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "UTC", // Set a fallback time zone if the user's time zone is not available
                  }).format(new Date(entry.fecha))}
                </TableCell>
                <TableCell>ARS {entry.compra}</TableCell>
                <TableCell>ARS {entry.venta}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Fragment>
  )
}
