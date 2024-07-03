import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import toast from 'react-hot-toast';

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Initialize formData with non-empty values from resumeInfo
  const initialFormData = {
    firstName: resumeInfo?.firstName || '',
    lastName: resumeInfo?.lastName || '',
    jobTitle1: resumeInfo?.jobTitle1 || '',
    address: resumeInfo?.address || '',
    phone: resumeInfo?.phone || '',
    email: resumeInfo?.email || '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled initially
    setFormFilled(validateForm(initialFormData));
  }, [initialFormData]);

  // Validate if all required fields are filled
  const validateForm = (data) => {
    const { firstName, lastName, jobTitle1, address, phone, email } = data;
    return firstName && lastName && jobTitle1 && address && phone && email;
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData and resumeInfo only if value is non-empty
    if (value.trim() !== '') {
      setFormData({
        ...formData,
        [name]: value,
      });

      setResumeInfo({
        ...resumeInfo,
        [name]: value,
      });

      // Check if the form is now filled completely
      setFormFilled(validateForm({
        ...formData,
        [name]: value,
      }));

      // Enable next if form is filled
      if (validateForm({
        ...formData,
        [name]: value,
      })) {
        enableNext(true);
      }
    }
  };

  // Function to save form data
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty values from formData
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v.trim() !== '')
    );

    const data = {
      data: filteredFormData,
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        toast.success('Details updated');
        enableNext(true);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message || 'Failed to update details');
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle1"
              required
              defaultValue={resumeInfo?.jobTitle1}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading || !formFilled}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
