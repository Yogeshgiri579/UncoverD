
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { getAllUsers } from "@/lib/api";

export default UsersPage;

const formatName = (first?: string, last?: string) => {
  if (!first) return last || "Unknown";
  if (!last) return first;
  if (first.toLowerCase() === last.toLowerCase()) return first;
  return `${first} ${last}`;
};

interface AppUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  phone?: string;
}

function RoleBadge({ r }: { r: string }) {
  const map = {
    admin: "bg-primary/10 text-primary",
    user: "bg-gray-500/10 text-gray-600",
  } as const;
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${map[r as keyof typeof map] || "bg-muted text-muted-foreground"}`}>
      {r}
    </span>
  );
}

function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(q.toLowerCase()) ||
      u.firstName.toLowerCase().includes(q.toLowerCase()) ||
      u.lastName.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">All registered user accounts.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => {
          setLoading(true);
          getAllUsers().then(data => {
            setUsers(Array.isArray(data) ? data : []);
          }).catch(err => {
            console.error(err);
            setUsers([]);
          }).finally(() => setLoading(false));
        }}>
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9 h-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-muted-foreground">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-sm text-muted-foreground">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-sm text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>
                        <p className="text-sm font-medium">{formatName(u.firstName, u.lastName)}</p>
                      </TableCell>
                      <TableCell className="text-sm">{u.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.phone || "—"}</TableCell>
                      <TableCell>
                        <RoleBadge r={u.role} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
