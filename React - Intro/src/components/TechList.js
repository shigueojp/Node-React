import React, { Component } from 'react'
import TechItem from './TechItem'

class TechList extends Component{
    state = {
        newTech: '',
        techs: []
    };

    //Executado quando o componente for executado
    componentDidMount() {
        const techs = localStorage.getItem('techs')

        if (techs) {
            this.setState(({techs: JSON.parse(techs)}))
        }
    }

    //Executado sempre quando o estado for atualizado 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    //Executado quando o componente deixa de existir
    componentWillUnmount() {

    }

    handleInputChange = e => {
        this.setState({newTech: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({techs: [...this.state.techs, this.state.newTech],
        newTech: ''})
    }

    handleDelete = tech => {
        const newState = this.state.techs.filter((el) => el !== tech)

        this.setState({
            ...this.state,
            techs: newState
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.state.techs.map(tech => (
                        <TechItem key={tech} handleDelete={() => this.handleDelete(tech)} tech={tech}></TechItem>
                        
                    )
                )}
                </ul>
                <input type="text" onChange={this.handleInputChange} value={this.state.newTech}></input>
                <button type="submit">Enviar </button>
            </form>
        )
    }
        
    

}

export default TechList