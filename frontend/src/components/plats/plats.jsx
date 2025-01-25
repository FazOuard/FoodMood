import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plats.css'
import { useLocation, useNavigate } from 'react-router-dom'; //useLocation permet d'accéder aux informations sur l'URL actuelle, et useNavigate permet de naviguer vers d'autres routes.
import searchicon from '../../assets/icons/search.png'
import { fetchDataAllPlat } from '../../../api/plat_data'; 
//Déclaration du Composant
const Plats = () => { //C'est la déclaration du composant fonctionnel Plats.
  
  const [data, setData] = useState([]);  //data : État pour stocker les données des plats récupérées depuis le serveur.
  const navigate = useNavigate(); //navigate : Fonction pour changer de route dans l'application.
  const location = useLocation(); //location : Contient des informations sur l'URL actuelle, y compris l'état passé via le routeur.
  const [searchText, setSearchText] = useState(''); //searchText : État pour stocker le texte de recherche saisi par l'utilisateur.
  const [CaloriesInterval, setCaloriesInterval] = useState([0, 600]); //CaloriesInterval : État pour stocker un intervalle de calories (probablement utilisé pour filtrer les plats).
  const [ProteineInterval, setProteineInterval] = useState([0, 100]); //ProteineInterval 
  const [GlucideInterval, setGlucideInterval] = useState([0,100]);
  const [selectedDuration, setSelectedDuration] = useState(""); // État pour la durée sélectionnée
  const [LipidesInterval, setLipidesInterval] =useState([0,100]);
  const [selectedType, setSelectedType] = useState('');
  
  //Fonction de Navigation
  const goToOneDish = (idplat) => { //Cette fonction prend un idplat comme argument et utilise la fonction navigate pour rediriger l'utilisateur vers la route /platinfo.
    navigate("/platinfo", {state: { ...(location.state || {}), idplat } })
  }//Elle passe également l'état actuel (s'il existe) et ajoute idplat à cet état. Cela permet de garder une trace du plat sélectionné.



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataAllPlat(); 
        setData(data); 
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

    getData();
  }, []);

  //Gestion des Erreurs d'Image
  console.log("this is the lenght of data:", data.length)
  const handleImageError = (e) => {
    e.target.src = 'path/to/placeholder-image.jpg'; 
  };
  //Filtrage des Données
  const filteredData = data.filter((item) => {//filter data est une liste de liste filter de celle de data cgaque sous liste est une ligne correspondante a un plat dans la base de donnes
    const matchesSearchText = searchText //Filtre par texte de recherche : Si searchText est défini, il vérifie si le titre du plat contient le texte recherché (insensible à la casse).
      ? item.Titre?.toLowerCase().includes(searchText.toLowerCase())
      : true;
    const matchesCaloriesInterval = item.Calories && item.Calories >= CaloriesInterval[0] && item.Calories <= CaloriesInterval[1];//Filtre par intervalle de calories : Vérifie si les calories du plat sont dans l'intervalle spécifié
    const matchesProteinesInterval = item.Proteines && item.Proteines >= ProteineInterval[0] && item.Proteines <= ProteineInterval[1];//Filtre par intervalle de calories : Vérifie si les calories du plat sont dans l'intervalle spécifié
    const matchesGlucideInterval = item.Glucides && item.Glucides >= GlucideInterval[0] && item.Glucides <= GlucideInterval[1];//Filtre par intervalle de calories : Vérifie si les calories du plat sont dans l'intervalle spécifié
    const matchesDuration = selectedDuration ? item.Duree === selectedDuration : true; // Filtrer par durée
    const matchesLipidesInterval = item.Lipides && item.Lipides >= LipidesInterval[0] && item.Lipides <= LipidesInterval[1];//Filtre par intervalle de calories : Vérifie si les calories du plat sont dans l'intervalle spécifié
    const matchesType = selectedType ? item.Cathegorie === selectedType : true; // Filtrage par type
    return matchesSearchText && matchesCaloriesInterval && matchesProteinesInterval &&  matchesGlucideInterval    && LipidesInterval && matchesDuration && matchesType;// &&  matchesTempscuissantInterval    Combinaison : Les plats sont inclus dans filteredData s'ils correspondent aux deux critères.
  });
  
  console.log("this is the lenght of finltered data:", filteredData.length)

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };
  
  const scrambledData = [...filteredData]; // Create a copy of filteredData
  shuffleArray(scrambledData); // Shuffle the copy
  
