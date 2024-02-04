import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { HistoricData } from "@/lib/types"

export function DollarLineChart({ data }: { data: HistoricData[] }) {
    const reversedData = [...data].reverse();
    
  return (
    <Card>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={reversedData}
              margin={{
                top: 0,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const { fecha, venta } = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Fecha
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {fecha}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Venta
                            </span>
                            <span className="font-bold">
                              {venta}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="venta"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
