import { poolPromise } from "../dbConfig.js";

export const getUsersWithPreferences = async (req, res) => {
    try {
        const query = `
            SELECT u.*, up.*
            FROM users_preferences up
            INNER JOIN users u ON up.user_id = u.id;
            
        `;

        // Utilisation de .execute() au lieu de .query()
        const pool = await poolPromise;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (error) {
        console.error("Error fetching users with preferences:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteUsersWithPreferences = async (req, res) => {
    const { userId } = req.params;  // On suppose que l'ID de l'utilisateur est passé en paramètre de l'URL

    try {
        

        // 2. Supprimer l'utilisateur de la table users_preferences
        const deleteFromUserPreferences = `
            DELETE FROM users_preferences 
            WHERE user_id = ?;
        `;

        await poolPromise.execute(deleteFromUserPreferences, [userId]);

        // 3. Supprimer l'utilisateur de la table users (si nécessaire)
        const deleteFromUsers = `
            DELETE FROM users 
            WHERE id = ?;
        `;

        await poolPromise.execute(deleteFromUsers, [userId]);

        res.status(200).json({ message: 'User and preferences deleted successfully' });
    } catch (error) {
        console.error('Error deleting user and preferences:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

