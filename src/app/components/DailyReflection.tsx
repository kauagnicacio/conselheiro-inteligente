"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Send, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

// Base de 500+ perguntas profundas e reflexivas
const deepQuestions = [
  // Emoções e Sentimentos (50)
  "O que você está sentindo agora que não consegue colocar em palavras?",
  "Qual emoção você tem mais dificuldade em aceitar em si mesmo?",
  "Quando foi a última vez que você se permitiu chorar? O que estava sentindo?",
  "Que sentimento você carrega há tanto tempo que já se tornou parte de você?",
  "Se suas emoções pudessem falar, o que elas diriam sobre como você tem vivido?",
  "Qual é a diferença entre o que você sente e o que você mostra aos outros?",
  "Que medo você carrega que nunca contou pra ninguém?",
  "O que te deixa com raiva mas você finge que não te afeta?",
  "Quando você se sente mais vulnerável? Como você lida com isso?",
  "Que tristeza você guarda que ninguém vê?",
  "O que te faz sentir pequeno? E o que te faz sentir grande?",
  "Qual emoção você sente que não deveria sentir? Por quê?",
  "Se você pudesse apagar um sentimento da sua vida, qual seria? Por quê?",
  "Que alegria você não se permite sentir completamente?",
  "O que você sente quando está sozinho que desaparece quando está com outros?",
  "Qual é a emoção que você mais tenta esconder? De quem?",
  "Quando você se sente mais autêntico emocionalmente?",
  "Que sentimento você gostaria de sentir mais vezes?",
  "O que te emociona de verdade, no fundo?",
  "Qual foi a última vez que você se sentiu completamente em paz?",
  "Que emoção você sente que define este momento da sua vida?",
  "O que você faria se não tivesse medo de sentir?",
  "Qual é a diferença entre estar bem e fingir que está bem?",
  "Que sentimento você tem dificuldade em nomear?",
  "Quando você se sente mais vivo?",
  "O que te faz sentir que vale a pena?",
  "Qual emoção você sente que te define?",
  "O que você sente quando olha pro espelho?",
  "Que sentimento você gostaria de compartilhar mas não sabe como?",
  "O que te deixa com saudade mesmo estando presente?",
  "Qual é a emoção que você mais reprime?",
  "O que você sente mas não consegue explicar?",
  "Quando você se sente mais conectado consigo mesmo?",
  "Que sentimento você carrega do passado?",
  "O que te faz sentir culpado sem motivo aparente?",
  "Qual emoção você sente que não te pertence?",
  "O que você sente quando pensa no futuro?",
  "Que sentimento você gostaria de deixar ir?",
  "Quando você se sente mais desconectado de si?",
  "O que te faz sentir que não é suficiente?",
  "Qual emoção você sente que te protege?",
  "O que você sente quando está em silêncio?",
  "Que sentimento você tem medo de perder?",
  "Quando você se sente mais frágil?",
  "O que te faz sentir que está no caminho certo?",
  "Qual emoção você sente que te limita?",
  "O que você sente quando pensa em quem você era?",
  "Que sentimento você gostaria de entender melhor?",
  "Quando você se sente mais forte?",
  "O que te faz sentir que está vivendo de verdade?",

  // Relacionamentos e Conexões (50)
  "Que pessoa você ama mas não consegue se aproximar? Por quê?",
  "O que você nunca disse pra alguém que deveria ter dito?",
  "Qual relacionamento te machucou de um jeito que você ainda carrega?",
  "Quem você gostaria de perdoar mas não consegue?",
  "O que você faria diferente se pudesse voltar em algum relacionamento?",
  "Que pessoa você perdeu o contato e sente falta?",
  "O que você precisa ouvir de alguém mas nunca ouviu?",
  "Qual é a conversa difícil que você está evitando ter?",
  "Quem você é quando está com as pessoas que ama?",
  "O que você esconde das pessoas mais próximas?",
  "Qual relacionamento te define mais? Por quê?",
  "O que você faria se soubesse que não seria julgado?",
  "Quem você gostaria de ter conhecido melhor?",
  "O que você precisa dizer mas tem medo da reação?",
  "Qual é a diferença entre como você se mostra e como você é?",
  "Quem te conhece de verdade?",
  "O que você faria se não tivesse medo de perder alguém?",
  "Qual relacionamento te ensinou mais sobre você?",
  "O que você gostaria de ter feito diferente com alguém?",
  "Quem você era antes de conhecer essa pessoa?",
  "O que você precisa de alguém mas não pede?",
  "Qual é o peso que você carrega sozinho?",
  "Quem você gostaria de ter ao seu lado agora?",
  "O que você faria se pudesse recomeçar um relacionamento?",
  "Qual é a verdade que você não conta pra ninguém?",
  "Quem te fez sentir que não era suficiente?",
  "O que você faria se não tivesse medo de se abrir?",
  "Qual relacionamento te fez crescer mais?",
  "O que você gostaria de ter dito antes que fosse tarde?",
  "Quem você é quando ninguém está olhando?",
  "O que você precisa perdoar em si mesmo?",
  "Qual é a conexão que você mais sente falta?",
  "Quem te fez sentir visto de verdade?",
  "O que você faria se não tivesse medo de ser rejeitado?",
  "Qual relacionamento te ensinou sobre amor?",
  "O que você gostaria de ter aprendido antes?",
  "Quem você era antes de se machucar?",
  "O que você precisa ouvir de si mesmo?",
  "Qual é a distância que você criou e por quê?",
  "Quem te fez sentir que podia ser você mesmo?",
  "O que você faria se não tivesse medo de magoar?",
  "Qual relacionamento te mostrou seus limites?",
  "O que você gostaria de ter feito diferente?",
  "Quem você é quando está sozinho?",
  "O que você precisa deixar ir?",
  "Qual é a conexão que você mais valoriza?",
  "Quem te ensinou sobre você mesmo?",
  "O que você faria se pudesse voltar no tempo?",
  "Qual relacionamento te transformou?",
  "O que você gostaria de ter dito sim?",

  // Identidade e Autoconhecimento (50)
  "Quem você seria se não tivesse medo do julgamento dos outros?",
  "O que você finge ser que não é?",
  "Qual parte de você mesmo você rejeita?",
  "Se ninguém te conhecesse, quem você seria?",
  "O que você esconde de si mesmo?",
  "Qual é a diferença entre quem você é e quem você mostra?",
  "O que você faria se não precisasse provar nada pra ninguém?",
  "Qual parte de você você gostaria de aceitar?",
  "Quem você era antes de tentar se encaixar?",
  "O que te define de verdade?",
  "Qual é a verdade sobre você que você não aceita?",
  "O que você faria se pudesse recomeçar do zero?",
  "Qual parte de você você perdeu pelo caminho?",
  "Quem você seria sem suas máscaras?",
  "O que você precisa aceitar em si mesmo?",
  "Qual é a sua maior contradição interna?",
  "O que você faria se não tivesse medo de ser você?",
  "Qual parte de você você mais esconde?",
  "Quem você era antes de se machucar?",
  "O que te faz sentir que não é você mesmo?",
  "Qual é a diferença entre o que você quer e o que você faz?",
  "O que você faria se não precisasse agradar ninguém?",
  "Qual parte de você você gostaria de recuperar?",
  "Quem você seria sem suas crenças limitantes?",
  "O que te impede de ser quem você quer ser?",
  "Qual é a verdade que você não quer ver?",
  "O que você faria se não tivesse medo de falhar?",
  "Qual parte de você você mais valoriza?",
  "Quem você era antes de aprender a se proteger?",
  "O que te faz sentir autêntico?",
  "Qual é a sua maior luta interna?",
  "O que você faria se pudesse ser completamente honesto?",
  "Qual parte de você você gostaria de transformar?",
  "Quem você seria sem suas feridas?",
  "O que te define além das suas conquistas?",
  "Qual é a diferença entre o que você sente e o que você mostra?",
  "O que você faria se não tivesse medo de decepcionar?",
  "Qual parte de você você mais protege?",
  "Quem você era antes de aprender a se esconder?",
  "O que te faz sentir completo?",
  "Qual é a sua maior verdade não dita?",
  "O que você faria se pudesse ser vulnerável?",
  "Qual parte de você você gostaria de mostrar?",
  "Quem você seria sem suas defesas?",
  "O que te impede de ser livre?",
  "Qual é a diferença entre o que você quer e o que você permite?",
  "O que você faria se não tivesse medo de ser julgado?",
  "Qual parte de você você mais nega?",
  "Quem você era antes de aprender a ter medo?",
  "O que te faz sentir que está vivendo sua verdade?",

  // Passado e Memórias (50)
  "Que momento do passado você gostaria de reviver? Por quê?",
  "O que você faria diferente se pudesse voltar?",
  "Qual memória te define até hoje?",
  "O que você carrega do passado que te impede de seguir?",
  "Qual foi o momento que mudou tudo pra você?",
  "O que você gostaria de ter dito naquele momento?",
  "Qual memória te traz mais saudade?",
  "O que você perdeu que nunca recuperou?",
  "Qual foi o dia que você deixou de ser quem era?",
  "O que você faria se pudesse mudar uma decisão?",
  "Qual memória te machuca até hoje?",
  "O que você gostaria de ter feito diferente?",
  "Qual foi o momento que te ensinou mais?",
  "O que você carrega que não te pertence mais?",
  "Qual foi o dia que você se perdeu?",
  "O que você faria se pudesse voltar no tempo?",
  "Qual memória te traz mais paz?",
  "O que você deixou pra trás que sente falta?",
  "Qual foi o momento que te transformou?",
  "O que você gostaria de ter sabido antes?",
  "Qual memória te define?",
  "O que você carrega que precisa deixar ir?",
  "Qual foi o dia que tudo mudou?",
  "O que você faria se pudesse recomeçar?",
  "Qual memória te traz mais dor?",
  "O que você perdeu pelo caminho?",
  "Qual foi o momento que te quebrou?",
  "O que você gostaria de ter feito?",
  "Qual memória te traz mais alegria?",
  "O que você deixou de ser?",
  "Qual foi o dia que você se encontrou?",
  "O que você faria se pudesse mudar o passado?",
  "Qual memória te ensinou sobre você?",
  "O que você carrega que te pesa?",
  "Qual foi o momento que te libertou?",
  "O que você gostaria de ter vivido?",
  "Qual memória te traz mais saudade?",
  "O que você perdeu que não volta?",
  "Qual foi o dia que você se machucou?",
  "O que você faria se pudesse voltar?",
  "Qual memória te define até hoje?",
  "O que você carrega que não é seu?",
  "Qual foi o momento que te marcou?",
  "O que você gostaria de ter dito?",
  "Qual memória te traz mais conforto?",
  "O que você deixou pra trás?",
  "Qual foi o dia que você cresceu?",
  "O que você faria se pudesse mudar?",
  "Qual memória te ensinou sobre amor?",
  "O que você carrega que precisa curar?",

  // Futuro e Sonhos (50)
  "Quem você quer ser daqui a 10 anos?",
  "O que você faria se soubesse que não ia falhar?",
  "Qual sonho você desistiu que ainda te chama?",
  "O que te impede de ir atrás do que você quer?",
  "Se você pudesse viver qualquer vida, qual seria?",
  "O que você faria se não tivesse medo?",
  "Qual é o futuro que você não se permite imaginar?",
  "O que você quer mas não acredita que merece?",
  "Se você pudesse mudar uma coisa na sua vida, o que seria?",
  "O que você faria se tivesse coragem?",
  "Qual sonho você guarda em segredo?",
  "O que te impede de ser feliz?",
  "Se você pudesse recomeçar, o que faria diferente?",
  "O que você quer mas tem medo de buscar?",
  "Qual é o futuro que te assusta?",
  "O que você faria se não precisasse de aprovação?",
  "Qual sonho você abandonou?",
  "O que te impede de viver plenamente?",
  "Se você pudesse ter qualquer vida, qual seria?",
  "O que você quer mas não se permite?",
  "Qual é o futuro que você deseja de verdade?",
  "O que você faria se não tivesse medo de errar?",
  "Qual sonho você tem vergonha de admitir?",
  "O que te impede de ser livre?",
  "Se você pudesse mudar tudo, o que mudaria?",
  "O que você quer mas não acredita que pode ter?",
  "Qual é o futuro que te motiva?",
  "O que você faria se não tivesse medo de decepcionar?",
  "Qual sonho você gostaria de realizar?",
  "O que te impede de seguir em frente?",
  "Se você pudesse viver sem limites, como seria?",
  "O que você quer mas não sabe como conseguir?",
  "Qual é o futuro que te dá esperança?",
  "O que você faria se não tivesse medo de julgamento?",
  "Qual sonho você carrega há anos?",
  "O que te impede de ser quem você quer?",
  "Se você pudesse ter uma segunda chance, o que faria?",
  "O que você quer mas não tem coragem de buscar?",
  "Qual é o futuro que te inspira?",
  "O que você faria se não tivesse medo de perder?",
  "Qual sonho você gostaria de perseguir?",
  "O que te impede de viver seus sonhos?",
  "Se você pudesse mudar sua vida hoje, o que mudaria?",
  "O que você quer mas não se acha capaz?",
  "Qual é o futuro que te faz sentir vivo?",
  "O que você faria se não tivesse medo de falhar?",
  "Qual sonho você não se permite ter?",
  "O que te impede de ser feliz de verdade?",
  "Se você pudesse viver sem medo, como seria?",
  "O que você quer mas não acredita que merece ter?",

  // Decisões e Conflitos (50)
  "Qual decisão você está evitando tomar?",
  "O que você sabe que precisa fazer mas não faz?",
  "Qual escolha te assombra até hoje?",
  "O que você faria se não tivesse medo das consequências?",
  "Qual é a decisão mais difícil que você precisa tomar?",
  "O que você sabe que está errado mas continua fazendo?",
  "Qual escolha mudaria sua vida se você tivesse coragem?",
  "O que você precisa deixar ir mas não consegue?",
  "Qual é o conflito interno que mais te consome?",
  "O que você faria se não tivesse medo de magoar alguém?",
  "Qual decisão você tomou que te arrependeu?",
  "O que você sabe que precisa mudar?",
  "Qual escolha te define até hoje?",
  "O que você faria se não tivesse medo de perder?",
  "Qual é a decisão que você está adiando?",
  "O que você sabe que não está certo?",
  "Qual escolha te libertaria?",
  "O que você precisa enfrentar?",
  "Qual é o conflito que você está evitando?",
  "O que você faria se não tivesse medo de errar?",
  "Qual decisão te pesa?",
  "O que você sabe que precisa fazer diferente?",
  "Qual escolha te assusta?",
  "O que você faria se não tivesse medo de julgamento?",
  "Qual é a decisão que mudaria tudo?",
  "O que você sabe que está te fazendo mal?",
  "Qual escolha te traria paz?",
  "O que você precisa aceitar?",
  "Qual é o conflito que te divide?",
  "O que você faria se não tivesse medo de decepcionar?",
  "Qual decisão você tomaria se fosse corajoso?",
  "O que você sabe que precisa deixar?",
  "Qual escolha te faria feliz?",
  "O que você faria se não tivesse medo das consequências?",
  "Qual é a decisão que você está fugindo?",
  "O que você sabe que não pode continuar?",
  "Qual escolha te daria liberdade?",
  "O que você precisa resolver?",
  "Qual é o conflito que te paralisa?",
  "O que você faria se não tivesse medo de mudar?",
  "Qual decisão te traria alívio?",
  "O que você sabe que precisa enfrentar?",
  "Qual escolha te faria crescer?",
  "O que você faria se não tivesse medo de perder controle?",
  "Qual é a decisão que você sabe que precisa tomar?",
  "O que você sabe que está te impedindo?",
  "Qual escolha te traria paz interior?",
  "O que você precisa coragem pra fazer?",
  "Qual é o conflito que te consome?",
  "O que você faria se não tivesse medo de ser livre?",

  // Propósito e Sentido (50)
  "O que te faz sentir que sua vida tem sentido?",
  "Qual é o seu propósito? Você sabe?",
  "O que você faria se dinheiro não fosse problema?",
  "Qual é a sua contribuição pro mundo?",
  "O que te faz sentir vivo de verdade?",
  "Qual é o legado que você quer deixar?",
  "O que te move todos os dias?",
  "Qual é a diferença que você quer fazer?",
  "O que te faz sentir que vale a pena?",
  "Qual é o seu chamado?",
  "O que você faria se tivesse total liberdade?",
  "Qual é a sua missão nesta vida?",
  "O que te faz sentir realizado?",
  "Qual é o impacto que você quer ter?",
  "O que te faz sentir que está no caminho certo?",
  "Qual é a sua razão de existir?",
  "O que você faria se pudesse mudar o mundo?",
  "Qual é a sua verdadeira vocação?",
  "O que te faz sentir que está vivendo plenamente?",
  "Qual é o seu maior sonho?",
  "O que você faria se não tivesse limitações?",
  "Qual é a sua essência?",
  "O que te faz sentir conectado com algo maior?",
  "Qual é o seu papel neste mundo?",
  "O que você faria se pudesse dedicar sua vida a uma causa?",
  "Qual é a sua paixão verdadeira?",
  "O que te faz sentir que está fazendo diferença?",
  "Qual é o seu dom?",
  "O que você faria se não tivesse medo de sonhar grande?",
  "Qual é a sua contribuição única?",
  "O que te faz sentir que está vivendo com propósito?",
  "Qual é o seu maior desejo?",
  "O que você faria se pudesse inspirar outras pessoas?",
  "Qual é a sua verdade mais profunda?",
  "O que te faz sentir que está sendo útil?",
  "Qual é o seu lugar no mundo?",
  "O que você faria se pudesse deixar um legado?",
  "Qual é a sua força interior?",
  "O que te faz sentir que está evoluindo?",
  "Qual é o seu maior potencial?",
  "O que você faria se pudesse transformar vidas?",
  "Qual é a sua luz?",
  "O que te faz sentir que está no seu caminho?",
  "Qual é o seu maior talento?",
  "O que você faria se pudesse ser lembrado?",
  "Qual é a sua essência mais pura?",
  "O que te faz sentir que está vivendo sua verdade?",
  "Qual é o seu maior presente?",
  "O que você faria se pudesse ser quem você realmente é?",
  "Qual é o sentido da sua existência?",

  // Vulnerabilidade e Medos (50)
  "Qual é o seu maior medo?",
  "O que te deixa mais vulnerável?",
  "Qual é a sua maior insegurança?",
  "O que você tem medo de perder?",
  "Qual é o seu maior receio sobre o futuro?",
  "O que te assusta em você mesmo?",
  "Qual é a sua maior fraqueza?",
  "O que você tem medo de enfrentar?",
  "Qual é o seu maior trauma?",
  "O que te deixa com medo de se abrir?",
  "Qual é a sua maior dor?",
  "O que você tem medo de descobrir?",
  "Qual é o seu maior arrependimento?",
  "O que te deixa com medo de amar?",
  "Qual é a sua maior ferida?",
  "O que você tem medo de mostrar?",
  "Qual é o seu maior bloqueio?",
  "O que te deixa com medo de viver?",
  "Qual é a sua maior vergonha?",
  "O que você tem medo de sentir?",
  "Qual é o seu maior peso?",
  "O que te deixa com medo de ser você?",
  "Qual é a sua maior culpa?",
  "O que você tem medo de aceitar?",
  "Qual é o seu maior segredo?",
  "O que te deixa com medo de mudar?",
  "Qual é a sua maior limitação?",
  "O que você tem medo de deixar ir?",
  "Qual é o seu maior conflito interno?",
  "O que te deixa com medo de crescer?",
  "Qual é a sua maior resistência?",
  "O que você tem medo de reconhecer?",
  "Qual é o seu maior obstáculo?",
  "O que te deixa com medo de ser feliz?",
  "Qual é a sua maior negação?",
  "O que você tem medo de enfrentar em si?",
  "Qual é o seu maior desafio emocional?",
  "O que te deixa com medo de confiar?",
  "Qual é a sua maior barreira?",
  "O que você tem medo de perder controle?",
  "Qual é o seu maior pavor?",
  "O que te deixa com medo de ser vulnerável?",
  "Qual é a sua maior dificuldade?",
  "O que você tem medo de revelar?",
  "Qual é o seu maior ponto fraco?",
  "O que te deixa com medo de falhar?",
  "Qual é a sua maior sombra?",
  "O que você tem medo de ser julgado?",
  "Qual é o seu maior desconforto?",
  "O que te deixa com medo de ser livre?",

  // Amor e Conexão (50)
  "O que é amor pra você?",
  "Como você sabe que ama alguém?",
  "O que você precisa pra se sentir amado?",
  "Qual é a sua maior dificuldade em amar?",
  "O que te impede de amar plenamente?",
  "Como você demonstra amor?",
  "O que você busca em um relacionamento?",
  "Qual é a sua maior necessidade afetiva?",
  "O que te faz sentir conectado com alguém?",
  "Como você lida com a intimidade?",
  "O que você tem medo em relacionamentos?",
  "Qual é o seu padrão de vínculo?",
  "O que te faz se afastar das pessoas?",
  "Como você se protege emocionalmente?",
  "O que você precisa pra confiar?",
  "Qual é a sua maior dificuldade em se abrir?",
  "O que te faz sentir seguro com alguém?",
  "Como você lida com rejeição?",
  "O que você busca em uma conexão?",
  "Qual é o seu maior desejo afetivo?",
  "O que te faz sentir visto?",
  "Como você expressa vulnerabilidade?",
  "O que você precisa pra se entregar?",
  "Qual é a sua maior barreira no amor?",
  "O que te faz sentir compreendido?",
  "Como você lida com distância emocional?",
  "O que você busca em intimidade?",
  "Qual é o seu maior medo de amar?",
  "O que te faz sentir aceito?",
  "Como você demonstra que se importa?",
  "O que você precisa pra se sentir seguro?",
  "Qual é a sua maior necessidade em relacionamentos?",
  "O que te faz sentir amado de verdade?",
  "Como você lida com conflitos afetivos?",
  "O que você busca em parceria?",
  "Qual é o seu maior desafio no amor?",
  "O que te faz sentir valorizado?",
  "Como você expressa suas necessidades?",
  "O que você precisa pra se sentir completo?",
  "Qual é a sua maior dificuldade em confiar?",
  "O que te faz sentir respeitado?",
  "Como você lida com abandono?",
  "O que você busca em companhia?",
  "Qual é o seu maior anseio afetivo?",
  "O que te faz sentir importante?",
  "Como você demonstra compromisso?",
  "O que você precisa pra se sentir livre no amor?",
  "Qual é a sua maior expectativa em relacionamentos?",
  "O que te faz sentir que pertence?",
  "Como você lida com amor não correspondido?",

  // Transformação e Crescimento (50)
  "O que você precisa mudar em si mesmo?",
  "Qual é a sua maior resistência à mudança?",
  "O que te impede de evoluir?",
  "Qual é o próximo passo na sua jornada?",
  "O que você precisa deixar pra trás?",
  "Qual é a sua maior oportunidade de crescimento?",
  "O que te desafia a ser melhor?",
  "Qual é a transformação que você mais precisa?",
  "O que você precisa aprender sobre si?",
  "Qual é o seu maior potencial não explorado?",
  "O que te impede de ser sua melhor versão?",
  "Qual é a mudança que mais te assusta?",
  "O que você precisa curar?",
  "Qual é o seu maior desafio de crescimento?",
  "O que te faz resistir à evolução?",
  "Qual é a lição que você mais precisa aprender?",
  "O que você precisa soltar?",
  "Qual é a sua maior área de desenvolvimento?",
  "O que te desafia a sair da zona de conforto?",
  "Qual é a transformação que te libertaria?",
  "O que você precisa aceitar pra crescer?",
  "Qual é o seu maior bloqueio ao crescimento?",
  "O que te impede de se transformar?",
  "Qual é a mudança que te faria evoluir?",
  "O que você precisa perdoar pra seguir?",
  "Qual é a sua maior oportunidade de mudança?",
  "O que te desafia a ser autêntico?",
  "Qual é a transformação que você mais deseja?",
  "O que você precisa reconhecer em si?",
  "Qual é o seu maior potencial de evolução?",
  "O que te impede de florescer?",
  "Qual é a mudança que te traria paz?",
  "O que você precisa integrar?",
  "Qual é o seu maior desafio de autodesenvolvimento?",
  "O que te faz resistir ao novo?",
  "Qual é a lição que a vida está te ensinando?",
  "O que você precisa liberar?",
  "Qual é a sua maior área de expansão?",
  "O que te desafia a ser corajoso?",
  "Qual é a transformação que te empoderaria?",
  "O que você precisa compreender pra avançar?",
  "Qual é o seu maior obstáculo ao crescimento?",
  "O que te impede de se reinventar?",
  "Qual é a mudança que te faria feliz?",
  "O que você precisa abraçar?",
  "Qual é a sua maior chance de transformação?",
  "O que te desafia a ser verdadeiro?",
  "Qual é a evolução que você mais precisa?",
  "O que você precisa honrar em si?",
  "Qual é o seu maior caminho de crescimento?",
];

