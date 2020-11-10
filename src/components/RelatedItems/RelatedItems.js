import { useState, useEffect} from 'react';
import _ from 'underscore';
import Loading from '../loading/Loading';
import ErrorHandler from '../error/ErrorHandler';
import RelatedItem from './RelatedItem';
import './RelatedItems.scss';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function RelatedItems(props){
    
    const[items, setItems] = useState([]);

    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);    
    
    useEffect(() => {
        
        const fetchDate = async ()=>{
            try{
                const res = await fetch(props.urls.relatedItems + props.identifier);
                const jsonData = await res.json();
    
                if(_.isEmpty(jsonData)){
                    throw new Error("There is no related items.");
                }
    
                setLoading(false);
                setError(false);
                setItems(jsonData.hits.hits);
            }
            catch(err){
                setLoading(false);
                setError(err.message);                
            }
        };
        fetchDate();

    },[items, props.identifier, props.urls.relatedItems]);
            
    if(loading)
        return <Loading msg="loading related items..." />
    
    if(error)
        return <ErrorHandler msg={error}/>;

    let swipSliders = items.map(obj => {
        return <SwiperSlide><RelatedItem {...props} {...obj} /></SwiperSlide>
    });

    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoPlay
            breakpoints={{
                640: {slidesPerView: 3},
                768: {slidesPerView: 3},
                1024: {slidesPerView: 5}
                }}
            navigation                
            >
            {swipSliders}
            
            </Swiper>
    );
    
}

export default RelatedItems;