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
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { getHistoricValues } from "@/actions/getHistoricValues"
import { HistoricData } from "@/lib/types"

export function HistoricValues() {
  const [isLoading, setIsLoading] = useState(true) // State to track loading status
  const [historicData, setHistoricData] = useState<HistoricData[]>([])
  const [visibleData, setVisibleData] = useState<HistoricData[]>([])
  const [showMoreCount, setShowMoreCount] = useState(7)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricValues()
        setHistoricData(data)

        // Reverse the data array and set the initial visible data with formatted dates
        const initialData = [...data]
          .reverse()
          .slice(0, showMoreCount)
          .map((entry) => ({
            ...entry,
            fecha: formatDate(entry.fecha),
          }))
        setVisibleData(initialData)

        setIsLoading(false) // Set loading state to false after fetching
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [showMoreCount])

  const handleShowMore = () => {
    // Increment the count to show 7 more values
    setShowMoreCount((prevCount) => prevCount + 7)
    // Update visibleData to include the next set of values with formatted dates
    setVisibleData((prevData) => {
      const startIndex = prevData.length
      const endIndex = startIndex + 7
      const nextData = [...historicData]
        .reverse()
        .slice(startIndex, endIndex)
        .reverse()
        .map((entry) => ({
          ...entry,
          fecha: formatDate(entry.fecha),
        }))
      return [...prevData, ...nextData]
    })
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return isLoading ? ( // Show a loading skeleton while fetching data
    <Skeleton className="w-dwh h-1/2" />
  ) : (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Compra</TableHead>
            <TableHead>Venta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.fecha}</TableCell>
              <TableCell>$ {entry.compra}</TableCell>
              <TableCell>$ {entry.venta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showMoreCount < historicData.length && (
        <Button
          onClick={handleShowMore}
          variant="outline"
          size="lg"
          className="mt-4 shrink-0"
        >
          Mostrar más
        </Button>
      )}
    </Fragment>
  )
}
