import React from 'react';
import { Layout } from 'antd';
import './Accueil.css';
import ContentApp from './content/Content';

const { Header, Content, Footer } = Layout;

const Accueil: React.FC = () => {
  return (
    <div>
       <Layout>
        <Header style={{backgroundColor: 'white'}}><h1>CRUD Gestion des formations</h1></Header>
        <Content style={{backgroundColor: 'white'}}><ContentApp/></Content>
        <Footer style={{backgroundColor: 'white'}}>Raphael M., Yoann P. Valentin H.</Footer>
      </Layout>
    </div>
  );
}

export default Accueil;
