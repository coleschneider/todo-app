import React from 'react';
import {Component} from 'react';
import axios from 'axios';

class Note extends Component {


    componentWillMount() {
        const param = this.state.id._id
        
        axios.get('/todos/' + param).then(res => {
            console.log(res.data);
            const createdAtUpdated = todoUtils.formatCreationDate(res.data);
            const formattedTodo = todoUtils.formatDate(createdAtUpdated);
            this.setState({
                note: formattedTodo
            })
        })
    }
    constructor(props){
        super(props);
        this.state = {
            currentNote: '',
        }
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    handleNoteChange(ev){
        ev.preventDefault();

        this.setState({
            currentNote: ev.target.value
        })
    }
    

    submitNote(id, input){
        axios.put('/todos/' + id, {
            note: this.state.note
        })
    }


    render() {
        return (
            <form onSubmit={this.submitNote(this.props._id, this.state)}>
            <input value={this.state.currentNote} onChange={this.handleNoteChange}/>
            </form>
        )
    }
}


export default Note