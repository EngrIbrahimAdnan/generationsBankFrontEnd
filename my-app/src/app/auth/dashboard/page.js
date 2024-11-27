"use client";

import { MainNav } from "@/components/main-nav";
import { Overview } from "@/components/overview";
import { DataTable } from "@/components/data-table";
import { QuickActions } from "@/components/quick-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
} from "@/components/ui/sidebar";

import "../../globals.css";
import { DashboardCharts } from "@/components/dashboard-charts";
import { ProtectionSettings } from "@/components/protection-settings";
import { decodeJwt } from "@/actions";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchDecodedToken = async () => {
      try {
        const decodedToken = await decodeJwt(
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInN1YiI6IlJhbWVucyIsImlhdCI6MTczMjYzMDg5OCwiZXhwIjoxNzMyNjM0NDk4fQ.RUm3591SnAWbf3ZlF0upEqbBPx8iQKJ5G0KtarJwCz8"
        );
        setId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error); // Retain error logging for debugging
      }
    };

    fetchDecodedToken();
  }, []);

  return (
    <SidebarProvider>
      <div className="w-screen hidden md:block">
        {/* Header */}
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <SidebarTrigger />
            </div>
          </div>
        </div>

        {/* Sidebar and Content */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <AppSidebar className="w-64 h-full border-r bg-gray-100" />
          <SidebarContent className="flex-1 overflow-visible">
            {/* Main Content */}
            <div className="flex-1 p-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              </div>

              {/* Overview Section */}
              <div className="p-9 bg-gray-100 rounded-xl border shadow-md z-10 w-full">
                <h1 className="text-l font-bold mb-1">Overview</h1>
                <Overview />
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="payment" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed report</TabsTrigger>
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="protection">Protection</TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent value="payment">
                  <div className="mt-6">
                    <QuickActions guardianId={id} />
                  </div>
                </TabsContent>

                <TabsContent value="detailed">
                  <div className="mt-6">
                    <DataTable guardianId={id} />
                  </div>
                </TabsContent>

                <TabsContent value="chart">
                  <div className="mt-6">
                    <DashboardCharts guardianId={id} />
                  </div>
                </TabsContent>

                <TabsContent value="protection">
                  <div className="mt-6">
                    <ProtectionSettings />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </SidebarContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
