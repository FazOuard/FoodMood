import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

plat=pd.read_table('plat v3.tsv')
user='Préférences_Alimentaires.csv'
data = pd.read_csv(user)
historique = pd.read_csv('historique.csv')


# Add a new column 'user_id' with sequential numbers starting from 1
data.insert(0, 'user_id', range(1, len(data)+1))

# Save the updated dataset
updated_file = "users_preferences.csv"
data.to_csv(updated_file, index=False)

users_preferences=pd.read_csv('users_preferences.csv')
users_preferences["Taille "] = users_preferences["Taille "].str.replace(',', '.').astype(float)


# Chargement des données
data = users_preferences.fillna('')

# Table historique simulée
historique = pd.read_csv('historique.csv')

# Fonction pour nettoyer les chaînes de caractères
def clean_data(x):
    return str(x).lower().replace(" ", "")

# Colonnes textuelles et numériques
text_features = ['Plat_prefere', 'Plat_consome', 'type_cuisine', 'regime_alimentaire',
                 'Allergies ', 'Allergie_specification', 'sport_pratique',
                 'Aimer_Plat_marocain', 'type_viande_prefere', 'regime_raison',
                 'dejeuner_preference', 'Nationalité ', 'Région ', 'Vegeterien_question',
                 'Sport_question', 'Poids_etat', 'duree_preparation']
numeric_features = ['Âge', 'Poids ', 'Taille ']

# Nettoyage des colonnes textuelles
for feature in text_features:
    data[feature] = data[feature].apply(clean_data)

# Normalisation des colonnes numériques
scaler = MinMaxScaler()
data[numeric_features] = scaler.fit_transform(data[numeric_features])

# Fonction pour récupérer l'historique d'un utilisateur
def get_user_history(user_id, historique=historique):
    user_history = historique[historique['user_id'] == user_id]
    return ' '.join(user_history['plat'].tolist())

# Créer une "soupe" pour chaque utilisateur (avec historique)
def create_user_soup(x):
    user_id = x.name
    user_history = get_user_history(user_id)  # Inclure l'historique
    weighted_history = ' '.join([plat for plat in user_history.split() for _ in range(3)])  # Pondération
    text_data = ' '.join([str(x[feature]) for feature in text_features])
    numeric_data = ' '.join([str(round(x[feature], 2)) for feature in numeric_features])
    return text_data + ' ' + numeric_data + ' ' + weighted_history

# Mise à jour de la soupe pour chaque utilisateur
data['soup'] = data.apply(create_user_soup, axis=1)

# Vectorisation des "soupes"
count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(data['soup'])

# Calcul de la similarité cosinus entre utilisateurs
cosine_sim = cosine_similarity(count_matrix, count_matrix)

# Fonction pour obtenir des recommandations basées sur un utilisateur
def recommend_for_user(user_index, cosine_sim=cosine_sim, data=data):
    # Identifiez les utilisateurs similaires
    sim_scores = list(enumerate(cosine_sim[user_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]  # Top 5 utilisateurs similaires
    similar_users = [i[0] for i in sim_scores]

    # Récupérez les plats préférés et consommés des utilisateurs similaires
    recommended_plates = []
    for u in similar_users:
        plates = data.iloc[u]['Plat_prefere'].split(',') + data.iloc[u]['Plat_consome'].split(',')
        recommended_plates.extend(plates)

    # Supprimez les plats déjà préférés/consommés par l'utilisateur cible
    user_plates = data.iloc[user_index]['Plat_prefere'].split(',') + data.iloc[user_index]['Plat_consome'].split(',')
    recommended_plates = list(set(recommended_plates) - set(user_plates))

    return recommended_plates[:10]  # Limitez à 10 recommandations


#plate recommandation

def plat_recommended(user_id):
    recommendations = recommend_for_user(user_id)
    plat_resultat = []


    # Nettoyage pour la recherche des titres
    def clean_search_title(title):
        return str(title).lower().replace(" ", "")
    for i in recommendations:
        # Appliquer le nettoyage dans la condition de recherche
        plat_info = plat[plat["Titre"].apply(clean_search_title) == clean_search_title(i)]

        if not plat_info.empty:
            for _, row in plat_info.iterrows():
                # Vérification des valeurs manquantes dans les colonnes Image et Recette
                if pd.isna(row["Image"]) or pd.isna(row["Recette"]):
                    print(f"Invalid entry skipped: {row['Titre']}")
                    continue

                # Ajouter le plat avec son nom exact, sans transformation
                plat_resultat.append({
                    "Titre": row["Titre"],
                    "Image": row["Image"]
                })
        else:
            print(f"Aucune recette trouvée pour {i}")

    return plat_resultat



def content_based_recommendations(train_data, item_id, top_n=10):
    train_data['Ingredients '] = train_data['Ingredients '].fillna('')
    # Check if the item_id exists in the training data
    if item_id not in train_data['id'].values:
        print(f"Item with id '{item_id}' not found in the training data.")
        return []

    # Create a TF-IDF vectorizer for the 'soup' descriptions
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')

    # Apply TF-IDF vectorization to 'soup' column (combined description of each item)
    tfidf_matrix_content = tfidf_vectorizer.fit_transform(train_data['Ingredients '])

    # Calculate cosine similarity between items based on their 'soup' descriptions
    cosine_similarities_content = cosine_similarity(tfidf_matrix_content, tfidf_matrix_content)

    # Find the index of the item based on its ID
    item_index = train_data[train_data['id'] == item_id].index[0]

    # Get the cosine similarity scores for the item
    similar_items = list(enumerate(cosine_similarities_content[item_index]))

    # Sort similar items by similarity score in descending order
    similar_items = sorted(similar_items, key=lambda x: x[1], reverse=True)

    # Get the top N most similar items (excluding the item itself)
    top_similar_items = similar_items[1:top_n+1]

    # Get the indices of the top similar items
    recommended_item_indices = [x[0] for x in top_similar_items]

    # Get the details of the top similar items
    recommended_items_details = train_data.iloc[recommended_item_indices][['Titre', 'Image']]

    # Convert the recommended items into the required format (list of dictionaries)
    recommendations = recommended_items_details.to_dict(orient='records')

    return recommendations

# Hybrid recommendations

def hybrid_recommendations(train_data, target_user_id, item_id, top_n=10):
    # Get content-based recommendations
    content_based_rec = content_based_recommendations(train_data, item_id, top_n)
    # Convert to DataFrame
    content_based_rec = pd.DataFrame(content_based_rec)

    # Get collaborative filtering recommendations
    collaborative_filtering_rec = plat_recommended(target_user_id)
    # Convert to DataFrame
    collaborative_filtering_rec = pd.DataFrame(collaborative_filtering_rec)

    # Merge and deduplicate the recommendations
    hybrid_rec = pd.concat([content_based_rec, collaborative_filtering_rec]).drop_duplicates()

    return hybrid_rec