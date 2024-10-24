export function get(url: string, setOptions: boolean = true): Promise<any> {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGQ0ZmVjYzZiYjQ0YzMzMWU2OGZmN2QyNTdmYTM2NSIsIm5iZiI6MTcyOTc3MDQ5OC42MDMyMjEsInN1YiI6IjVmNGY5MDIwZTgxMzFkMDAzNzUwOTRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YeRvBtK79lmEjOteKQrqn5RNU6Hh83n84UtHaCJI20g'
        }
      };
    return fetch(url, setOptions ? options : undefined).then(response => response.json());
}