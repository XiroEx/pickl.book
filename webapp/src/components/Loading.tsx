

export function Loading({full} : any) {
    return (
        <>
            {full === true && <div className="fixed inset-0 bg-[var(--background-color)] z-50 flex justify-center items-center">
                <LoadingWheel />
            </div>}
            {full && <LoadingWheel />}
        
        </>
    )
}

function LoadingWheel() {
    return (
        <div className="w-16 h-16 border-4 border-transparent border-t-[var(--primary-color)] rounded-full animate-spin bg-transparent"></div>
    );
}