import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus } from "lucide-react";
import axios from "@/api/axios";
import { headers } from "next/headers";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/userAtom";

const wings = [
  "SD",
  "Arcanum",
  "CyberSecurity",
  "AI/ML",
  "IOTandRobotics",
  "CP",
];

const LevelRequest = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [proofOfWork, setProofOfWork] = useState("");
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "/api/v1/requests",
      {
        userId: user.id,
        wing: selectedWing,
        proofOfWork,
        name: user.name
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(res);

    console.log("Submitted:", { wing: selectedWing, proof: proofOfWork });
    setOpen(false); // Close dialog after submission
    setSelectedWing(""); // Reset form
    setProofOfWork("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Request Level Upgrade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Level Upgrade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Wing</label>
            <Select value={selectedWing} onValueChange={setSelectedWing}>
              <SelectTrigger>
                <SelectValue placeholder="Select a wing" />
              </SelectTrigger>
              <SelectContent>
                {wings.map((wing) => (
                  <SelectItem key={wing} value={wing}>
                    {wing}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Proof of Work</label>
            <Textarea
              value={proofOfWork}
              onChange={(e) => setProofOfWork(e.target.value)}
              placeholder="Describe your contributions and achievements..."
              className="h-32"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LevelRequest;
