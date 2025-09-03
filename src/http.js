export async function fetchAvaliablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json()
  if (!response.ok) {
    throw new Error('Fail to fetch place data..')
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resData = await response.json()
  console.log("resData :: ", resData)
  if (!response.ok) {
    throw new Error('Failed to update user data!')
  }
  return resData.message;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json()
  if (!response.ok) {
    throw new Error('Failed to fetch user places data..')
  }
  return resData.places;
}
