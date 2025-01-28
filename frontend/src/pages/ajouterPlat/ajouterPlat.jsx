import './ajouterPlat.css'

import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import AjouterPlatt from '../../components/ajouterPlat/ajouterPlat';

const AjouterPlat = () => {

    return (
        <div className='ajouterPlat'>
            <NavBar/>
            <SideBar/>
            <div className='ajouterPlat1'>
                <AjouterPlatt/>
            </div>
        </div>
    );
};

export default AjouterPlat;
