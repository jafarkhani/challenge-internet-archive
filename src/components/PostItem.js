
import React, { Component } from 'react';
import { withRouter } from "react-router";
import _ from 'underscore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './post.scss';

import Loading from '../core/loading/Loading';
import ErrorHandler from '../core/error/ErrorHandler';
import PostVideo from './PostVideo';
import PostDetails from './PostDetails';
import PostReviews from './PostReviews';
import PostFiles from './PostFiles';
import RelatedItems from './RelatedItems';

class PostItem extends Component{
    
    state = {
        identifier: null,
        metadata : [],
        files : [],
        reviews : [],
        urls : {
            metadata : "https://archive.org/metadata/",
            downloadFile : "https://archive.org/download/",
            downloadCompress : "https://archive.org/compress/",
            details : "https://archive.org/details/",
            relatedItems : "https://be-api.us.archive.org/mds/v1/get_related/all/",
            thumbnail : "https://archive.org/services/img/"

        },
        error: false,
        loading : true        
    };

    constructor(props){
        super(props);

        this.state.identifier = props.match.params.identifier == null 
            ? this.props.identifier 
            : props.match.params.identifier;
        
    }

    componentDidMount() {
        this.loadPostDetails();
    }

    componentDidUpdate(){
        this.loadPostDetails();
    }

    loadPostDetails = async () => {

        try{
            const res = await fetch(this.state.urls.metadata + this.state.identifier);
            const jsonData = await res.json();
            if(_.isEmpty(jsonData)){
                throw new Error("The identifier is invalid.");
            }

            this.setState({
                metadata : jsonData.metadata,
                files : jsonData.files,
                reviews : jsonData.reviews,
                loading: false,
                error : false
            });
        }
        catch(err){
            this.setState({
                loading: false,
                error : err.message
            });
        }
    }
    
    changePost = (newIdentifier) => {
        this.setState({
            loading: true,
            identifier: newIdentifier
        });
    }

    render(){

        if(this.state.loading)
            return (<Loading msg="Loading details..."/>);

        if(this.state.error)
            return <ErrorHandler msg={this.state.error}/>;

        return (            
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-center post-video-container">
                            <PostVideo identifier={this.state.identifier}/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row post-header">
                                <FontAwesomeIcon icon="film" size="2x" className="post-video-icon"/>
                                <h2>{this.state.metadata.title}</h2>
                            </div>
                            <div className="row">
                                <div className="offset-1">
                                    <div className="mb-3">{this.state.metadata.description}</div>
                                    <PostDetails metadata={this.state.metadata}/>    
                                </div>
                            </div>
                            <div className="row post-header">
                                <FontAwesomeIcon icon="comment-alt" size="2x" className="post-review-icon"/>
                                <h2 className="flex-fill post-review-header">Reviews</h2>                                
                            </div>  
                            <div className="row offset-1">
                                <PostReviews 
                                    identifier={this.state.identifier}
                                    urls= {this.state.urls}
                                    reviews={this.state.reviews}/>                        
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
                                identifier={this.state.identifier}
                                files={this.state.files} 
                                downloadFile={this.state.urls.downloadFile}
                                downloadCompress={this.state.urls.downloadCompress}
                                />
                        </div>
                    </div>                    
                </div>
                <div className="container-fluid p-5 related-post-container">                    
                    <RelatedItems 
                        onChangePost={this.changePost}
                        urls={this.state.urls}
                        identifier = {this.state.identifier}
                    />                    
                </div>
            </div>
        );
    }
}

export default withRouter(PostItem);