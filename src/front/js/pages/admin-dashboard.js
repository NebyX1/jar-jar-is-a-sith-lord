import React, {useContext} from 'react';
import {Context} from '../store/appContext';


const Admin_Dashboard = () => {
    const {store, actions} = useContext(Context);

    if (store.isAdmin === true) {
        return (
            <div>
                <h1>Bienvenide queride Admin</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>No hay nada para mostrar</h1>
            </div>
        )
    }


};
export default Admin_Dashboard;
