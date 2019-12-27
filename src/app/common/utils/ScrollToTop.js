import React ,{Component} from 'react';
import {withRouter} from 'react-rotuer-dom';


class ScrollToTop extends Component{
    /* if you update a route component and is still in the same component after the update then take me to the start of the screen so that i can recognize that the compoennt has been updated */
    componentDidUpdate(prevProps){
        if(this.props.location.pathname!==prevProps.props.location.pathname){
            window.scrollTo(0.0);
        }
    }
    render(){
        return (
            this.props.children
        )
    }
}

export default withRouter(ScrollToTop)