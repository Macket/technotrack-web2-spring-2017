import React from 'react';
import PropTypes from 'prop-types';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Timestamp from 'grommet/components/Timestamp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class UserInfo extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        last_login: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        username: 'не указан',
        first_name: 'не указано',
        last_name: 'не указана',
        last_login: 'не указан',
    };

    render() {
        let LastLogin = <div>Заходил в последний раз: неизвестно</div>;
        if (this.props.last_login != null) {
            LastLogin = <div>Заходил в последний раз: <Timestamp value={ this.props.last_login } /> </div>;
        }
        return (
            <Columns justify='start'>
                <Box
                    align='center'
                    flex="grow"
                    pad='none'
                    margin='none'
                    colorIndex='light-2'>
                    <Image size="small" src={ this.props.avatar } />
                </Box>
                <Box
                    align='start'
                    pad="none"
                    margin='none'
                    colorIndex='light-2'>
                    <div>Псевдоним: { this.props.username }</div>
                    <div>Имя: { this.props.first_name }</div>
                    <div>Фамилия: { this.props.last_name }</div>
                    { LastLogin }
                </Box>
            </Columns>
        );
    }
}

const mapStateToProps = ({ usersReducer }, ownProps) => {
    return {
        ...usersReducer.users[ownProps.id],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);