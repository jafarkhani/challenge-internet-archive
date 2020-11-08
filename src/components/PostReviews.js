import _ from 'underscore';
import PostReview from './PostReview';

function PostReviews(props){

    let reviews = _.sortBy(props.reviews, "createdate");
    let items = reviews.map(item => {
       
        return <PostReview {...props} {...item}  />;;
    });

    items.reverse();

    return (
        <div>
            {items}   
        </div>
    );
}

export default PostReviews;