import { useState, useEffect } from "react";

const temp: Array<number> = [];
export default function Pagination({ totalPages, paginate, setCurrentPageCallback, pageChange } : any){
    const [currentPage, setCurrentPage] = useState(pageChange ? pageChange : 1);
    const [startPoint, setStartPoint] = useState(1); 
    const [endPoint, setEndPoint] = useState(totalPages > 5 ? 5 : totalPages >=3 ? 3 : totalPages); 

    const [arr, setArr] = useState(temp);

    useEffect(() => {
        createArray(startPoint, endPoint);
    }, []);

    const updateArray = (isNext: boolean, currPage: number = currentPage) => {
        let start: number = startPoint, end: number = endPoint;
        if(isNext){
            if(endPoint >= totalPages) return;
            const length = end - start;
            const mid = Math.ceil(length/2);
            
            if(currPage > mid){
                start++; end++;
                setStartPoint(start);
                setEndPoint(end);
                createArray(start, end);
                setCurrentPage(currPage+1);
            }
            else setCurrentPage(currPage+1);
        }
        else{
            if(startPoint <= 1) return;
            const length = end - start;
            const mid = end - Math.ceil(length/2);
            
            if(currPage <= mid && start > 1){
                start--; end--;
                setStartPoint(start);
                setEndPoint(end);
                createArray(start, end);
                setCurrentPage(currPage-1);
            }
            else setCurrentPage(currPage-1);
        }

    }
    const createArray = (start: number, end: number) => {
        const newArr: Array<number> = [];
        for(let i=start; i<=end; i++) newArr.push(i);
        setArr(newArr);
    }

    useEffect(() => {
        console.log(pageChange, currentPage, pageChange > currentPage);
        
        updateArray(pageChange > currentPage);
    }, [pageChange])
    
    useEffect(() => {
        if(paginate) paginate(currentPage);
        if(setCurrentPageCallback && ((pageChange && pageChange != currentPage) || pageChange == null) ) setCurrentPageCallback(currentPage);
    }, [currentPage])

    return (
        <div className="pagination flex w-full justify-center items-center relative">
            <button onClick={() => updateArray(false)}
                className={
                    startPoint == 1 ? "opacity-50 mx-4 cursor-not-allowed text-sm font-semibold color-app" : "mx-4 text-sm font-semibold color-app"
                }>
                &larr; Previous
            </button>
            {
                arr.map(i => (
                <button onClick={() => setCurrentPage(i)} key={'pagination-'+i}
                    className={ currentPage === i ? 
                        "mx-1 flex items-center rounded-md border border-app px-3 py-1 text-white bg-app scale-105 font-extrabold" 
                        : "mx-1 flex items-center rounded-md border border-app px-3 py-1 color-app hover:scale-105" 
                    }>
                    { i }
                </button>
                ))
            }
            <button onClick={() => updateArray(true)}
                className={
                    endPoint == totalPages ? "mx-4 opacity-50 cursor-not-allowed text-sm font-semibold color-app" : "mx-4 text-sm font-semibold color-app"
                }>
                Next &rarr;
            </button>
            <p className="absolute right-2 color-app text-xs">
                Page { currentPage } of { totalPages }
            </p>
        </div>
    );
}