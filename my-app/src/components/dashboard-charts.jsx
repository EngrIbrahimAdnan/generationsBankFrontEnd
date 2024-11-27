"use client";

import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { viewTransactions } from "@/actions"; // Assuming you have this function to get the data from the server

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function DashboardCharts(guardianId) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  // Helper function to group transactions by month and calculate stats
  const aggregateTransactionsByMonth = (transactions) => {
    const grouped = {};

    transactions.forEach((transaction) => {
      // Get the month from the transaction date
      const date = new Date(transaction.date);
      const month = date.toLocaleString("default", { month: "short" }); // 'Jan', 'Feb', etc.

      if (!grouped[month]) {
        grouped[month] = { balance: 0, spending: 0, saving: 0 };
      }

      // Aggregate the transaction details
      grouped[month].balance += transaction.balance || 0;
      grouped[month].spending += transaction.spending || 0;
      grouped[month].saving += transaction.saving || 0;
    });

    // Convert the grouped object into an array
    return Object.keys(grouped).map((month) => ({
      month,
      ...grouped[month],
    }));
  };

  // Fetch monthly data for the bar chart
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const transactions = await viewTransactions(guardianId); // Assuming guardian ID 1 for simplicity
        // Aggregate transactions by month
        const formattedMonthlyData = aggregateTransactionsByMonth(transactions);
        setMonthlyData(formattedMonthlyData);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };
    fetchMonthlyData();
  }, []);

  // Fetch weekly data for the pie chart (same structure, for simplicity here)
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const transactions = await viewTransactions(guardianId); // Assuming guardian ID 1 for simplicity
        // Aggregate weekly data if needed (use the same aggregation as for monthly)
        const weeklyAggregatedData = [
          {
            name: "Balance",
            value: transactions.reduce((acc, t) => acc + (t.balance || 0), 0),
          },
          {
            name: "Spending",
            value: transactions.reduce((acc, t) => acc + (t.spending || 0), 0),
          },
          {
            name: "Saving",
            value: transactions.reduce((acc, t) => acc + (t.saving || 0), 0),
          },
        ];
        setWeeklyData(weeklyAggregatedData);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      }
    };
    fetchWeeklyData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Monthly Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              balance: { label: "Balance", color: "hsl(var(--chart-1))" },
              spending: { label: "Spending", color: "hsl(var(--chart-2))" },
              saving: { label: "Saving", color: "hsl(var(--chart-3))" },
            }}
            className="h-[400px] w-11/12"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="balance"
                  fill="var(--color-balance)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spending"
                  fill="var(--color-spending)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="saving"
                  fill="var(--color-saving)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Pie Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((week) => (
              <div key={week} className="flex flex-col items-center">
                <ChartContainer
                  config={{
                    balance: { label: "Balance", color: COLORS[0] },
                    spending: { label: "Spending", color: COLORS[1] },
                    saving: { label: "Saving", color: COLORS[2] },
                  }}
                  className="h-[200px] w-[200px]"
                >
                  <PieChart>
                    <Pie
                      data={weeklyData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                    >
                      {weeklyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="text-center mt-2">Week {week}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
