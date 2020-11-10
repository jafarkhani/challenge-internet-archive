import './PostVideo.scss';

function PostVideo(props){

    return (
        <iframe 
            data-testid="post-video"
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