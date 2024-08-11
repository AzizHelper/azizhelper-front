import React from 'react'

interface AuthHeaderProp {
    label: string 
    title: string 
}

const AuthHeader = ({label, title}: AuthHeaderProp) => {
  return (
      <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
          <h1 className='text-3xl font-semibold'>{title}</h1>
            <p className='text muted-forground text-sm'></p>

    </div>
  )
}

export default AuthHeader
