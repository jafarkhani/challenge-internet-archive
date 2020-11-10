import React,{ Component } from 'react';
import './loading.scss';

class Loading extends Component{

    render(){
        
        return (
            <div data-testid="loading" className="loading">
                <span className="loading-icon" ></span>
                <div className="loading-text">{ this.props.msg == null ? "loading..." : this.props.msg }</div>
            </div>
        );
    }
}

export default Loading;