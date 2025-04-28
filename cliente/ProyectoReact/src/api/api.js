const API_BASE_URL = "http://localhost/SERVIDOR-main/PhpInsulina"; 


export const getUsers = async () => {
  const response = await fetch("http://localhost/SERVIDOR-main/PhpInsulina/getUsers.php");
  return response.json();
};



export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/createUser.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const updateUser = async (username, userData) => {
  
  const response = await fetch(`${API_BASE_URL}/updateUser.php`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, ...userData })
  });
  return response.json();
};

export const deleteUser = async (username) => {
  const response = await fetch(`${API_BASE_URL}/deleteUser.php`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });
  return response.json();
};

export const getStatistics = async (month) => {
  
  const response = await fetch(`${API_BASE_URL}/getStatistics.php?month=${month}`);
  return response.json();
};
