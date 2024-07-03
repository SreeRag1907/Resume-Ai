/* eslint-disable no-unused-vars */
import { Loader2, PlusSquareIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setLoading(false);
          navigate(
            "/dashboard/resume/" + resp.data.data.id + "/edit"
          );
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div
        className="bg-secondary p-14 py-24 flex items-center justify-center w-[200px] h-[250px] border-4 border-dashed border-black
        hover:scale-105 transition-all hover:shadow-lg cursor-pointer rounded-lg"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquareIcon />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Resume</DialogTitle>
            <DialogDescription>Add your resume title here..!</DialogDescription>
            <div>
              <Input
                placeholder="Ex. Full Stack Developer"
                className="my-4"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-white px-4 py-2 rounded-lg"
                disabled={!resumeTitle}
                onClick={onCreate}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
