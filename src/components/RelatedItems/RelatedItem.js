import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CurrencyFormat  from 'react-currency-format';
import ErrorHandler from '../error/ErrorHandler';
import './RelatedItems.scss';

function RelatedPostItem(props){
    
    let loadPostItem = props.onChangePost;
    try{
    return (
        <div className="card related-post"> 
            <img onClick={() => loadPostItem(props._id)} 
                alt={props._source.title[0]} 
                src={props.urls.thumbnail + props._id} 
                title={props._source.title[0]} 
                />
            <div onClick={() => loadPostItem(props._id)} className="related-post-title">
                {props._source.title[0]}              
            </div>
            <div class="d-flex justify-content-center related-post-features">
                <div>
                    <FontAwesomeIcon icon="film" className="related-post-icon film"/>
                </div>
                <div>
                    <FontAwesomeIcon icon="eye" className="related-post-icon"/>
                    <br /><CurrencyFormat value={props._source.downloads[0]} displayType={'text'} thousandSeparator={true}  />
                </div>
                <div>
                    <FontAwesomeIcon icon="star" className="related-post-icon "/>                    
                </div>
                <div>
                    <FontAwesomeIcon icon="comment-alt" className="related-post-icon "/>
                    <br />{props._source.num_reviews[0]}
                </div>
            </div>
        </div>
    );
    }catch(err){
        return <ErrorHandler />;
    }
}

export default RelatedPostItem;