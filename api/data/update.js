const API_URL = 'http://localhost:4200/items';

async function updateItem(itemId, updateData) {
  try {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}
export default updateItem;
