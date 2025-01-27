import { poolPromise } from '../dbConfig.js';

export const getIngGroupPlat = async (req, res) => {
  try {
    const { idsPlats, nombresPersonnes } = req.body; 

    if (!Array.isArray(idsPlats) || !Array.isArray(nombresPersonnes) || idsPlats.length !== nombresPersonnes.length) {
      return res.status(400).send('Invalid input: idsPlats and nombresPersonnes must be arrays of the same length');
    }

    const pool = await poolPromise;
    let allResults = [];

    for (let i = 0; i < idsPlats.length; i++) {
      const idPlat = idsPlats[i];
      const nombrePersonnes = nombresPersonnes[i];

      const query = `
        DECLARE @idPlat INT = @idPlatParam;
        DECLARE @nombrePersonnes INT = @nombrePersonnesParam;

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
            CAST(idt.Quantite AS DECIMAL(10, 2)) * @nombrePersonnes AS QuantityNeeded,
            i.Unite AS Unit,
            i.Valeur AS Valeur,
            i.Prix AS PricePerUnit,
            CAST((CAST(idt.Quantite AS DECIMAL(10, 4)) * @nombrePersonnes * i.Prix / i.Valeur) AS DECIMAL(10, 4)) AS TotalPriceForQuantity
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
          DetailedResults;
      `;

      const result = await pool.request()
        .input('idPlatParam', idPlat)
        .input('nombrePersonnesParam', nombrePersonnes)
        .query(query);

      allResults = allResults.concat(result.recordset);
    }

    const aggregatedResults = allResults.reduce((acc, item) => {
      if (!acc[item.IngredientID]) {
        acc[item.IngredientID] = { ...item, QuantityNeeded: 0, TotalPriceForQuantity: 0 };
      }
      acc[item.IngredientID].QuantityNeeded += item.QuantityNeeded;
      acc[item.IngredientID].TotalPriceForQuantity += item.TotalPriceForQuantity;
      return acc;
    }, {});

    const finalResults = Object.values(aggregatedResults);

    res.json(finalResults);
  } catch (err) {
    console.error('Error fetching plat ingredients:', err);
    res.status(500).send('An error occurred while fetching plat ingredients.');
  }
};