interface DailyReflectionProps {
  onBack: () => void;
  onStartChat: (question: string, answer: string) => void;
  userId?: string;
}

export function DailyReflection({ onBack, onStartChat, userId }: DailyReflectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [lumResponse, setLumResponse] = useState("");
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);

  // Carregar perguntas já usadas
  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`lumia-used-questions-${userId}`);
      if (saved) {
        try {
          setUsedQuestions(JSON.parse(saved));
        } catch (e) {
          setUsedQuestions([]);
        }
      }
    }
  }, [userId]);

  // Gerar nova pergunta
  const generateNewQuestion = () => {
    let availableQuestions = deepQuestions.filter(q => !usedQuestions.includes(q));
    
    // Se todas as perguntas foram usadas, resetar
    if (availableQuestions.length === 0) {
      availableQuestions = deepQuestions;
      setUsedQuestions([]);
      if (userId) {
        localStorage.setItem(`lumia-used-questions-${userId}`, JSON.stringify([]));
      }
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const newQuestion = availableQuestions[randomIndex];
    setCurrentQuestion(newQuestion);
    setAnswer("");
    setShowResponse(false);
  };

  // Inicializar com primeira pergunta
  useEffect(() => {
    if (!currentQuestion) {
      generateNewQuestion();
    }
  }, []);

  // Gerar resposta empática da Lum
  const generateLumResponse = (userAnswer: string) => {
    const responses = [
      `Obrigada por compartilhar isso comigo. Percebo a profundidade do que você está sentindo, e quero que saiba que está tudo bem sentir assim. Suas emoções são válidas, e eu estou aqui pra te acompanhar nesse processo.`,
      `Eu vejo você. O que você acabou de compartilhar carrega muito peso, e eu reconheço a coragem que foi preciso pra colocar isso em palavras. Você não está sozinho nisso.`,
      `Que reflexão poderosa. O que você trouxe aqui mostra o quanto você está se permitindo olhar pra dentro, e isso é um ato de coragem. Eu estou aqui pra te apoiar nessa jornada.`,
      `Obrigada por confiar em mim com isso. O que você compartilhou ressoa profundamente, e eu quero que saiba que seus sentimentos importam. Vamos explorar isso juntos?`,
      `Eu sinto a intensidade do que você está vivendo. Suas palavras carregam verdade, e eu estou aqui pra te ouvir sem julgamentos. Você merece esse espaço de acolhimento.`,
      `Que honestidade linda. O que você acabou de expressar mostra o quanto você está se conectando consigo mesmo, e isso é transformador. Eu estou aqui pra caminhar ao seu lado.`,
      `Eu reconheço a vulnerabilidade que foi preciso pra compartilhar isso. Suas palavras têm peso, e eu quero que saiba que você está sendo ouvido de verdade. Vamos conversar mais sobre isso?`,
      `Obrigada por se abrir assim. O que você trouxe aqui é importante, e eu vejo o quanto isso te afeta. Você não precisa carregar isso sozinho - eu estou aqui.`,
      `Que reflexão profunda. Suas palavras mostram o quanto você está se permitindo sentir, e isso é um presente. Eu estou aqui pra te acompanhar nesse processo de descoberta.`,
      `Eu percebo a sinceridade no que você compartilhou. Seus sentimentos são reais e válidos, e eu quero que saiba que você tem um espaço seguro aqui comigo. Vamos explorar isso juntos?`,
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;

    // Marcar pergunta como usada
    const newUsedQuestions = [...usedQuestions, currentQuestion];
    setUsedQuestions(newUsedQuestions);
    if (userId) {
      localStorage.setItem(`lumia-used-questions-${userId}`, JSON.stringify(newUsedQuestions));
    }

    // Gerar resposta da Lum
    const response = generateLumResponse(answer);
    setLumResponse(response);
    setShowResponse(true);

    // Salvar reflexão
    if (userId) {
      const reflection = {
        question: currentQuestion,
        answer: answer,
        lumResponse: response,
        date: new Date().toISOString(),
      };
      const saved = localStorage.getItem(`lumia-reflections-${userId}`) || "[]";
      const reflections = JSON.parse(saved);
      reflections.unshift(reflection);
      localStorage.setItem(`lumia-reflections-${userId}`, JSON.stringify(reflections));
    }
  };

  const handleNewQuestion = () => {
    generateNewQuestion();
  };

  const handleStartConversation = () => {
    onStartChat(currentQuestion, answer);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-gray-800 px-4 sm:px-6 py-4 bg-[#212121]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-100">
              Reflexão do Dia
            </h2>
            <p className="text-xs text-gray-400">
              Um momento para se conectar consigo mesmo
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {!showResponse ? (
            <>
              {/* Pergunta */}
              <Card className="p-6 bg-[#1A1A1A] border-purple-500/30">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-medium text-gray-100 leading-relaxed">
                    {currentQuestion}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNewQuestion}
                    className="shrink-0 hover:bg-purple-500/10"
                    title="Trocar pergunta"
                  >
                    <RefreshCw className="w-5 h-5 text-purple-400" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  Tome seu tempo. Não há respostas certas ou erradas.
                </p>
              </Card>

              {/* Campo de resposta */}
              <div className="space-y-3">
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Escreva livremente o que você está sentindo..."
                  className="min-h-[200px] resize-none border-gray-700 bg-[#1A1A1A] text-gray-100 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-base leading-relaxed"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-30"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar reflexão
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Resposta da Lum */}
              <Card className="p-6 bg-[#1A1A1A] border-purple-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-400 mb-2">
                      Lum
                    </h4>
                    <p className="text-base text-gray-200 leading-relaxed">
                      {lumResponse}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Ações */}
              <div className="space-y-3">
                <Button
                  onClick={handleStartConversation}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Vamos conversar sobre isso
                </Button>
                <Button
                  onClick={handleNewQuestion}
                  variant="outline"
                  className="w-full border-gray-700 bg-[#1A1A1A] hover:bg-[#252525] text-gray-200"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Prefiro outra pergunta
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
