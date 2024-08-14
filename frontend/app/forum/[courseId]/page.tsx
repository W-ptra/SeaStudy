import React from 'react'

const ForumDetailPage = () => {
  return (
    <div className='flex flex-col items-center'>
        {/* Title */}
        <h1 className='text-[3vw]'>
            Forum
        </h1>

        {/* Forum Wrapper */}
        <section className='flex flex-col items-start border-[3px] border-black w-[90vw] rounded-md'>
            {/* Chat1 */}
            <div className='flex flex-col p-4'>
                <div className=' font-semibold'>
                    Name1
                </div>
                Hello there!
            </div>
            {/* Chat2 */}
            <div className='flex flex-col p-4'>
                <div className=' font-semibold'>
                    Name2
                </div>
                <div className='text-justify break-before-auto'>
                    XxxxxXXXXX XXXXXXXXXXXXXXXXX XxxxxXXXXX XXXXXXXXXXXXXXXXX XxxxxXXXXX XXXXXXXXXXXXXXXXX XxxxxXXXXX XXXXXXXXXXXXXXXXX XxxxxXXXXX XXXXXXXXXXXXXXXXX XxxxxXXXXX XXXXXXXXXXXXXXXXX 
                </div>
            </div>

            {/* Type Discussion */}
            <div className='flex justify-center w-full'>

                <div className='flex border-[2px] border-black rounded-md w-[90%] m-4 p-2'>
                    <form className='w-[90%] text-justify break-before-auto'>
                        <input type='textarea' className='w-[100%] border-none outline-none' placeholder='Type Here'></input>
                    </form>
                    <button className='bg-green-600 text-white rounded-md w-[10%] flex justify-center'>
                        Send
                    </button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default ForumDetailPage