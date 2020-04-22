import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contacts/ContactContext'
import ContactItem from '../contacts/ContactItem';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts } = contactContext;
    console.log(contacts);
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])
    return (
        <Fragment>
            <TransitionGroup>
                {
                    // filtered !== null
                    //     ?
                    // contacts.map(contact => {

                    // })
                    // :
                    contacts.map(contact => (
                        <CSSTransition
                            key={contact._id}
                            timeout={500}
                            classNames='item'>
                            <ContactItem key={contact.id} contact={contact} />
                        </CSSTransition>
                    ))
                }

            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
