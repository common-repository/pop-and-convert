import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { ErrorSummary } from '../components';
const ErrorBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <ErrorBoundary>
                <div>This page doesn't exist!</div>
            </ErrorBoundary>;
        }

        if (error.status === 401) {
            return <ErrorBoundary>
                <div>You aren't authorized to see this</div>;
            </ErrorBoundary>
        }

        if (error.status === 503) {
            return <ErrorBoundary>
                <div>Looks like our API is down</div>;
            </ErrorBoundary>
        }

        if (error.status === 418) {
            return <ErrorBoundary>
                <div>🫖</div>
            </ErrorBoundary>
        }
    }

    if (pacpAdminData.permalink === "") {
        return <ErrorSummary>
            <strong className='mb-2'>Something went wrong with permalink structure</strong>
            <p className='text-sm'>Pop and Convert plugin uses WordPress Core REST API interface for creating and managing notifications and does not support the plain permalink structure. Please change <a className='underline text-primary-color' href={`${pacpAdminData.adminURL}/options-permalink.php`}>your permalinks settings</a> to other structure to use Pop and Convert plugin.</p>
        </ErrorSummary>;
    }

    return <ErrorSummary>
        <h2>Something went wrong.</h2>
    </ErrorSummary>;

}

export default ErrorBoundary;