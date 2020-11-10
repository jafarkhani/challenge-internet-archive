
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import _ from 'underscore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostItem.scss';

import Loading from '../loading/Loading';
import ErrorHandler from '../error/ErrorHandler';
import PostVideo from '../PostVideo/PostVideo';
import PostDetails from '../PostDetails/PostDetails';
import PostReviews from '../PostReviews/PostReviews';
import PostFiles from '../PostFiles/PostFiles';
import RelatedItems from '../RelatedItems/RelatedItems';

function PostItem(props){
    
    let params = useParams();
    const id = _.isEmpty(params) ? props.identifier : params.identifier;
    
    const[identifier, setIdentifier] = useState(id);
    const[identifierData, setIdentifierData] = useState({
        metadata : [],
        files: [],
        reviews: []
    });
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);


    const BaseUrl = "https://archive.org/";
    const urls = {
        metadata :          BaseUrl + "metadata/",
        downloadFile :      BaseUrl + "download/",
        downloadCompress :  BaseUrl + "compress/",
        details :           BaseUrl + "details/",
        relatedItems :      "https://be-api.us.archive.org/mds/v1/get_related/all/",
        thumbnail :         BaseUrl + "services/img/"
    };

    useEffect(() => {
       
        setLoading(true);

        const fetchDate = async ()=>{
            try{
                const res = await fetch(urls.metadata + identifier);
                const jsonData = await res.json();
                if(_.isEmpty(jsonData)){
                    throw new Error("The identifier is invalid.");
                }
                setLoading(false);
                setIdentifierData({
                    metadata : jsonData.metadata,
                    files : jsonData.files,
                    reviews : jsonData.reviews
                })
            }
            catch(err){
                setLoading(false);
                setError(err.message);            
            }
        }
        fetchDate();

    },[identifier, urls.metadata]);

    if(loading)
        return (<Loading msg="Loading details..."/>);

    if(error)
        return <ErrorHandler msg={error}/>;

    return (            
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div data-testid="post-video-container" className="col text-center post-video-container">
                        <PostVideo identifier={identifier}/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row post-header">
                            <FontAwesomeIcon icon="film" size="2x" className="post-video-icon"/>
                            <h2>{identifierData.metadata.title}</h2>
                        </div>
                        <div className="row">
                            <div className="offset-1">
                                <div className="mb-3">{identifierData.metadata.description}</div>
                                <PostDetails metadata={identifierData.metadata}/>    
                            </div>
                        </div>
                        <div className="row post-header">
                            <FontAwesomeIcon icon="comment-alt" size="2x" className="post-review-icon"/>
                            <h2 className="flex-fill post-review-header">Reviews</h2>                                
                        </div>  
                        <div className="row offset-1">
                            <PostReviews 
                                identifier={identifier}
                                urls= {urls}
                                reviews={identifierData.reviews}/>                        
                        </div>                          
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col mt-3 mb-3 text-right">
                                {/* TODO: common features */}
                                <FontAwesomeIcon icon="star" className="post-video-star"/>
                                <FontAwesomeIcon icon="share-square" className="post-video-share"/>
                                <FontAwesomeIcon icon="flag" className="post-video-flag"/>
                            </div>
                        </div>
                        <PostFiles 
                            identifier={identifier}
                            files={identifierData.files} 
                            urls={urls}                                
                            />
                    </div>
                </div>                    
            </div>
            <div className="container-fluid p-5 related-post-container">                    
                <RelatedItems 
                    onChangePost={setIdentifier}
                    urls={urls}
                    identifier = {identifier}
                />                    
            </div>
        </div>
    );
}

export default PostItem;