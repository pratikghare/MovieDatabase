import { useId } from "react";

export const StarRating = ({ percentage, className }: { percentage: number, className?: string }) => {
    const id = useId();
    return (
        <div className={'flex my-1 items-center space-x-1 ' + (!!className && className)}>
            <p className=''>{percentage / 10}</p>
            <div className='star-rating text-xs'>
                <div className='star-back text-foreground/50'>
                    {Array(5).fill(0).map((_, i) => (
                        <span className='text-foreground/50' key={id+'-star-back-'+i}>★</span>
                    ))}
                </div>
                <div
                    className='star-front text-warning'
                    style={{ width: `${percentage}%` }}
                >
                    {Array(5).fill(0).map((_, i) => (
                        <span key={id+'-star-front-'+i}>★</span>
                    ))}
                </div>
            </div>
        </div>
    );
}