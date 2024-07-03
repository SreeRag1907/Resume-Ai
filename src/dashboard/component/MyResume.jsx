import { Loader2Icon, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from "./../../../service/GlobalApi";
import toast from "react-hot-toast";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.id).then(
      () => {
        toast.success("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="mt-5 flex flex-col   h-[300px] border-2 border-t-8 border-b-8 border-black rounded-lg overflow-hidden transition-all hover:scale-105">
      <Link
        to={`/dashboard/resume/${resume.id}/edit`}
        className="flex-grow flex flex-col"
      >
        <div
          className="flex-grow p-4 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200"
          style={{
            borderTop: `4px solid ${resume?.themeColor}`,
          }}
        >
          <div className="flex items-center justify-center h-full max-h-48">
            <img
              src="image.png"
              alt="Resume"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>
        </div>
      </Link>
      <div
        className="p-3 flex justify-between items-center"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm sm:text-base lg:text-lg font-bold text-black truncate flex-grow mr-2">
          {resume.attributes.title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 cursor-pointer text-black flex-shrink-0" />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigation(`/dashboard/resume/${resume.id}/edit`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.id}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.id}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;
