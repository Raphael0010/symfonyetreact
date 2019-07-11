export interface ITabClient {
  key: number;
  id_client: number;
  nom: string;
  adresse: string;
  codepostal: number;
  email: string;
  entreprise?: string;
  formation?: string;
}
