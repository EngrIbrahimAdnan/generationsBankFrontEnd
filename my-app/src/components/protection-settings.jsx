"use client";

import { useState } from "react";
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
import {
  setDailyLimit,
  setWeeklyLimit,
  setMonthlyLimit,
  setRestrictions,
} from "@/actions"; // Adjust the path to your fetch functions

export function ProtectionSettings() {
  const [dailyLimit, setDailyLimitState] = useState(15);
  const [weeklyLimit, setWeeklyLimitState] = useState(50);
  const [monthlyLimit, setMonthlyLimitState] = useState(250);
  const [timeRestrictions, setTimeRestrictions] = useState({
    startTime: "08:00",
    endTime: "17:00",
  });
  const [dependentAccountId] = useState(1); // Replace with actual dependent account ID

  const handleSaveLimits = async () => {
    try {
      await setDailyLimit(dependentAccountId, dailyLimit);
      await setWeeklyLimit(dependentAccountId, weeklyLimit);
      await setMonthlyLimit(dependentAccountId, monthlyLimit);
      alert("Limits updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update limits.");
    }
  };

  const handleSaveRestrictions = async () => {
    try {
      const restrictionRequest = {
        time: timeRestrictions,
      };
      await setRestrictions(dependentAccountId, restrictionRequest);
      alert("Restrictions updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update restrictions.");
    }
  };

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
        <CardHeader>
          <CardTitle>Spending Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Daily Limit:</Label>
            <Input
              type="number"
              value={dailyLimit}
              onChange={(e) => setDailyLimitState(Number(e.target.value))}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label>Weekly Limit:</Label>
            <Input
              type="number"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimitState(Number(e.target.value))}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label>Monthly Limit:</Label>
            <Input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimitState(Number(e.target.value))}
              className="w-[200px]"
            />
          </div>
          <button
            onClick={handleSaveLimits}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Limits
          </button>
        </CardContent>
      </Card>

      {/* Time Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Time Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Start Time:</Label>
            <Input
              type="time"
              value={timeRestrictions.startTime}
              onChange={(e) =>
                setTimeRestrictions((prev) => ({
                  ...prev,
                  startTime: e.target.value,
                }))
              }
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label>End Time:</Label>
            <Input
              type="time"
              value={timeRestrictions.endTime}
              onChange={(e) =>
                setTimeRestrictions((prev) => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
              className="w-[200px]"
            />
          </div>
          <button
            onClick={handleSaveRestrictions}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Restrictions
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
