const axios = require("axios");

const BASE_URL = "http://localhost:3000";

const agentesMock = [
  {
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992-10-04",
    cargo: "delegado",
  },
  {
    nome: "Luciana Farias",
    dataDeIncorporacao: "2005-06-17",
    cargo: "inspetor",
  },
  {
    nome: "Carlos Mendes",
    dataDeIncorporacao: "2010-01-22",
    cargo: "inspetor",
  },
  {
    nome: "Joana Duarte",
    dataDeIncorporacao: "2018-09-11",
    cargo: "delegado",
  },
];

async function popularBase() {
  try {
    // 1. Cria agentes via POST /agentes
    const agentesInseridos = [];
    for (const agente of agentesMock) {
      const res = await axios.post(`${BASE_URL}/agentes`, agente);
      agentesInseridos.push(res.data);
    }

    // 2. Cria casos, associando agente_id reais
    const casosMock = [
      {
        titulo: "Homicídio no bairro União",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: agentesInseridos[0].id,
      },
      {
        titulo: "Roubo a mão armada",
        descricao: "Relato de assalto a uma joalheria no centro da cidade. Câmeras de segurança registraram dois suspeitos encapuzados.",
        status: "solucionado",
        agente_id: agentesInseridos[1].id,
      },
      {
        titulo: "Desaparecimento de menor",
        descricao: "Menina de 12 anos desaparecida desde o dia 03/04/2022. Última aparição foi próxima à escola.",
        status: "aberto",
        agente_id: agentesInseridos[2].id,
      },
      {
        titulo: "Crime ambiental",
        descricao: "Denúncia de despejo irregular de resíduos químicos em área de proteção ambiental.",
        status: "aberto",
        agente_id: agentesInseridos[3].id,
      },
    ];

    for (const caso of casosMock) {
      await axios.post(`${BASE_URL}/casos`, caso);
    }

    console.log("Mock data successfully inserted via API.");
  } catch (error) {
    console.error("Erro ao popular dados via API:", error.response?.data || error.message);
  }
}

popularBase();
