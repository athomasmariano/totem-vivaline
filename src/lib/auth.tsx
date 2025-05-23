export async function fetchLoggedUser() {
    try {
      const res = await fetch("http://localhost:8080/users/me", {
        credentials: "include",
      });
  
      if (!res.ok) {
        return null;
      }
  
      const user = await res.json();
      return user;
    } catch {
      return null;
    }
  }  