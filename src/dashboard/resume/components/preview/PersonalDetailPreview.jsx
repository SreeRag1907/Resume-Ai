
function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='font-bold text-4xl text-center'
        style={{
            color:resumeInfo?.themeColor
        }}
        >
            {resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-xl font-medium'
       >{resumeInfo?.jobTitle1}</h2>
       <h2 className='text-center font-normal text-base'
        style={{
            color:resumeInfo?.themeColor
        }}>{resumeInfo?.address}</h2>

        <div className='flex justify-between'>
            <h2 className='font-normal text-lg'
             style={{
                color:resumeInfo?.themeColor
            }}>{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-lg'
             style={{
                color:resumeInfo?.themeColor
            }}>{resumeInfo?.email}</h2>

        </div>
        <hr className='border-[2px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor
        }}
        />
    </div>
  )
}

export default PersonalDetailPreview