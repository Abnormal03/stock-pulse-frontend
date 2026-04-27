import React from 'react'

const NewNews = ({ news }) => {
    return (
        <a href={news.url} target='_blank'>
            <div className='flex flex-col lg:grid grid-cols-3 w-full  gap-10 bg-secondary-bg p-5 rounded-2xl min-h-70'>
                <img className='lg:w-150 ' src={news.image_url} alt={news.symbol} />
                <div className='text-text-main col-span-2'>
                    <div className='flex justify-between items-center text-active-icon my-5'>
                        <h1>{news.title}</h1>
                        <h1 className='self-start text-text-dim'>{news.entities[0].symbol}</h1>
                    </div>
                    <p>{news.description}</p>
                </div>
            </div>
        </a>

    )
}

export default NewNews