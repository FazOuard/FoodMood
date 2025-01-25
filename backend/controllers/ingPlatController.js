import { poolPromise } from '../dbConfig.js';

export const getPlatIngredients = async (req, res) => {
  try {
    const { idPlat } = req.params; // Get idPlat from the URL parameters

    // Validate idPlat
    if (!idPlat || isNaN(idPlat)) {
      return res.status(400).send('Invalid idPlat');
    }

    const pool = await poolPromise;

    // Use parameterized query to prevent SQL injection
    const query = `
      DECLARE @idPlat INT = @idPlatParam;

      WITH IngredientDetails AS (
        SELECT
          ip.idPlat,
          idIngList.Value AS idIng,
          QuantiteList.Value AS Quantite
        FROM
          IngredientsPlat ip
        CROSS APPLY dbo.SplitStringWithOrdinal(ip.idIng, ',') AS idIngList
        CROSS APPLY dbo.SplitStringWithOrdinal(ip.Quantite, ',') AS QuantiteList
        WHERE
          ip.idPlat = @idPlat
          AND idIngList.Ordinal = QuantiteList.Ordinal
      ),
      DetailedResults AS (
        SELECT 
          i.id AS IngredientID,
          i.Ingredient AS IngredientName,
          CAST(idt.Quantite AS DECIMAL(10, 2)) AS QuantityNeeded,
          i.Unite AS Unit,
          i.Valeur AS Valeur,
          i.Prix AS PricePerUnit,
          CAST((CAST(idt.Quantite AS DECIMAL(10, 4)) * i.Prix / i.Valeur) AS DECIMAL(10, 4)) AS TotalPriceForQuantity
        FROM
          IngredientDetails idt
        JOIN
          Ingredients i ON i.id = idt.idIng
      )
      SELECT 
        IngredientID,
        IngredientName,
        QuantityNeeded,
        Unit,
        Valeur,
        PricePerUnit,
        TotalPriceForQuantity
      FROM
        DetailedResults

      UNION ALL

      SELECT 
        0 AS IngredientID,
        'Total' AS IngredientName,
        0 AS QuantityNeeded,
        NULL AS Unit,
        NULL AS Valeur,
        NULL AS PricePerUnit,
        SUM(TotalPriceForQuantity) AS TotalPriceForQuantity
      FROM
        DetailedResults;
    `;

    const result = await pool.request()
      .input('idPlatParam', idPlat) // Use parameterized input
      .query(query);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching plat ingredients:', err); // Log the error for debugging
    res.status(500).send('An error occurred while fetching plat ingredients.');
  }
};