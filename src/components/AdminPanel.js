import React from 'react';
import LoginPanel from './LoginPanel';
import AddBookForm from './AddBookForm';
import AdminBookListing from './AdminBookListing';
import {fbase} from '../fbase';


class AdminPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedIn : false,
        };
    };

    changeLoggedIn = (newValue) => this.setState({loggedIn: newValue}) 

    addNewRecipe = (recipe) => this.setState({
        recips : [...this.state.recips, recipe]
    })

    componentDidMount() {
        this.ref = fbase.syncState('myrecipes/recipes',{
            context: this,
            state: 'recips'
        });
   }

   componentWillUnmount() {
       fbase.removeBinding(this.ref);
   }


   removeFromInventory = (title) => {
    this.setState({
        recips: this.state.recips.filter( recipe => title!==recipe.name )
    })
   }

    editBook = (oldBookTitle, bookAfterEdit) => {
        const newBooks = this.state.recips.filter( recipe => oldBookTitle!==recipe.name );

        this.setState({
            recips : [...newBooks, bookAfterEdit],
        })
    }
    render() {

        return (
            <div>
            {!this.state.loggedIn &&
               <LoginPanel changeLoggedIn = {this.changeLoggedIn}/>
            }
            {this.state.loggedIn && 
                <React.Fragment>
                    <AddBookForm 
                    addNewRecipe = {this.addNewRecipe} 
                    editBook = {this.editBook}
                    />
                    <AdminBookListing 
                    recips = {this.state.recips} 
                    removeFromInventory = {this.removeFromInventory}
                    />
                    
                </React.Fragment>
            }
            </div>
        )}
}

export default AdminPanel;