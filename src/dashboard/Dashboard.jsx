import React, { useEffect, useState } from 'react';
import AddResume from './component/AddResume';
import MyResume from './component/MyResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from '../../service/GlobalApi';

function Dashboard() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeList, setResumeList] = useState([]);

  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      console.log(resp.data.data)
      setResumeList(resp.data.data);
    })
  }

  return (
    <>

      <div className="p-10 md:px-20 lg:px-32">
        <h1 className="font-bold text-4xl">Create Resume</h1>
        <p className="mt-2 text-lg mx-2">Start creating your AI Resume now!</p>
        <div className="mt-4">
          <AddResume />
        </div>
      </div>

      {/* My Resume */}
      <div className="p-10 md:px-20 lg:px-32">
        <h1 className="font-bold text-4xl">My Resume</h1>
        <p className="mt-2 text-lg mx-2">Edit or Update your resume.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {isLoading ? (
            <p>Loading resumes...</p>
          ) : resumeList.length > 0 ? (
            resumeList.map((resume, index) => (
              <MyResume key={index} resume={resume} refreshData={GetResumesList} />
            ))
          ) : (
            <p>No resumes found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
