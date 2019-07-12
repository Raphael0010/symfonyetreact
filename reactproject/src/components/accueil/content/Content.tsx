import React, { useEffect, useState } from "react";
import "./Content.css";
import { Table, Divider, Spin, Alert } from "antd";
import axios from "axios";
import { ITabClient } from "./interface/ITabClient";
import { ITabEntreprise } from "./interface/ITabEntreprise";
import { ITabFormation } from "./interface/ITabFormation";
import AddClient from "./AddClient";

const { Column } = Table;

const ContentApp: React.FC = () => {
  const [dataTabEntreprise, setDataTabEntreprise] = useState<ITabEntreprise[]>(
    []
  );

  const [dataTabClient, setDataTabClient] = useState<ITabClient[]>([]);

  const [loaderClient, setLoaderClient] = useState(true);
  const [loaderFormation, setLoaderFormation] = useState(true);
  const [loaderEntreprise, setLoaderEntreprise] = useState(true);

  const [deleteSucces, setDeleteSucces] = useState(false);

  const [dataTabFormation, setDataTabFormation] = useState<ITabFormation[]>([]);

  async function getEntreprises() {
    axios
      .get("http://127.0.0.1:8000/api/entreprises.json")
      .then(data => {
        setDataTabEntreprise([
          ...data.data.map((m: any, k: any) => ({
            key: m.id,
            id_entreprise: m.id,
            nomEntreprise: m.nomEntreprise,
            siret: m.Siret
          }))
        ]);
        setLoaderEntreprise(false);
      })
      .catch(err => {
        getEntreprises();
        console.log(err);
      });
  }

  async function getClients() {
    const data = await axios.get("http://127.0.0.1:8000/api/clients.json");

    const x = data.data.map(async (m: any, k: any) => ({
      key: m.id,
      id_client: m.id,
      nom: m.Nom,
      adresse: m.adresse,
      codepostal: m.codePostal,
      email: m.email,
      entreprise: m.Entreprise ? await getEntreprise(m.Entreprise) : "",
      formation: m.Formation
        ? await Promise.all(m.Formation.map(getFormation))
        : ""
    }));
    setDataTabClient(await Promise.all(x));
    setLoaderClient(false);
  }

  async function getEntreprise(url: string) {
    const data = await axios.get("http://127.0.0.1:8000" + url + ".json");
    return data.data.nomEntreprise;
  }

  async function getFormation(url: string) {
    const data = await axios.get("http://127.0.0.1:8000" + url + ".json");
    return " " + data.data.Titre + "-" + data.data.Annee;
  }

  async function getFormations() {
    axios
      .get("http://127.0.0.1:8000/api/formations.json")
      .then(data => {
        setDataTabFormation([
          ...data.data.map((m: any, k: any) => ({
            key: m.id,
            id_formation: m.id,
            titre: m.Titre,
            annee: m.Annee
          }))
        ]);
        setLoaderFormation(false);
      })
      .catch(err => {
        getFormations();
        console.log(err);
      });
  }

  useEffect(() => {
    getEntreprises();
    getClients();
    getFormations();
  }, []);

  const deleteClient = (param1: any) => {
    axios
      .delete("http://127.0.0.1:8000/api/clients/" + param1.id_client)
      .then(data => {
        setDeleteSucces(true);
      });
  };

  return (
    <div className="crud">
      <div className="tabClient">
        <Divider>Client</Divider>
        {loaderClient && (
          <Spin tip="Trying to fetch data...">
            <Table bordered>
              <Column title="Id" dataIndex="id_client" key="id_client" />
              <Column title="Nom" dataIndex="nom" key="nom" />
              <Column title="Adresse" dataIndex="adresse" key="adresse" />
              <Column
                title="Codepostal"
                dataIndex="codepostal"
                key="codepostal"
              />
              <Column title="Email" dataIndex="email" key="email" />
              <Column
                title="Entreprise"
                dataIndex="entreprise"
                key="entreprise"
              />
              <Column title="Formation" dataIndex="formation" key="formation" />
            </Table>
          </Spin>
        )}
        {loaderClient === false && (
          <div>
            {deleteSucces && (
              <Alert
                style={{ marginBottom: "20px" }}
                message="Suppresion effectuée"
                type="success"
              />
            )}

            <Table bordered dataSource={dataTabClient}>
              <Column title="Id" dataIndex="id_client" key="id_client" />
              <Column title="Nom" dataIndex="nom" key="nom" />
              <Column title="Adresse" dataIndex="adresse" key="adresse" />
              <Column
                title="Codepostal"
                dataIndex="codepostal"
                key="codepostal"
              />
              <Column title="Email" dataIndex="email" key="email" />
              <Column
                title="Entreprise"
                dataIndex="entreprise"
                key="entreprise"
              />
              <Column title="Formation" dataIndex="formation" key="formation" />
              <Column
                title="Action"
                render={(text, record) => (
                  <span>
                    <a onClick={() => deleteClient(text)} href="javascript:;">
                      Supprimer
                    </a>
                  </span>
                )}
              />
            </Table>
          </div>
        )}
        {loaderClient === false && <AddClient />}
      </div>
      <Divider>Entreprises</Divider>
      <div className="tabEntreprise">
        {loaderEntreprise && (
          <Spin tip="Trying to fetch data...">
            <Table bordered>
              <Column
                title="Id"
                dataIndex="id_entreprise"
                key="id_entreprise"
              />
              <Column
                title="Nom"
                dataIndex="nomEntreprise"
                key="nomEntreprise"
              />
              <Column title="Siret" dataIndex="siret" key="siret" />
            </Table>
          </Spin>
        )}
        {loaderEntreprise === false && (
          <Table dataSource={dataTabEntreprise} bordered>
            <Column title="Id" dataIndex="id_entreprise" key="id_entreprise" />
            <Column title="Nom" dataIndex="nomEntreprise" key="nomEntreprise" />
            <Column title="Siret" dataIndex="siret" key="siret" />
          </Table>
        )}
      </div>
      <Divider>Formations</Divider>
      <div className="tabFormation">
        {loaderFormation && (
          <Spin tip="Trying to fetch data...">
            <Table bordered>
              <Column title="Id" dataIndex="id_formation" key="id_formation" />
              <Column title="Titre" dataIndex="titre" key="titre" />
              <Column title="Année" dataIndex="annee" key="annee" />
            </Table>
          </Spin>
        )}
        {loaderFormation === false && (
          <Table dataSource={dataTabFormation} bordered>
            <Column title="Id" dataIndex="id_formation" key="id_formation" />
            <Column title="Titre" dataIndex="titre" key="titre" />
            <Column title="Année" dataIndex="annee" key="annee" />
          </Table>
        )}
      </div>
    </div>
  );
};

export default ContentApp;
