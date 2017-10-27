import React from 'react';
import PropTypes from 'prop-types';


class Modal extends React.Component {

    static propTypes = {
        isOpen: PropTypes.bool,
    };

    static defaultProps = {
        isOpen: false,
    };


    render() {
        if ( !this.props.isOpen ) {
            return null;
        }

        return (
            <div className="b-modal_container">
                <div className="b-modal">{ this.props.children }</div>
            </div>
        )
    }
}

export default Layout;