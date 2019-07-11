import React from 'react';
import './Content.css';
import {Table, Divider } from 'antd';

const { Column } = Table;


const dataTabClient = [
    {
      id: '1',
      nom: 'Valentin Halay',
      adresse: 'Chartres',
      codepostal: '36000',
      email: 'valentinlefou@lemailchaud.fr',
      entreprise: 'Colis',
      formation: 'CESI'
    }
  ];
  const dataTabEntreprise = [
    {
      id: '1',
      nomEntreprise: 'Colis',
      Siret: '0125846-54'
    }
  ];
  const dataTabFormation = [
    {
      id: '1',
      titre: 'RIL',
      annee: '2004'
    }
  ];
  
const ContentApp: React.FC = () => {
  return (
    <div className="crud">
        <div className="tabClient">
            <h2 style={{textAlign: 'center'}}>Clients</h2>
            <Table dataSource={dataTabClient}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="Nom" dataIndex="nom" key="nom" />
                <Column title="Adresse" dataIndex="adresse" key="adresse" />
                <Column title="Codepostal" dataIndex="codepostal" key="codepostal" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Entreprise" dataIndex="entreprise" key="entreprise" />
                <Column title="Formation" dataIndex="formation" key="formation" />
            </Table>  
        </div> 
        <Divider/>
        <div className="tabEntreprise">
        <h2 style={{textAlign: 'center'}}>Entreprises</h2>
            <Table dataSource={dataTabEntreprise}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="Nom" dataIndex="nomEntreprise" key="nomEntreprise" />
                <Column title="Siret" dataIndex="Siret" key="Siret" />              
            </Table>  
        </div>   
        <Divider/>
        <div className="tabFormation">
        <h2 style={{textAlign: 'center'}}>Formations</h2>
            <Table dataSource={dataTabFormation}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="Titre" dataIndex="titre" key="titre" />
                <Column title="Année" dataIndex="annee" key="annee" />              
            </Table>  
        </div> 
    </div>
    
    );
}

export default ContentApp;
