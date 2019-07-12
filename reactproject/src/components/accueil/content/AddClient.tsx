import React, { useState, useEffect } from "react";
import { Modal, Button, Input, AutoComplete, Alert } from "antd";
import axios from "axios";
import "./AddClient.css";

const AddClient: React.FC = () => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const [adresse, setAdress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [email, setEmail] = useState("");
  const [forma, setForma] = useState("");
  const [entre, setEntre] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [listeEntreprisesCfg, setListeEntreprisesCfg] = useState<IEntreprise[]>(
    []
  );
  const [listeEntreprises, setListeEntreprises] = useState<IEntreprise[]>([]);

  const [listeFormationCfg, setListeFormationCfg] = useState<IFormation[]>([]);
  const [listeFormation, setListeFormation] = useState<IFormation[]>([]);

  useEffect(() => {
    getEntreprise();
    getFormation();
  }, []);

  const showModalFn = () => {
    setShowModal(true);
  };
  const hideModalFn = () => {
    setShowModal(false);
  };

  const handleData = () => {
    console.log("oui");
  };

  const onChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMdp(event.target.value);
  };

  const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const onChangeAdresse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdress(event.target.value);
  };

  const onChangeCp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodePostal(event.target.value);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const searchEntrepriseList = (value: string) => {
    if (value.trim() === "") {
      return;
    }
    setListeEntreprises(
      listeEntreprisesCfg.filter(s =>
        s.text.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const searchListeFormation = (value: string) => {
    if (value.trim() === "") {
      return;
    }
    setListeFormation(
      listeFormationCfg.filter(s =>
        s.text.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onSelectForma = (value: any) => {
    setForma(value);
  };

  const onSelectEntre = (value: any) => {
    setEntre(value);
  };

  async function getEntreprise() {
    axios.get("http://127.0.0.1:8000/api/entreprises.json").then(data => {
      setListeEntreprisesCfg(
        data.data.map((m: any, k: any) => ({
          key: m.id,
          value: m.nomEntreprise,
          text: m.nomEntreprise
        }))
      );
    });
  }

  async function getFormation() {
    axios.get("http://127.0.0.1:8000/api/formations.json").then(data => {
      setListeFormationCfg(
        data.data.map((m: any, k: any) => ({
          key: m.id,
          value: m.Titre + " - " + m.Annee,
          text: m.Titre
        }))
      );
    });
  }

  async function addClient() {
    if (
      nom.toString().trim() === "" ||
      mdp.toString().trim() === "" ||
      adresse.toString().trim() === "" ||
      codePostal.toString().trim() === "" ||
      typeof codePostal !== "number" ||
      email.toString().trim() === "" ||
      forma.toString().trim() === "" ||
      entre.toString().trim() === ""
    ) {
      // Erreur dans le formulaire
      setVisibleError(true);
    }

    const idForma = forma
      .toString()
      .split(" - ", 1)
      .toString();

    const idEntre = forma
      .toString()
      .split(" - ", 1)
      .toString();

    const data = {
      Nom: nom.toString(),
      password: mdp.toString(),
      adresse: adresse.toString(),
      codePostal: parseInt(codePostal),
      email: email.toString(),
      Entreprise: "/api/entreprises/" + idEntre,
      Formation: ["/api/formations/" + idForma]
    };
    const addClientPost = axios.post("http://127.0.0.1:8000/api/clients", data);
    setVisibleError(false);
    setVisibleSuccess(true);
    console.log(await addClientPost);
  }
  return (
    <div>
      <Button type="primary" onClick={() => showModalFn()}>
        Ajouter un client
      </Button>
      <Modal
        title="Ajouter un client"
        visible={showModal}
        onOk={handleData}
        onCancel={() => hideModalFn()}
      >
        {visibleError && (
          <Alert
            style={{ marginBottom: "20px" }}
            message="Erreur dans le formulaire"
            type="error"
          />
        )}
        {visibleSuccess && (
          <Alert
            style={{ marginBottom: "20px" }}
            message="Client ajouté"
            type="success"
          />
        )}
        <Input
          value={nom}
          onChange={onChangeNom}
          style={{ marginBottom: "10px" }}
          placeholder="Nom"
        />
        <Input
          value={mdp}
          onChange={onChangePass}
          style={{ marginBottom: "10px" }}
          placeholder="Mot de passe"
          type="password"
        />
        <Input
          value={adresse}
          onChange={onChangeAdresse}
          style={{ marginBottom: "10px" }}
          placeholder="Adresse"
        />
        <Input
          value={codePostal}
          onChange={onChangeCp}
          style={{ marginBottom: "10px" }}
          placeholder="Code postal"
        />
        <Input
          value={email}
          onChange={onChangeEmail}
          style={{ marginBottom: "10px" }}
          placeholder="Email"
        />
        <AutoComplete
          style={{ marginBottom: "10px" }}
          dataSource={listeEntreprises.map((m, k) => m.key + " - " + m.text)}
          onSelect={onSelectEntre}
          onSearch={searchEntrepriseList}
          placeholder="Entreprise"
          defaultValue=""
        />
        <br />
        <AutoComplete
          style={{ marginBottom: "10px" }}
          dataSource={listeFormation.map((m, k) => m.key + " - " + m.value)}
          onSelect={onSelectForma}
          onSearch={searchListeFormation}
          placeholder="Formation"
          defaultValue=""
        />
        <br />
        <Button onClick={() => addClient()} type="primary">
          Ajouter le client
        </Button>
      </Modal>
    </div>
  );
};

export default AddClient;

interface IEntreprise {
  key: number;
  value: string;
  text: string;
}

interface IFormation {
  key: number;
  value: string;
  text: string;
}
