
import { StudentsClient } from '@/components/students/students-client';
import { useApiQuery } from '@/hooks/useApiQuery';
import React from 'react'

const Students = () => {
    
  return (
    <div className='w-full'>
        <StudentsClient />
    </div>
  )
}

export default Students