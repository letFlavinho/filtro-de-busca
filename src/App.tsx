import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "./App.css";

interface IRepositories {
  name: string;
  url: string;
}
function App() {
  const [reposList, setReposList] = useState<IRepositories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://api.github.com/users/letFlavinho/repos")
      .then((response) => response.data)
      .then((data) => {
        setReposList(data);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredList =
    search.length > 0
      ? reposList.filter((repo) => repo.name.includes(search))
      : [];

  console.log("Renderizou");
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          {
            setSearch(e.target.value);
          }
        }}
        placeholder="...Buscar"
        name="search"
      />
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar os dados</p>}
      {search.length > 0
        ? filteredList.map((repo) => {
            return (
              <div key={repo.url}>
                <h1>{repo.name}</h1>
              </div>
            );
          })
        : reposList.map((repo) => {
            return (
              <div key={repo.url}>
                <h1>{repo.name}</h1>
              </div>
            );
          })}
    </div>
  );
}

export default App;
