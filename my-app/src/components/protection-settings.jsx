"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ProtectionSettings() {
  return (
    <div className="space-y-6">
      {/* Permission Levels Info */}
      <Alert>
        <AlertDescription className="space-y-2">
          <p className="font-medium">Permission Levels:</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="font-medium">Never:</span> Action is completely
              restricted.
            </li>
            <li>
              <span className="font-medium">Mid:</span> Requires explicit
              guardian approval for the action.
            </li>
            <li>
              <span className="font-medium">Open:</span> No restrictions;
              actions are fully allowed.
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Spending Limits */}
      <Card>
        <CardContent className="space-y-1">
          {[
            {
              label: "Daily limits - spend x amount per day",
              defaultValue: "15",
            },
            {
              label: "Weekly limits - spend x amount per Weekly",
              defaultValue: "50",
            },
            {
              label: "Monthly limits - spend x amount per Monthly",
              defaultValue: "250",
            },
            {
              label: "Restrictions apply only during specific times",
              type: "time",
            },
            { label: "Permission Levels:", type: "select" },
            {
              label:
                "Transaction Limit: Set the maximum number of transactions allowed",
              type: "select",
            },
            {
              label: "Allow spending only in approved categories",
              placeholder: "Food, fuel, etc.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <Label className="flex-1">{item.label}</Label>
              <div className="flex-1">
                {item.type === "time" ? (
                  <div className="flex space-x-2">
                    <Input type="time" defaultValue="08:00" className="w-24" />
                    <Input type="time" defaultValue="17:00" className="w-24" />
                  </div>
                ) : item.type === "select" ? (
                  <Select
                    defaultValue={
                      item.label.includes("Permission") ? "mid" : "5"
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {item.label.includes("Permission") ? (
                        <>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="mid">Mid</SelectItem>
                          <SelectItem value="open">Open</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="1">1 transaction</SelectItem>
                          <SelectItem value="5">5 transactions</SelectItem>
                          <SelectItem value="10">10 transactions</SelectItem>
                          <SelectItem value="unlimited">
                            Unlimited transactions
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={item.type || "number"}
                    placeholder={item.placeholder || "100"}
                    defaultValue={item.defaultValue}
                    className="w-[200px]"
                  />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
