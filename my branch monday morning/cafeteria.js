function placeOrder(itemName, selectId) {
  const readyTime = document.getElementById(selectId).value;

  alert(
    `Your order for ${itemName} has been placed.\nIt will be ready in ${readyTime}.\nPlease pay when you pick it up.`
  );
}