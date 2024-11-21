'use client'
import { CircleUserRound, Edit2, Save } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Contacts=[
  {
    id:1,
    name:"GitHub",
    src:'/assets/svg/Github.svg'
  },
  {
    id:1,
    name:"Linkedin",
    src:'/assets/svg/Linkedin.svg'
  },
  {
    id:1,
    name:"Portfolio",
    src:'/assets/svg/Portfolio.svg'
  },
  {
    id:1,
    name:"Twitter",
    src:'/assets/svg/Twitter.svg'
  },

]

const user={
  username:"Sudha Chandran",
  branch:"computer Science Engineering",
  skills:"web development",
  bio:"",
}

function ProfilePage() {
   const [isUpdate,setisUpdate]=useState(false);
   const [username,setusername]=useState("");
   const [branch,setbranch]=useState("");
   const [skills,setskills]=useState("");
   const [bio,setbio]=useState("");

   useEffect(()=>{
    setusername(user.username);
    setbranch(user.branch);
    setskills(user.skills);
    setbio(user.bio);

   },[])


  return (
    <div className=' h-screen w-full'>
      <div className='bg-black  h-56 flex flex-col justify-between'>
        <div className='w-full h-6  flex justify-evenly'>
          <div className='h-5 bg-white w-[20%] '></div>
          <div className='h-5 bg-white w-[20%] '></div>
          <div className='h-5 bg-white w-[20%] '></div>
        </div>
        <div>
        <div className='h-5 flex'>
             <div className='w-[60%] ml-[10%] bg-white h-max-5'>
                  
             </div>
        </div>
        <div className='h-5 flex'>
          
             <div className='w-[60%] ml-[5%] bg-white'></div>
             <div className='w-[10%] ml-auto bg-white'>
              <Image src='/assets/icons/hg_logo_1.png' alt="logo" width={100} height={100} className='relative bottom-10 lg:bottom-20'/>
             </div>
        </div>

        </div>
       



      </div>
      <div className=' h-[calc(100%-224px)]'>
          <div className='w-full h-10 '>
            <div className='w-[100%] md:w-[80%] lg:w-[60%] ml-[10%] bg-transparent h-4 flex'>
              <div className='bg-white h-20 w-20 md:h-36 md:w-36 rounded-full relative bottom-20 md:bottom-32 ml-2 flex items-center justify-center'>
              <CircleUserRound className='md:h-40 md:w-40 w-20 h-20' />
              </div>
              <div className='relative bottom-10'>
                <div className='text-lg font-bold'>Sudha chandran</div>
                <button className='bg-[#9A43B1] rounded-full px-2 md:px-5 text-sm  text-white py-[1px] md:py-[6px]'>Level 1</button>
              </div>
              {
                !isUpdate ?(
                  <button className='bg-[#9A43B1] text-white flex gap-3 items-center py-2 px-3 rounded-full ml-auto relative bottom-9 h-10 mr-24' onClick={()=>{setisUpdate(true)}}>
                Update <Edit2 className='w-4 h-4'/>
              </button>
                ):(
                  <button className='bg-[#9A43B1] text-white flex gap-3 items-center py-2 px-3 rounded-full ml-auto relative bottom-9 h-10 mr-24' onClick={()=>{setisUpdate(false)}}>
                     save <Save className='w-4 h-4'/>
                </button>
                )
              }
              
              
            </div>
          </div>
          <div className='mx-auto md:w-[80%] lg:w-[60%] w-[100%]  py-2 '>
            
             <div className='pt-2 flex items-start justify-evenly'>
                 {
                   Contacts && Contacts.map((contact)=>(
                    <div key={contact.id} className='flex flex-col items-center gap-y-3'>
                    <div className=' rounded-xl flex items-center justify-center  border-black border-2 w-24 h-24'>
                       <Image src={contact.src} alt={contact.name} width={100} height={100}  className={contact.name=="GitHub"?"h-20 w-20":"h-12 w-12"}/>
                    </div>
                    <div className='px-3  rounded-full border border-black'>{contact.name}</div>
                </div>
                   ))
                 }
                  
              </div>
              
              <div className='w-full h-[1px] bg-black rounded-full mt-7'>
              </div>
              <div className='mt-6 py-2 flex items-center justify-center'>
              <form action="" className='lg:w-[80%] flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor="username">Username</label>
                <input className='rounded-full py-1 px-4 border w-[70%] border-black' placeholder=' username' value={username} onChange={(e)=>{ if(isUpdate){setusername(e.target.value)}}}/>
               </div>
               <div className='flex items-center justify-between'>
                <label htmlFor="branch">Branch</label>
                <input className='rounded-full py-1 px-4 border w-[70%] border-black' placeholder=' branch' value={branch} onChange={(e)=>{ if(isUpdate){setbranch(e.target.value)}}}/>
               </div>
               <div className='flex items-center justify-between'>
                <label htmlFor="skills">Skills</label>
                <input className='rounded-full py-1 px-4 border w-[70%] border-black' placeholder=' Your skills' value={skills} onChange={(e)=>{ if(isUpdate){setskills(e.target.value)}}}/>
               </div>
               <div className='flex items-center justify-between'>
                <label htmlFor="bio">Bio</label>
                <input className='rounded-full py-1 px-4 border w-[70%] border-black' placeholder='write your short bio' value={bio} onChange={(e)=>{ if(isUpdate){setbio(e.target.value)}}}/>
               </div>
              </form>


              </div>
             

          </div>
      </div>

      
    </div>
  )
}

export default ProfilePage
