// Importa a biblioteca Axios.
import axios from "axios";

// Cria uma instância do Axios com configurações personalizadas.
const api = axios.create({
    // Define a URL base para as requisições HTTP. Essa URL é obtida a partir de uma variável de ambiente,
    // o que torna o código mais seguro e flexível, já que a URL pode ser facilmente alterada sem necessidade de modificar o código.
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('TOKEN'); // Assumindo que o token está armazenado no localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
    
// Exporta a instância criada para que possa ser utilizada em outras partes do projeto.
export default api;