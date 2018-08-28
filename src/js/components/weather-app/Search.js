import React, { Component } from 'react'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { startSearching } from '../../actions/searching'
import { stopSearching, search } from '../../actions/searching'
import { bindActionCreators } from 'redux';


class Search extends Component {

    constructor(props){
        super(props)
        this.state={
            input:''
        }
    }

    handleChange(e){
        this.setState({
            input:e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="search-off">
                    <SearchIcon onClick={this.props.startSearching} className="search-icon" />
                </div>
                <Collapse in={this.props.isSearching}>
                    <div className="search-on">
                        <TextField onChange={this.handleChange.bind(this)} inputProps={{
                            style: { textAlign: "center" }
                        }}
                            fullWidth
                            className="search-input" />
                        <SearchIcon onClick={()=> this.props.search(this.state.input)} className="search-icon" />
                        <Close onClick={this.props.stopSearching} className="close" />
                    </div>
                </Collapse>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSearching: state.isSearching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search:bindActionCreators(search,dispatch),
        stopSearching: function () {
            dispatch(stopSearching())
        },
        startSearching: function () {
            dispatch(startSearching())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
