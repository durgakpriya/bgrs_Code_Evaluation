import React, { Component } from 'react'

class Name extends Component {

    constructor(props) {
        super(props)
        //called first
        this.state = {
            name: 'jjb',
            loading: true
        }
    }

    add = () => {
        //2
        this.setState({ count: this.state.count + 1 })
    }


    // will be called after the initial render, called only once
    componentDidMount() {
        //only once after the initial render
        // service calls
        //data
        //set them on state
        // loading: false
        console.log('didmount')
    }

    //After render evertime, but not for the first render
    componentDidUpdate(prevProps, prevState) {
        if(this.state.count != prevState.count) {
            //service 
            //this.setState
        }
        console.log('DidUpdate')
    }

    
    // will be called everytime before the render when there is change in props 
    static getDerivedStateFromProps(props, state) {
        //this
        console.log('Derived state from props')
        return { name: 'kkr' }
    }

    //will be called before every render, to cancel or proceed with the render
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.colour == 'blue') return false
        return true
    }

    //will be called before the render
    getSnapshotBeforeUpdate() {
        console.log('get snapshot')
    }

    //this will be called whenever there is an error
    componentDidCatch(error, info) {
        console.log(error, info)
    }

    //
    static getDerivedStateFromError(error) {
        
        return { message: 'There is a untracable error.  Sorry for the inconvenience'}
    }

    componentWillUnmount() {
        console.log('willUnMount')
    }

    render() {
        //third
        console.log('Context', this.context)
        return <div style={{ color: this.props.colour }}>{this.props.name}</div>
    }
}

export default Name