//Affichage du Composant
  return (
    <div className='ALL'>
      <h1>Nos plats</h1>
      <div className='search'>
        <div className="search-bar">
          <input       //Champ de Saisie
            type="text"
            placeholder="Rechercher un plat..."
            value={searchText}    //L'état searchText détermine la valeur actuelle du champ, ce qui permet à React de contrôler le champ.
            onChange={(e) => setSearchText(e.target.value)} //Met à jour l'état searchText chaque fois que l'utilisateur tape quelque chose dans le champ
          />
          <img src={searchicon} /> //Icône de Recherche
        </div>
        <div className="calories-filter">
          <label>Calories: <span style={{color: "#CECECE", fontWeight:"regular", fontSize: "15px"}}>{`De ${CaloriesInterval[0]} à ${CaloriesInterval[1]} Kcal`}</span></label>           <div className='calories-filter1'>
            <h4>De:</h4>
          <input
            type="number"
            min="0"
            max={CaloriesInterval[1] - 1}
            value={CaloriesInterval[0]}
            onChange={(e) => setCaloriesInterval([Number(e.target.value), CaloriesInterval[1]])}
          />
          <h4>à:</h4>
          <input
            type="number"
            min={CaloriesInterval[0] + 1}
            max="600"
            value={CaloriesInterval[1]}
            onChange={(e) => setCaloriesInterval([CaloriesInterval[0], Number(e.target.value)])}
          />
          </div>
        </div>
        <div className="Proteines-filter">
          <label>Proteines: <span style={{color: "#CECECE", fontWeight:"regular", fontSize: "15px"}}>{`De ${ProteineInterval[0]} à ${ProteineInterval[1]} g`}</span></label>           <div className='Proteines-filter1'>
            <h4>De:</h4>
          <input
            type="number"
            min="0"
            max={ProteineInterval[1] - 1}
            value={ProteineInterval[0]}
            onChange={(e) => setProteineInterval([Number(e.target.value), ProteineInterval[1]])}
          />
          <h4>à:</h4>
          <input
            type="number"
            min={ProteineInterval[0] + 1}
            max="600"
            value={ProteineInterval[1]}
            onChange={(e) => setProteineInterval([ProteineInterval[0], Number(e.target.value)])}
          />
          </div>

          </div>
          
     <div className="Glucide-filter">
          <label>Glucide: <span style={{color: "#CECECE", fontWeight:"regular", fontSize: "15px"}}>{`De ${GlucideInterval[0]} à ${GlucideInterval[1]} g`}</span></label>           <div className='Glucide-filter1'>
            <h4>De:</h4>
          <input
            type="number"
            min="0"
            max={GlucideInterval[1] - 1}
            value={GlucideInterval[0]}
            onChange={(e) => setGlucideInterval([Number(e.target.value), GlucideInterval[1]])}
          />
          <h4>à:</h4>
          <input
            type="number"
            min={GlucideInterval[0] + 1}
            max="600"
            value={GlucideInterval[1]}
            onChange={(e) => setGlucideInterval([GlucideInterval[0], Number(e.target.value)])}
          />
          </div> 
          </div>
       
    
     <div className="Lipides-filter">
          <label>Lipides: <span style={{color: "#CECECE", fontWeight:"regular", fontSize: "15px"}}>{`De ${LipidesInterval[0]} à ${LipidesInterval[1]} g`}</span></label>           <div className='Lipides-filter1'>
            <h4>De:</h4>
          <input
            type="number"
            min="0"
            max={LipidesInterval[1] - 1}
            value={LipidesInterval[0]}
            onChange={(e) => setLipidesInterval([Number(e.target.value), GlucideInterval[1]])}
          />
          <h4>à:</h4>
          <input
            type="number"
            min={LipidesInterval[0] + 1}
            max="600"
            value={LipidesInterval[1]}
            onChange={(e) => setLipidesInterval([LipidesInterval[0], Number(e.target.value)])}
          />
          </div> 
          </div> 
          <div className="duration-filter">
        <label>Durée de cuisson :</label>
        <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
          <option value="">Toutes</option>
          <option value="10 minutes">10 minutes</option>
          <option value="15-30 minutes">15-30 minutes</option>
          <option value="30-60 minutes">30-60 minutes</option>
          <option value="1-3 heures">1-3 heures</option>
        </select>
      </div>
      <div className="type-filter">
        
          <label>Type de plat:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Tous</option>
            <option value="Desserts et Gourmandises">Desserts et Gourmandises</option>
            <option value="Poisson">Poisson</option>
            <option value="Plats Internationaux">Plats Internationaux</option>
            <option value="Plats Rapides et Street Food">Plats Rapides et Street Food</option>
            <option value="Salade">Salade</option>
            <option value="Soupes et Entrées Chaudes">Soupes et Entrées Chaudes</option>
            <option value="Tajine">Tajine</option>
            <option value="Traditionnels Marocains">Traditionnels Marocains</option>
           
            {/* Ajouter d'autres options selon les types de plats disponibles */}
          </select>
        </div>
      </div>
      <div className='plats0'>
        {scrambledData
        .filter((item) => item.Image != null) //Filtre les plats pour ne garder que ceux qui ont une image définie.
        .map((item, index) => ( // Pour chaque plat filtré, crée un nouveau <div>
          <div key={index} className='un_plat' onClick={() => goToOneDish(item.id)}>  
            {item.Image ? (
              <div className='plats_img'>
                <img src={item.Image} alt={item.Titre} onError={handleImageError} />
                <div className='shadow'></div>
                <h2>{item.Titre}</h2>
              </div>
            ) : null}
          </div>
        ))}
    </div>
    </div>
  );
};

export default Plats;

