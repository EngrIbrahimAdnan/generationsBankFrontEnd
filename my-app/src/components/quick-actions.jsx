import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transfer, addDependent } from "@/actions"; // Adjust the import path if necessary

export function QuickActions({ guardianId }) {
  const [transferData, setTransferData] = useState({
    amount: "",
    senderAccountId: "",
    receiverAccountId: "",
  });
  const [accountCode, setAccountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Handle Transfer Money
  const handleTransfer = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await transfer({
        senderAccountId: transferData.senderAccountId,
        receiverAccountId: transferData.receiverAccountId,
        amount: parseFloat(transferData.amount),
      });
      setMessage("Transfer successful!");
      setTransferData({
        amount: "",
        senderAccountId: "",
        receiverAccountId: "",
      });
    } catch (error) {
      setMessage(`Transfer failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Link New Account
  const handleLinkAccount = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await addDependent({ guardianId, dependentId: +accountCode });
      setMessage("Account linked successfully!");
      setAccountCode("");
    } catch (error) {
      setMessage(`Failed to link account: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <div
            className={`p-2 rounded text-sm ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Transfer Money */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Transfer Money</h3>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount"
              className="bg-white"
              value={transferData.amount}
              onChange={(e) =>
                setTransferData({ ...transferData, amount: e.target.value })
              }
            />
            <Select
              onValueChange={(value) =>
                setTransferData({ ...transferData, senderAccountId: value })
              }
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select sender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Account</SelectItem>
                <SelectItem value="son1">SON 1</SelectItem>
                <SelectItem value="son2">SON 2</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) =>
                setTransferData({ ...transferData, receiverAccountId: value })
              }
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select receiver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Account</SelectItem>
                <SelectItem value="son1">SON 1</SelectItem>
                <SelectItem value="son2">SON 2</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="secondary"
              className="bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleTransfer}
              disabled={loading}
            >
              {loading ? "Processing..." : "Transfer"}
            </Button>
          </div>
        </div>

        {/* Link New Account */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Link New Account</h3>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Account Code"
              className="bg-white"
              value={accountCode}
              onChange={(e) => setAccountCode(e.target.value)}
            />
            <Button
              variant="secondary"
              className="bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleLinkAccount}
              disabled={loading}
            >
              {loading ? "Processing..." : "+ Link"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
