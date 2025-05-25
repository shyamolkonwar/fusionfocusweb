"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export type ChartType = "bar" | "line" | "pie";

interface ChartProps {
  type: ChartType;
  data: any[];
  className?: string;
}

const getChartColors = (isDarkTheme: boolean) => {
  return isDarkTheme
    ? ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]
    : ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];
};

export function BlueprintChart({ type, data, className }: ChartProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  
  const chartColors = useMemo(() => getChartColors(isDarkTheme), [isDarkTheme]);
  
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "hsl(var(--border))" : "hsl(var(--muted))"} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDarkTheme ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))" }}
              />
              <YAxis 
                tick={{ fill: isDarkTheme ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkTheme ? "hsl(var(--card))" : "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }} 
              />
              <Legend />
              {Object.keys(data[0]).filter(key => key !== "name").map((key, index) => (
                <Bar key={key} dataKey={key} fill={chartColors[index % chartColors.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "hsl(var(--border))" : "hsl(var(--muted))"} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDarkTheme ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))" }}
              />
              <YAxis 
                tick={{ fill: isDarkTheme ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkTheme ? "hsl(var(--card))" : "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }} 
              />
              <Legend />
              {Object.keys(data[0]).filter(key => key !== "name").map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={chartColors[index % chartColors.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkTheme ? "hsl(var(--card))" : "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Unsupported chart type</div>;
    }
  };
  
  return (
    <div className={cn("w-full h-96 rounded-lg", className)}>
      {renderChart()}
    </div>
  );
} 