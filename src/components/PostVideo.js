

function PostVideo(props){

    return (
        <iframe 
            title={props.identifier}
            className="video-frame" 
            src={`https://archive.org/embed/${props.identifier}`}
            frameBorder="0" 
            webkitallowfullscreen="true" 
            mozallowfullscreen="true" 
            allowFullScreen ></iframe>
    );
}

export default PostVideo;