import React, { useEffect, useState } from "react";
import "./Content.css";
import { Table, Divider } from "antd";
import axios from "axios";
import { ITabClient } from "./interface/ITabClient";
import { ITabEntreprise } from "./interface/ITabEntreprise";
import { ITabFormation } from "./interface/ITabFormation";

const { Column } = Table;

const ContentApp: React.FC = () => {
  const [dataTabEntreprise, setDataTabEntreprise] = useState<ITabEntreprise[]>(
    []
  );

  const [dataTabClient, setDataTabClient] = useState<ITabClient[]>([]);

  const [dataTabFormation, setDataTabFormation] = useState<ITabFormation[]>([]);

  async function getEntreprises() {
    axios.get("http://10.173.128.193:8080/api/entreprises").then(data => {
      setDataTabEntreprise([
        ...dataTabEntreprise,
        {
          key: data.data["hydra:member"][0].id,
          id_entreprise: data.data["hydra:member"][0].id,
          nomEntreprise: data.data["hydra:member"][0].nomEntreprise,
          siret: data.data["hydra:member"][0].Siret
        }
      ]);
    });
  }

  async function getClients() {
    axios.get("http://10.173.128.193:8080/api/clients").then(data => {
      setDataTabClient([
        ...dataTabClient,
        {
          key: data.data["hydra:member"][0].id,
          id_client: data.data["hydra:member"][0].id,
          nom: data.data["hydra:member"][0].Nom,
          adresse: data.data["hydra:member"][0].adresse,
          codepostal: data.data["hydra:member"][0].codePostal,
          email: data.data["hydra:member"][0].email
        }
      ]);
    });
  }

  async function getFormations() {
    axios.get("http://10.173.128.193:8080/api/formations").then(data => {
      setDataTabFormation([
        ...dataTabFormation,
        {
          key: data.data["hydra:member"][0].id,
          id_formation: data.data["hydra:member"][0].id,
          titre: data.data["hydra:member"][0].Titre,
          annee: data.data["hydra:member"][0].Annee
        }
      ]);
    });
  }

  useEffect(() => {
    getEntreprises();
    getClients();
    getFormations();
  }, []);

  return (
    <div className="crud">
      <div className="tabClient">
        <h2 style={{ textAlign: "center" }}>Clients</h2>
        <Table dataSource={dataTabClient}>
          <Column title="Id" dataIndex="id_client" key="id_client" />
          <Column title="Nom" dataIndex="nom" key="nom" />
          <Column title="Adresse" dataIndex="adresse" key="adresse" />
          <Column title="Codepostal" dataIndex="codepostal" key="codepostal" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Entreprise" dataIndex="entreprise" key="entreprise" />
          <Column title="Formation" dataIndex="formation" key="formation" />
        </Table>
      </div>
      <Divider />
      <div className="tabEntreprise">
        <h2 style={{ textAlign: "center" }}>Entreprises</h2>
        <Table dataSource={dataTabEntreprise}>
          <Column title="Id" dataIndex="id_entreprise" key="id_entreprise" />
          <Column title="Nom" dataIndex="nomEntreprise" key="nomEntreprise" />
          <Column title="Siret" dataIndex="siret" key="siret" />
        </Table>
      </div>
      <Divider />
      <div className="tabFormation">
        <h2 style={{ textAlign: "center" }}>Formations</h2>
        <Table dataSource={dataTabFormation}>
          <Column title="Id" dataIndex="id_formation" key="id_formation" />
          <Column title="Titre" dataIndex="titre" key="titre" />
          <Column title="Année" dataIndex="annee" key="annee" />
        </Table>
      </div>
    </div>
  );
};

export default ContentApp;
