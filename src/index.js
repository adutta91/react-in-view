import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import "./InView.scss";

class InView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            inView : false,
        };
        
        this.timeout = null;
        this.interval = null;
        
        this.elRef = React.createRef();
    }
    
    
    componentDidMount() {
        this.interval = setInterval(() => {
            this.checkInView();
        }, this.props.reactionTime);
    }
    
    componentWillUnmount() {
        // clean up
        this.stopInterval();
        this.clearTimeout();
    }
    
    isInView() {
        // get element position
        const elBoundingRect = this.elRef.current.getBoundingClientRect();
        
        // get window dimensions
        const windowHeight   = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth    = window.innerWidth || document.documentElement.clientWidth;
        
        if (
            // check Y axis
            elBoundingRect.top >= 0 &&
            elBoundingRect.bottom <= windowHeight &&
            
            // check X axis
            elBoundingRect.left >= 0 &&
            elBoundingRect.right <= windowWidth
        ) {
            return true;
        } else {
            return false;
        }
    }
    
    checkInView() {
        if (this.elRef.current) {
            
            const isInView = this.isInView();
            
            if (isInView && this.props.once) {
                this.stopInterval();
            }
            
            this.update(isInView);
        }
    }
    
    update(isInView) {
        if (isInView !== this.state.inView) {
            this.timeout = setTimeout(() => {
                this.setState({ inView: isInView });
                this.clearTimeout();
            }, this.props.delay);
        }
    }
    
    stopInterval() {
        clearInterval(this.interval);

        this.interval = null;
    }
    
    clearTimeout() {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
    
    render() {
        return (
            <div
                ref={this.elRef}
                className={classnames([
                    'container-in-view',
                    this.state.inView ? 'in' : 'out',
                    { fade : this.props.fade },
                    { [this.props.fadeDir] : !!this.props.fadeDir }
                ])}
            >
                {this.props.children}
            </div>
        );
    }
}

InView.propTypes = {
    once         : PropTypes.bool,
    reactionTime : PropTypes.number,
    delay        : PropTypes.number,
    children     : PropTypes.node,
    
    // animation/style props
    fade    : PropTypes.bool,
    fadeDir : PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

InView.defaultProps = {
    once         : false,
    reactionTime : 500,
    delay        : 500,
    fade         : false,
    fadeDir      : 'left'
};

export default InView;