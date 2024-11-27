import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "@/components/ui/bar";

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Main account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$92,405</div>
          <Bar className="h-[60px]" />
          <p className="text-xs text-muted-foreground">
            +2.25% period of change
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SON 1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$32,218</div>
          <Bar className="h-[60px]" />
          <p className="text-xs text-muted-foreground">
            +3.25% period of change
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SON 2</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">298</div>
          <Bar className="h-[60px]" />
          <p className="text-xs text-muted-foreground">
            +8.84% period of change
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
