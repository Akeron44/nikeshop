import Welcome from "../components/Welcome"
import { useRouteError } from 'react-router-dom';
import PageContent from "../components/PageContent";

const ErrorPage = () => {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';
  
    if (error.status === 500) {
      message = error.message;
    }
  
    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }
    return <>
        <Welcome />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    </>
};

export default ErrorPage