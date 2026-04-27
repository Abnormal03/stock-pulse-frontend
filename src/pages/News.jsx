import React, { useEffect } from 'react'
import { useNews } from '../hooks/useNews'
import NewNews from '../components/news/NewNews';

const News = ({ myWatchlists }) => {

    const { getNews, error, isLoading, news } = useNews();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                await getNews(myWatchlists);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNews();
    }, [])
    return (
        <div className=''>
            <div>
                <p className='text-text-main text-2xl text-center mt-2 lg:text-left lg:ml-5 lg:text-3xl'>Tranding news</p>
            </div>
            <div className='flex flex-col gap-10 px-2 md:px-10 pb-20 lg:pb-10'>
                {news && news.length > 0 ? (
                    news.map(news => (
                        <NewNews key={news.uuid} news={news} />
                    ))
                ) : (
                    <div>
                        <p className='text-text-dim text-center mt-10'>could't fetch news...</p>
                    </div>
                )}
            </div>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <p className='text-text-main'>Loading news...</p>
                </div>
            )}

            {error && (
                <div className="absolute rounded-sm border-red-400 right-10 bottom-20 border px-10 py-3 bg-secondary-bg">
                    <p className=" text-red-600">{error}</p>
                </div>
            )}
        </div>
    )
}

export default News