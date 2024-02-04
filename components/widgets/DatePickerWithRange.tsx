import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
  className?: string
  onDateRangeChange: (newDateRange: DateRange) => void
  initialFrom?: Date
  initialTo?: Date
}

export function DatePickerWithRange({
  className,
  onDateRangeChange,
  initialFrom = addDays(new Date(), -7), // Default value
  initialTo = new Date(), // Default value
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange>({
    from: initialFrom,
    to: initialTo,
  })

  const handleDateSelect = (selectedDate: DateRange) => {
    setDate(selectedDate)
    onDateRangeChange(selectedDate)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Elegir fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            numberOfMonths={2}
            onSelect={(range: DateRange | undefined) => handleDateSelect(range || { from: undefined, to: undefined })}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
