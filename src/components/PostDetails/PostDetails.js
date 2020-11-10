
import './PostDetails.scss';

function PostDetails(props){

    const exceptionKeys = ["title", "description", "backup_location", "licenseurl"];

    let rows = Object.keys(props.metadata)
        .filter(key => exceptionKeys.indexOf(key) === -1 )
        .map(key => 
            <tr key={key}>
                <td className="post-metadata-key">{key}</td>
                <td className="post-metadata-value">{props.metadata[key]}</td>
            </tr> 
        );
        
    return (
        <table>
            {rows}
        </table>
    );
}

export default PostDetails;