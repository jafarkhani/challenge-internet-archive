import XDate from '../../utils/XDate';
import './PostReviews.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostReview(props){

    function AhowStars(stars){
        let items = [];
        stars = parseInt(stars);
        for(let i=0; i < stars; i++){
            items.push(<FontAwesomeIcon icon="star" className="post-review-star"/>) ;
        }
        return items;
    }

    function formatDate(date){
        let dateObj = new XDate(date);
        return dateObj.format("F d, Y");
    }

    return (
        <p className="post-review-content">
            <b>Reviewer:</b> <a target="blank" href={props.urls.details + "@" + props.reviewer}>
                {props.reviewer}</a> - {AhowStars(props.stars)} - {formatDate(props.createdate)}
            <br />
            <b>Subject:</b> {props.reviewtitle}
            <br />
            {props.reviewbody}
        </p>
    );
}

export default PostReview;