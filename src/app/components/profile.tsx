// import { getUser } from "@/lib/auth";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import UserApi from "./user-api";
import { UserIcon } from "lucide-react";

export default async function Profile() {
  const session = await getUser();
  if (!session?.user) return null;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            <UserIcon className="w-5 h-5 sm:hidden flex" />
            <span className="sm:flex hidden">حسابي</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My account</DialogTitle>
            <div className="pt-8 pb-4 flex flex-col gap-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" disabled value={session.user.email ?? ""} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input disabled id="username" value={session.user.name ?? ""} />
              </div>
              <UserApi />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
