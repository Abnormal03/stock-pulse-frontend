import { useCallback, useEffect, useState } from "react"

export const useNews = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [news, setNews] = useState(null);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setError(null);
        }, 5000);

        return () => clearTimeout(timeId)
    }, [error])

    const getNews = useCallback(async (myWatchlists) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/news`, {
                headers: {
                    "Content-Type": "json/application"
                },
                body: {
                    watches: myWatchlists
                }
            });
            if (!response.ok) {
                console.log(response)
                setError('error while fetching news!');
                return;
            }
            const news = await response.json();
            console.log(news)
            if (news.data) {
                setNews(news.data.data);
                return;
            }

        } catch (error) {
            console.log(error);
            setError('error while fetching news!')
        } finally {
            setIsLoading(false)
        }
    }, [])


    return { getNews, news, isLoading, error };
}
