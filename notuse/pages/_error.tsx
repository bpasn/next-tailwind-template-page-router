'use client';
interface ErrorProps {
    statusCode: number;
}
function Error({ statusCode }: ErrorProps) {
    return (
        <div className="w-[100%_-_16rem] bg-primary-300 flex justify-center items-center h-screen">
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </div>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
    console.log({res})
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;