export const UPDATE_BOOK = 'UPDATE_BOOK';
export const SEND_BOOK_TO_EDIT = 'SEND_BOOK_TO_EDIT';


export const updateBookAction = (recipe) => {
    return { 
        type: UPDATE_BOOK, 
        payload: recipe 
    }
}

export const sendBookToEditAction = (recipe) => { 
 return {
    type: SEND_BOOK_TO_EDIT,
    payload: recipe
 }
}