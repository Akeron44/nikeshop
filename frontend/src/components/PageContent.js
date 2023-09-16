import { Link } from 'react-router-dom';
import classes from './PageContent.module.css';

function PageContent({ title, children }) {
    return (
        <div className={classes.content}>
            <h1>{title}</h1>
            {children}
            <Link to=".." relative='path'>Go Back</Link>
        </div>
    );
}

export default PageContent;