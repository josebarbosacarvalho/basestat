/* Select top 10 suppliers by value ammout */
SELECT awardSupplier.supplierId,
    SUM(awardSupplier.valueAmount),
    COUNT(DISTINCT awardSupplier.ocid)
FROM awardSupplier
GROUP BY awardSupplier.supplierId
ORDER BY 2 DESC
LIMIT 10 OFFSET 0
    /* Get names from suppliers */
SELECT supplier.partyId,
    supplier.partyName,
    SUM(awardSupplier.valueAmount)
FROM supplier
    JOIN awardSupplier ON supplier.partyId = awardSupplier.supplierId
GROUP BY supplier.partyId,
    supplier.partyName
ORDER BY 3 DESC
LIMIT 10 OFFSET 0
    /* Get number of companies by activity code*/
SELECT activity.designation,
    COUNT(supplierMainActivity.partyId)
FROM activity
    JOIN supplierMainActivity ON activity.code = supplierMainActivity.activityCode
GROUP BY activity.designation
ORDER BY 2 DESC
LIMIT 10 OFFSET 0
    /* Get total amounts by activity code */
SELECT activity.designation,
    SUM(awardSupplier.valueAmount)
FROM activity
    JOIN supplierMainActivity ON activity.code = supplierMainActivity.activityCode
    JOIN awardSupplier ON supplierMainActivity.partyId = awardSupplier.supplierId
GROUP BY activity.designation
ORDER BY 2 DESC
LIMIT 10 OFFSET 0
    /* Tutorial: https://learnsql.com/blog/introduction-using-aggregate-functions-joins/ */