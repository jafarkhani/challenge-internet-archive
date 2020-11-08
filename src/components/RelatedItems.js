import { Component} from 'react';
import _ from 'underscore';
import Loading from '../core/loading/Loading';
import ErrorHandler from '../core/error/ErrorHandler';
import RelatedItem from './RelatedItem';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

class RelatedItems extends Component{
    
    state = {
        loading : true,
        error : false
    };

    componentDidMount(){
        this.LoadItems();
    }

    LoadItems = async () => {
        try{
            const res = await fetch(this.props.urls.relatedItems + this.props.identifier);
            const jsonData = await res.json();

            if(_.isEmpty(jsonData)){
                throw new Error("There is no related items.");
            }

            this.setState({
                loading: false,
                error: false,
                items : jsonData.hits.hits
            })
        }
        catch(err){
            this.setState({
                loading: false,
                error : err.message
            });
        }
    }

    render(){
        
        if(this.state.loading)
            return <Loading msg="loading related items..." />
        
        if(this.state.error)
            return <ErrorHandler msg={this.state.error}/>;

        let swipSliders = this.state.items.map(obj => {
            return <SwiperSlide><RelatedItem {...this.props} {...obj} /></SwiperSlide>
        });

        return (
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                autoplay
                navigation                
                >
                {swipSliders}
                
                </Swiper>
        );
    }
}

export default RelatedItems;