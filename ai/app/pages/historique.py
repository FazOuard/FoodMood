import pandas as pd
from datetime import datetime

# Ajouter une interaction à l'historique
def add_interaction_to_historique(user_id, plat, file_path='historique.csv'):
    try:
        # Charger le fichier CSV
        historique_df = pd.read_csv(file_path)

        # Générer un nouvel ID
        new_id = historique_df['id'].max() + 1 if not historique_df.empty else 1

    except FileNotFoundError:
        # Si le fichier n'existe pas encore, créer une table vide
        print("Fichier historique introuvable. Création d'un nouveau fichier.")
        historique_df = pd.DataFrame(columns=['id', 'user_id', 'plat', 'date_interaction'])
        new_id = 1

    # Ajouter une nouvelle ligne
    new_entry = pd.DataFrame({
        'id': [new_id],
        'user_id': [user_id],
        'plat': [plat],
        'date_interaction': [datetime.now()]
    })
    historique_df = pd.concat([historique_df, new_entry], ignore_index=True)

    # Sauvegarder dans le fichier CSV
    historique_df.to_csv(file_path, index=False)
    print(f"Interaction ajoutée : {new_entry.to_dict('records')[0]}")

# Récupérer l'historique d'un utilisateur
def get_user_historique(user_id, file_path='historique.csv'):
    try:
        # Charger le fichier CSV
        historique = pd.read_csv(file_path)
    except FileNotFoundError:
        print("Fichier historique introuvable.")
        return None  # Return None if the file is not found

    # Filtrer les interactions de l'utilisateur
    user_history = historique[historique['user_id'] == user_id]

    # Vérifier si l'utilisateur a des interactions
    if not user_history.empty:
        # Retourner le dernier plat dans l'historique
        return user_history['id'].iloc[-1]
    else:
        print("Aucune interaction trouvée pour l'utilisateur.")
        return None  # Return None if no history is found
    


# Supprimer une interaction de l'historique par ID
def delete_interaction_by_id(interaction_id, file_path='historique.csv'):
    try:
        # Charger le fichier CSV
        historique_df = pd.read_csv(file_path)

        # Vérifier si l'ID existe dans l'historique
        if interaction_id in historique_df['id'].values:
            # Supprimer la ligne correspondante
            historique_df = historique_df[historique_df['id'] != interaction_id]

            # Sauvegarder les modifications dans le fichier CSV
            historique_df.to_csv(file_path, index=False)
            print(f"Interaction avec l'ID {interaction_id} supprimée.")
        else:
            print(f"Interaction avec l'ID {interaction_id} introuvable.")

    except FileNotFoundError:
        print("Fichier historique introuvable. Impossible de supprimer une interaction.")

# Supprimer toutes les interactions d'un utilisateur
def delete_user_historique(user_id, file_path='historique.csv'):
    try:
        # Charger le fichier CSV
        historique_df = pd.read_csv(file_path)

        # Vérifier si l'utilisateur a des interactions
        if user_id in historique_df['user_id'].values:
            # Supprimer toutes les lignes correspondant à l'utilisateur
            historique_df = historique_df[historique_df['user_id'] != user_id]

            # Sauvegarder les modifications dans le fichier CSV
            historique_df.to_csv(file_path, index=False)
            print(f"Historique pour l'utilisateur {user_id} supprimé.")
        else:
            print(f"Aucune interaction trouvée pour l'utilisateur {user_id}.")

    except FileNotFoundError:
        print("Fichier historique introuvable. Impossible de supprimer des interactions.")
