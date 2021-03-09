export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        handleErrors(response)
        return response.json()})
}

export const addUrl = (submission) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...submission}), 
  })
    .then(response => {
      handleErrors(response)
      return response.json()})
}

export const deleteUrl = (idNum) => {
  return fetch(`http://localhost:3001/api/v1/urls/${idNum}`, {
    method: 'DELETE' 
  })
    .then(response => {
      handleErrors(response)})
}

const handleErrors = (res) => {
  if (!res.ok) {
    throw new Error()
  }
}