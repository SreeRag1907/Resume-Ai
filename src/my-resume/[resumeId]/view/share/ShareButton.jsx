// ShareDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ShareDialog = () => {
  const { resumeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false); // State to track if link is copied
  const resumeLink = `${window.location.origin}/resume/${resumeId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(resumeLink).then(() => {
      setCopied(true); // Update copied state to true
      toast.success('Link copied to clipboard!');

      // Reset copied state back to false after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Resume</DialogTitle>
          <DialogDescription>
            Copy the link below to share your resume with others.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Input value={resumeLink} readOnly />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCopyLink} disabled={copied}>
            {copied ? 'Copied' : 'Copy Link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
