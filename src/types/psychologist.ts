export interface Psychologist {
  id: string;
  name: string;
  profession: string; // "Psicóloga" ou "Psicólogo"
  crp: string;
  photo: string;
  price?: string; // Ex: "R$ 30"
  tags: string[]; // Ex: ["Ansiedade", "Depressão", "Relacionamentos"]
  approach: string; // Ex: "Fenomenológica-existencial"
  audience: string[]; // Ex: ["Adolescentes", "Adultos", "Idosos"]
  about: string; // Texto completo do "Sobre mim"
  phone: string; // Telefone para WhatsApp (não exibido, só para link)
}
