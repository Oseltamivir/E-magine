import React, { Component } from 'react';
import './DiscApp.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Input } from 'antd'
import Streamlistmake from './Streamlistmake'
import './streamchat.css'
const { TextArea } = Input
class Streamlist extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            items: [],
            currentState: { key: '', text: '', user: '', counter: '' },
            currentText: '',
        }
    }
    deleteItem = (key) => {
        const filteredItems = this.state.items.filter(item => {
            return item.key !== key 
        }); 
        this.setState({ items: filteredItems }) 
    }
    addItem = (ev) => { 
        ev.preventDefault(); 
        let newState = { 
            key: Date.now() + this.props.user, 
            text: this.state.currentText, 
            user: this.props.user, 
            counter: 0 
        }; 
        if (newState.text !== '') { 
            let item = [...this.state.items, newState]; 
            this.setState({ currentState: newState, items: item, currentText: '' }) 
        } 
        else { alert('Wrong Input') } 
    }
    handleItem = (ev) => { this.setState({ currentText: ev.target.value }) }
    render() {
        return (
            <div className='todolist' >
                <form onSubmit={this.addItem}>
                    <Streamlistmake
                        entries={this.state.items}
                        deleteItem={this.deleteItem.bind(this)}
                        user={this.props.user}
                    />
                    <div id='Postbar'>
                        <TextArea id='streamMessaging' placeholder='Type something here' value={this.state.currentText} onChange={this.handleItem}></TextArea>
                        <Button size='large' type='primary' onClick={this.addItem}>Post</Button>
                    </div>
                </form>
            </div>
        )
    }
}


export default Streamlist