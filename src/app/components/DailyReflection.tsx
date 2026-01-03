"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Send, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

// Base de 500+ perguntas profundas e reflexivas
const deepQuestions = [
  // Emoções e Sentimentos Profundos (60)
  "Qual é a emoção que você sente todos os dias mas nunca admitiu em voz alta — nem para si mesmo?",
  "Se você pudesse voltar no tempo e abraçar a versão de você que mais precisava de acolhimento, em que momento da sua vida seria?",
  "Qual verdade sobre você mesmo você esconde até de quem mais te conhece?",
  "O que você sente quando está sozinho à noite que desaparece completamente quando o dia amanhece?",
  "Se suas emoções pudessem escrever uma carta para você, qual seria a primeira frase?",
  "Qual parte de você está pedindo atenção agora, mas você continua ignorando?",
  "O que você faria se soubesse que ninguém jamais julgaria seus sentimentos?",
  "Qual é a dor que você carrega há tanto tempo que já virou parte da sua identidade?",
  "Se você pudesse apagar uma única emoção da sua vida, qual seria — e o que você perderia junto com ela?",
  "Qual sentimento você tem vergonha de admitir que sente?",
  "O que você gostaria de ter coragem de sentir sem se culpar depois?",
  "Qual é a diferença entre o que você sente de verdade e o que você permite que os outros vejam?",
  "Se você pudesse dar voz ao que está guardado no fundo do peito, o que sairia primeiro?",
  "Qual emoção você sente que não deveria sentir — e por que você acha isso?",
  "O que você está sentindo agora que não consegue nomear, mas sabe que está aí?",
  "Se você pudesse chorar livremente sobre uma coisa sem ser julgado, sobre o que seria?",
  "Qual é o medo que você carrega em silêncio porque tem vergonha de admitir que ele existe?",
  "O que te deixa com raiva mas você finge que não te afeta porque 'não deveria' te incomodar?",
  "Qual parte de você está cansada de fingir que está tudo bem?",
  "Se você pudesse gritar uma verdade sobre como você se sente, o que seria?",
  "Qual sentimento você reprime porque aprendeu que ele 'não é aceitável'?",
  "O que você sentiria se permitisse a si mesmo ser completamente vulnerável por um dia inteiro?",
  "Qual é a emoção que você mais tenta controlar — e o que aconteceria se você a deixasse fluir?",
  "Se você pudesse voltar e validar um sentimento que foi invalidado no passado, qual seria?",
  "O que você sente quando olha no espelho e ninguém está olhando?",
  "Qual é a tristeza que você carrega que ninguém vê porque você sorri por cima?",
  "Se você pudesse sentir algo sem consequências, o que seria?",
  "Qual parte de você está pedindo para ser vista, mas você continua escondendo?",
  "O que você sentiria se soubesse que é completamente normal sentir o que você sente?",
  "Qual é a emoção que você mais julga em si mesmo?",
  "Se você pudesse dar um abraço em uma emoção sua, qual seria e o que você diria para ela?",
  "O que você está sentindo agora que gostaria de poder compartilhar sem medo?",
  "Qual sentimento você carrega que não é seu, mas de alguém que te passou isso?",
  "Se você pudesse liberar uma emoção reprimida, qual seria e como você se sentiria depois?",
  "O que você sente quando pensa em ser completamente honesto sobre suas emoções?",
  "Qual é a emoção que você mais evita porque tem medo do que ela vai revelar sobre você?",
  "Se você pudesse sentir paz por um momento, o que precisaria soltar primeiro?",
  "O que você sente quando está sozinho que te assusta?",
  "Qual parte de você está gritando por dentro enquanto você sorri por fora?",
  "Se você pudesse validar um sentimento que sempre foi minimizado, qual seria?",
  "O que você sentiria se permitisse a si mesmo ser 'fraco' por um dia?",
  "Qual é a emoção que você sente que te define — e você gostaria que não definisse?",
  "Se você pudesse sentir algo sem se culpar depois, o que seria?",
  "O que você está sentindo agora que precisa ser dito, mas você não sabe para quem dizer?",
  "Qual sentimento você carrega que te impede de viver plenamente?",
  "Se você pudesse chorar sobre algo sem se sentir fraco, sobre o que seria?",
  "O que você sente quando pensa em ser completamente autêntico com suas emoções?",
  "Qual é a emoção que você mais tenta esconder — e o que ela está tentando te dizer?",
  "Se você pudesse sentir algo sem medo de ser julgado, o que seria?",
  "O que você sentiria se soubesse que suas emoções são válidas exatamente como são?",
  "Qual parte de você está cansada de ser forte?",
  "Se você pudesse dar permissão para sentir algo, o que seria?",
  "O que você está sentindo agora que gostaria de poder gritar?",
  "Qual sentimento você carrega que te pesa mais do que você admite?",
  "Se você pudesse sentir algo sem consequências emocionais, o que seria?",
  "O que você sente quando pensa em ser vulnerável de verdade?",
  "Qual é a emoção que você mais tenta controlar — e o que aconteceria se você a soltasse?",
  "Se você pudesse sentir paz interior por um momento, o que precisaria aceitar primeiro?",
  "O que você está sentindo agora que precisa ser reconhecido?",
  "Qual parte de você está pedindo para ser amada, mas você continua rejeitando?",

  // Relacionamentos e Conexões Profundas (60)
  "Se você tivesse 30 segundos com a pessoa que mais te machucou, o que finalmente diria?",
  "Qual é a verdade que você nunca disse para alguém que ama porque tem medo da reação?",
  "O que você gostaria de ter dito para alguém antes que fosse tarde demais?",
  "Se você pudesse voltar e mudar uma única conversa que teve, qual seria e o que diria diferente?",
  "Qual relacionamento te ensinou que você não era suficiente — e como isso ainda te afeta hoje?",
  "O que você esconde das pessoas mais próximas porque tem medo de que elas te vejam diferente?",
  "Se você pudesse pedir perdão para alguém sem medo de ser rejeitado, quem seria e por quê?",
  "Qual é a conversa difícil que você está evitando ter porque sabe que vai mudar tudo?",
  "O que você faria se soubesse que a pessoa que você ama te aceitaria exatamente como você é?",
  "Qual parte de você morre um pouco quando você está com certas pessoas?",
  "Se você pudesse dizer 'não' para alguém sem culpa, para quem seria e em que situação?",
  "O que você precisa ouvir de alguém mas nunca teve coragem de pedir?",
  "Qual relacionamento te fez acreditar que você precisa ser diferente para ser amado?",
  "Se você pudesse ter uma conversa honesta com alguém do seu passado, quem seria e o que diria?",
  "O que você faria se não tivesse medo de perder alguém ao ser completamente honesto?",
  "Qual é a verdade sobre um relacionamento que você sabe, mas finge não saber?",
  "Se você pudesse voltar e se proteger em um relacionamento, em qual momento seria?",
  "O que você gostaria de ter dito 'sim' para alguém mas disse 'não' por medo?",
  "Qual pessoa te fez sentir que você não era digno de amor — e como isso moldou seus relacionamentos?",
  "Se você pudesse recomeçar um relacionamento sabendo o que sabe hoje, o que faria diferente?",
  "O que você está guardando de alguém porque tem medo de magoar?",
  "Qual é a distância emocional que você criou para se proteger — e o que você perdeu com isso?",
  "Se você pudesse dizer a verdade para alguém sem medo das consequências, o que diria?",
  "O que você faria se soubesse que ser vulnerável não te faria ser rejeitado?",
  "Qual relacionamento te ensinou a esconder quem você realmente é?",
  "Se você pudesse ter uma última conversa com alguém que se foi, o que diria?",
  "O que você precisa perdoar em alguém para finalmente seguir em frente?",
  "Qual é a verdade sobre você que você tem medo de que alguém descubra?",
  "Se você pudesse voltar e escolher diferente em um relacionamento, qual seria a escolha?",
  "O que você faria se não tivesse medo de ser abandonado?",
  "Qual pessoa te conhece de verdade — e o que isso significa para você?",
  "Se você pudesse dizer 'eu te amo' sem medo, para quem seria?",
  "O que você está escondendo de alguém porque tem vergonha?",
  "Qual relacionamento te fez sentir que você precisa ser perfeito para ser aceito?",
  "Se você pudesse ter uma conversa honesta com alguém que te magoou, o que diria?",
  "O que você faria se soubesse que a pessoa te perdoaria?",
  "Qual é a verdade sobre um relacionamento que você não quer aceitar?",
  "Se você pudesse voltar e se defender em uma situação, qual seria?",
  "O que você gostaria de ter dito 'não' para alguém mas disse 'sim' por medo de decepcionar?",
  "Qual pessoa te fez sentir que você era demais — e como isso te afeta hoje?",
  "Se você pudesse recomeçar com alguém, o que faria diferente desde o início?",
  "O que você está guardando porque tem medo de que a verdade mude tudo?",
  "Qual é a conexão que você mais sente falta — e por que você a perdeu?",
  "Se você pudesse dizer a verdade sem medo de perder alguém, o que diria?",
  "O que você faria se soubesse que ser autêntico não te faria ser rejeitado?",
  "Qual relacionamento te ensinou que você não pode confiar?",
  "Se você pudesse ter uma conversa final com alguém, o que diria?",
  "O que você precisa perdoar em si mesmo sobre um relacionamento?",
  "Qual é a verdade que você sabe sobre alguém mas finge não saber?",
  "Se você pudesse voltar e escolher você mesmo em vez de alguém, quando seria?",
  "O que você faria se não tivesse medo de ficar sozinho?",
  "Qual pessoa te fez sentir visto de verdade — e por que você se afastou?",
  "Se você pudesse dizer 'eu preciso de você' sem vergonha, para quem seria?",
  "O que você está escondendo porque tem medo de ser julgado?",
  "Qual relacionamento te fez acreditar que você não merece amor?",
  "Se você pudesse ter uma conversa honesta com alguém que te deixou, o que diria?",
  "O que você faria se soubesse que a pessoa te entenderia?",
  "Qual é a verdade sobre você que você tem medo de que alguém veja?",
  "Se você pudesse voltar e se escolher em um relacionamento, quando seria?",
  "O que você gostaria de ter dito antes de alguém partir?",

  // Identidade e Autoconhecimento Profundo (60)
  "Qual parte de você morreu para que você pudesse se encaixar — e você sente falta dela?",
  "Se ninguém estivesse olhando, quem você realmente seria?",
  "O que você finge ser que está te matando por dentro?",
  "Qual é a verdade sobre você que você tem mais medo de aceitar?",
  "Se você pudesse voltar e dizer 'não' para uma expectativa que te foi imposta, qual seria?",
  "O que você esconde de si mesmo porque tem medo do que vai descobrir?",
  "Qual parte de você você rejeita porque aprendeu que ela não é aceitável?",
  "Se você pudesse ser completamente honesto sobre quem você é, o que mudaria na sua vida?",
  "O que você faria se não precisasse provar nada para ninguém — nem para você mesmo?",
  "Qual é a máscara que você usa há tanto tempo que já esqueceu quem está por baixo?",
  "Se você pudesse voltar e se aceitar em um momento específico, quando seria?",
  "O que você gostaria de ter coragem de ser sem medo do julgamento?",
  "Qual parte de você está gritando para ser vista, mas você continua escondendo?",
  "Se você pudesse viver sem as expectativas dos outros, quem você seria?",
  "O que você faria se não tivesse medo de decepcionar alguém ao ser você mesmo?",
  "Qual é a verdade sobre sua identidade que você sabe, mas não quer aceitar?",
  "Se você pudesse voltar e se defender quando te fizeram sentir que você não era suficiente, o que diria?",
  "O que você esconde porque tem vergonha de quem você realmente é?",
  "Qual parte de você você perdeu tentando ser quem os outros queriam que você fosse?",
  "Se você pudesse ser autêntico por um dia inteiro, o que faria diferente?",
  "O que você faria se não tivesse medo de ser rejeitado por ser quem você é?",
  "Qual é a diferença entre quem você é e quem você mostra para o mundo?",
  "Se você pudesse voltar e se aceitar em vez de se mudar, quando seria?",
  "O que você gostaria de ter coragem de admitir sobre si mesmo?",
  "Qual parte de você você julga mais — e por que você aprendeu a julgá-la?",
  "Se você pudesse viver sem medo de ser 'demais' ou 'de menos', quem você seria?",
  "O que você faria se soubesse que você é suficiente exatamente como é?",
  "Qual é a verdade sobre você que você tem medo de que os outros descubram?",
  "Se você pudesse voltar e se amar em um momento difícil, quando seria?",
  "O que você esconde porque tem medo de que isso defina você?",
  "Qual parte de você você gostaria de recuperar que perdeu pelo caminho?",
  "Se você pudesse ser vulnerável sobre quem você é, o que revelaria?",
  "O que você faria se não tivesse medo de ser visto de verdade?",
  "Qual é a máscara que você mais cansou de usar?",
  "Se você pudesse voltar e se escolher em vez de se adaptar, quando seria?",
  "O que você gostaria de ter coragem de ser sem se desculpar?",
  "Qual parte de você você nega porque tem medo do que ela significa?",
  "Se você pudesse viver sem as crenças limitantes que te foram impostas, quem você seria?",
  "O que você faria se não tivesse medo de ser diferente?",
  "Qual é a verdade sobre sua essência que você não quer ver?",
  "Se você pudesse voltar e se aceitar completamente, quando seria?",
  "O que você esconde porque tem medo de que isso te torne vulnerável?",
  "Qual parte de você você gostaria de abraçar mas continua rejeitando?",
  "Se você pudesse ser honesto sobre quem você é, o que diria?",
  "O que você faria se não tivesse medo de ser autêntico?",
  "Qual é a diferença entre quem você quer ser e quem você permite ser?",
  "Se você pudesse voltar e se validar em vez de se criticar, quando seria?",
  "O que você gostaria de ter coragem de mostrar ao mundo?",
  "Qual parte de você você protege porque tem medo de que ela seja machucada?",
  "Se você pudesse viver sem medo de ser julgado, quem você seria?",
  "O que você faria se soubesse que você é amado exatamente como é?",
  "Qual é a verdade sobre você que você tem medo de aceitar?",
  "Se você pudesse voltar e se defender quando te fizeram sentir pequeno, o que diria?",
  "O que você esconde porque tem medo de que isso te faça ser rejeitado?",
  "Qual parte de você você gostaria de liberar mas continua prendendo?",
  "Se você pudesse ser completamente você mesmo, o que mudaria?",
  "O que você faria se não tivesse medo de ser livre?",
  "Qual é a máscara que você usa para se proteger — e o que você está protegendo?",
  "Se você pudesse voltar e se amar incondicionalmente, quando seria?",
  "O que você gostaria de ter coragem de ser sem medo das consequências?",

  // Passado e Memórias Dolorosas (60)
  "Qual é a memória que você carrega que ainda te machuca quando você pensa nela?",
  "Se você pudesse voltar e abraçar a criança que você foi, o que diria para ela?",
  "O que ficou guardado dentro de você desde aquele dia que mudou tudo?",
  "Qual momento do passado você gostaria de poder apagar — mas sabe que ele te define?",
  "Se você pudesse voltar e se proteger em um momento, qual seria?",
  "O que você carrega do passado que te impede de viver o presente?",
  "Qual é a dor que você nunca superou mas finge que superou?",
  "Se você pudesse voltar e mudar uma decisão que te assombra, qual seria?",
  "O que você perdeu no passado que nunca conseguiu recuperar?",
  "Qual memória te define até hoje — mesmo que você queira que não definisse?",
  "Se você pudesse voltar e dizer algo para alguém que se foi, o que diria?",
  "O que você gostaria de ter feito diferente em um momento que te marcou?",
  "Qual é a ferida do passado que você carrega mas nunca curou?",
  "Se você pudesse voltar e se defender quando te machucaram, o que faria?",
  "O que você carrega do passado que não te pertence mais, mas você não consegue soltar?",
  "Qual momento do passado você revive na sua cabeça quando está sozinho?",
  "Se você pudesse voltar e se escolher em vez de escolher alguém, quando seria?",
  "O que você perdeu de si mesmo em algum momento do passado?",
  "Qual é a memória que te traz mais saudade — e mais dor ao mesmo tempo?",
  "Se você pudesse voltar e se perdoar por algo, o que seria?",
  "O que você gostaria de ter dito 'não' no passado mas disse 'sim'?",
  "Qual momento do passado te ensinou que você não era suficiente?",
  "Se você pudesse voltar e mudar o desfecho de algo, o que seria?",
  "O que você carrega do passado que te pesa todos os dias?",
  "Qual é a dor que você nunca compartilhou com ninguém?",
  "Se você pudesse voltar e se amar em um momento difícil, quando seria?",
  "O que você perdeu no caminho que gostaria de ter guardado?",
  "Qual memória te quebrou de um jeito que você nunca se recuperou completamente?",
  "Se você pudesse voltar e fazer uma escolha diferente, qual seria?",
  "O que você carrega do passado que te impede de confiar?",
  "Qual é o momento que você gostaria de poder reviver — mas sabe que não pode?",
  "Se você pudesse voltar e se proteger de uma dor, qual seria?",
  "O que você gostaria de ter feito diferente com alguém que já não está mais aqui?",
  "Qual memória te ensinou que você precisa se proteger?",
  "Se você pudesse voltar e mudar uma palavra que disse, qual seria?",
  "O que você carrega do passado que te faz ter medo do futuro?",
  "Qual é a dor que você esconde porque tem vergonha de ainda sentir?",
  "Se você pudesse voltar e se validar em vez de se culpar, quando seria?",
  "O que você perdeu no passado que mudou quem você é hoje?",
  "Qual momento do passado te fez acreditar que você não merece ser feliz?",
  "Se você pudesse voltar e se defender quando te fizeram sentir pequeno, o que diria?",
  "O que você carrega do passado que te impede de amar?",
  "Qual é a memória que você gostaria de poder ressignificar?",
  "Se você pudesse voltar e se escolher em um momento, quando seria?",
  "O que você gostaria de ter dito antes que fosse tarde?",
  "Qual memória te ensinou que você não pode confiar nas pessoas?",
  "Se você pudesse voltar e mudar uma reação sua, qual seria?",
  "O que você carrega do passado que te faz se sentir culpado?",
  "Qual é a dor que você nunca deixou ir embora?",
  "Se você pudesse voltar e se perdoar, o que diria para si mesmo?",
  "O que você perdeu no passado que te faz sentir incompleto?",
  "Qual momento do passado te fez acreditar que você não é digno de amor?",
  "Se você pudesse voltar e se proteger emocionalmente, quando seria?",
  "O que você carrega do passado que te impede de ser livre?",
  "Qual é a memória que você gostaria de poder curar?",
  "Se você pudesse voltar e fazer as pazes com algo, o que seria?",
  "O que você gostaria de ter feito diferente que ainda te assombra?",
  "Qual memória te ensinou que você precisa ser forte sempre?",
  "Se você pudesse voltar e se acolher em um momento, quando seria?",
  "O que você carrega do passado que te faz ter medo de ser vulnerável?",

  // Futuro e Sonhos Reprimidos (60)
  "Qual sonho você deixou morrer porque alguém disse que era impossível?",
  "Se você soubesse que não ia falhar, o que faria amanhã?",
  "O que você quer de verdade mas tem medo de admitir até para si mesmo?",
  "Qual é o futuro que você deseja mas não acredita que merece?",
  "Se você pudesse viver qualquer vida sem medo, como seria?",
  "O que te impede de ir atrás do que você realmente quer?",
  "Qual sonho você guarda em segredo porque tem vergonha de admitir?",
  "Se você não tivesse medo de decepcionar ninguém, o que faria?",
  "O que você faria se soubesse que você é capaz?",
  "Qual é o futuro que te assusta porque você realmente quer?",
  "Se você pudesse recomeçar sua vida hoje, o que mudaria?",
  "O que você quer mas não se permite porque acha que não merece?",
  "Qual sonho você abandonou que ainda te chama?",
  "Se você não tivesse medo do julgamento, o que perseguiria?",
  "O que você faria se não precisasse de aprovação de ninguém?",
  "Qual é o futuro que você não se permite imaginar?",
  "Se você pudesse ter qualquer vida, qual seria — e por que você não vai atrás?",
  "O que você quer mas tem medo de buscar porque pode não conseguir?",
  "Qual sonho você tem vergonha de admitir?",
  "Se você não tivesse medo de errar, o que tentaria?",
  "O que você faria se soubesse que você tem tempo?",
  "Qual é o futuro que te dá esperança mas também medo?",
  "Se você pudesse mudar uma coisa na sua vida hoje, o que seria?",
  "O que você quer mas não acredita que pode ter?",
  "Qual sonho você carrega há anos mas nunca perseguiu?",
  "Se você não tivesse medo de perder, o que arriscaria?",
  "O que você faria se não tivesse medo de ser feliz?",
  "Qual é o futuro que te motiva mas você não se permite buscar?",
  "Se você pudesse viver sem limites, o que faria?",
  "O que você quer mas não sabe como conseguir — e isso te paralisa?",
  "Qual sonho você desistiu porque alguém te fez acreditar que você não era capaz?",
  "Se você não tivesse medo das consequências, o que mudaria agora?",
  "O que você faria se soubesse que você merece?",
  "Qual é o futuro que te inspira mas te assusta ao mesmo tempo?",
  "Se você pudesse ter uma segunda chance, o que faria diferente?",
  "O que você quer mas não tem coragem de buscar?",
  "Qual sonho você gostaria de realizar antes de morrer?",
  "Se você não tivesse medo de falhar, o que começaria hoje?",
  "O que você faria se soubesse que você é suficiente?",
  "Qual é o futuro que te faz sentir vivo quando você pensa nele?",
  "Se você pudesse mudar sua vida hoje, por onde começaria?",
  "O que você quer mas não se acha capaz de conquistar?",
  "Qual sonho você não se permite ter porque acha que é tarde demais?",
  "Se você não tivesse medo de ser julgado, o que perseguiria?",
  "O que você faria se soubesse que você tem potencial?",
  "Qual é o futuro que te dá medo porque você realmente quer?",
  "Se você pudesse viver sem medo, como seria sua vida?",
  "O que você quer mas não acredita que merece ter?",
  "Qual sonho você abandonou que ainda te faz sentir vazio?",
  "Se você não tivesse medo de decepcionar, o que faria?",
  "O que você faria se soubesse que você é capaz de mais?",
  "Qual é o futuro que te faz sentir esperança?",
  "Se você pudesse recomeçar, o que faria diferente desde o início?",
  "O que você quer mas tem medo de que mude tudo?",
  "Qual sonho você tem medo de perseguir porque pode dar certo?",
  "Se você não tivesse medo de ser feliz, o que mudaria?",
  "O que você faria se soubesse que você merece ser feliz?",
  "Qual é o futuro que te faz sentir que vale a pena?",
  "Se você pudesse viver plenamente, o que faria hoje?",
  "O que você quer mas não se permite porque acha que não é para você?",

  // Decisões e Conflitos Internos (60)
  "Qual decisão você está evitando porque sabe que vai mudar tudo?",
  "Se você não tivesse medo das consequências, o que decidiria agora?",
  "O que você sabe que precisa fazer mas continua adiando?",
  "Qual escolha te assombra até hoje porque você sabe que escolheu errado?",
  "Se você pudesse voltar e tomar uma decisão diferente, qual seria?",
  "O que você está fazendo que sabe que está errado, mas continua fazendo?",
  "Qual é a decisão mais difícil que você precisa tomar mas está fugindo?",
  "Se você não tivesse medo de magoar alguém, o que decidiria?",
  "O que você precisa deixar ir mas não consegue?",
  "Qual escolha mudaria sua vida se você tivesse coragem de fazer?",
  "Se você pudesse decidir sem medo, o que escolheria?",
  "O que você sabe que precisa mudar mas tem medo de mudar?",
  "Qual é o conflito interno que mais te consome?",
  "Se você não tivesse medo de perder, o que decidiria?",
  "O que você está tolerando que sabe que não deveria tolerar?",
  "Qual decisão te libertaria se você tivesse coragem de tomar?",
  "Se você pudesse escolher você mesmo em vez de alguém, o que decidiria?",
  "O que você precisa enfrentar mas está evitando?",
  "Qual é a escolha que você sabe que precisa fazer mas tem medo?",
  "Se você não tivesse medo de errar, o que decidiria agora?",
  "O que você está fazendo por obrigação que está te matando por dentro?",
  "Qual decisão te traria paz mas você não toma?",
  "Se você pudesse decidir sem culpa, o que escolheria?",
  "O que você sabe que está te fazendo mal mas não consegue parar?",
  "Qual é a escolha que você está adiando porque tem medo do que vem depois?",
  "Se você não tivesse medo de decepcionar, o que decidiria?",
  "O que você precisa aceitar para poder seguir em frente?",
  "Qual decisão te assusta porque você sabe que é a certa?",
  "Se você pudesse escolher sem medo das consequências, o que decidiria?",
  "O que você está fazendo que vai contra quem você realmente é?",
  "Qual é a escolha que mudaria tudo se você tivesse coragem?",
  "Se você não tivesse medo de ficar sozinho, o que decidiria?",
  "O que você precisa deixar para trás mas está segurando?",
  "Qual decisão te traria liberdade se você tomasse?",
  "Se você pudesse decidir baseado no que você quer e não no que os outros esperam, o que escolheria?",
  "O que você sabe que precisa fazer diferente mas tem medo de tentar?",
  "Qual é a escolha que você está evitando porque sabe que vai doer?",
  "Se você não tivesse medo de mudar, o que decidiria agora?",
  "O que você está fazendo que sabe que não te faz bem?",
  "Qual decisão te faria feliz mas você não toma?",
  "Se você pudesse escolher sem medo de julgamento, o que decidiria?",
  "O que você precisa resolver mas está fugindo?",
  "Qual é a escolha que te paralisa?",
  "Se você não tivesse medo de perder controle, o que decidiria?",
  "O que você está tolerando que está te destruindo aos poucos?",
  "Qual decisão te traria alívio se você tomasse?",
  "Se você pudesse decidir sem medo de ser julgado, o que escolheria?",
  "O que você sabe que precisa enfrentar mas continua evitando?",
  "Qual é a escolha que te faria crescer mas te assusta?",
  "Se você não tivesse medo de ser livre, o que decidiria?",
  "O que você está fazendo por medo que está te impedindo de viver?",
  "Qual decisão te traria paz interior se você tomasse?",
  "Se você pudesse escolher coragem em vez de medo, o que decidiria?",
  "O que você precisa coragem para fazer?",
  "Qual é a escolha que você sabe que precisa tomar mas está adiando?",
  "Se você não tivesse medo das consequências, o que mudaria agora?",
  "O que você está fazendo que vai contra seus valores?",
  "Qual decisão te libertaria de um peso que você carrega?",
  "Se você pudesse decidir sem medo, o que escolheria hoje?",
  "O que você sabe que está te impedindo mas não consegue mudar?",

  // Propósito e Sentido Profundo (50)
  "Se você morresse amanhã, qual seria o maior arrependimento que você levaria?",
  "O que te faz sentir que sua vida tem sentido — de verdade, não o que você acha que deveria responder?",
  "Se você pudesse dedicar sua vida a uma única coisa, o que seria?",
  "Qual é a diferença que você quer fazer no mundo antes de partir?",
  "Se você não precisasse de dinheiro, o que faria todos os dias?",
  "O que te faz sentir vivo de uma forma que nada mais faz?",
  "Qual é o legado que você quer deixar — não para o mundo, mas para quem você ama?",
  "Se você pudesse ser lembrado por uma única coisa, o que seria?",
  "O que te move de verdade quando você tira todas as máscaras?",
  "Qual é o seu chamado que você está ignorando?",
  "Se você pudesse mudar uma coisa no mundo, o que seria?",
  "O que te faz sentir que você está no caminho certo?",
  "Qual é a sua missão nesta vida — se é que você sente que tem uma?",
  "Se você pudesse viver com total liberdade, o que faria?",
  "O que te faz sentir realizado de uma forma profunda?",
  "Qual é o impacto que você quer ter nas pessoas ao seu redor?",
  "Se você pudesse deixar uma mensagem para o mundo, qual seria?",
  "O que te faz sentir que você está vivendo plenamente?",
  "Qual é a sua verdadeira vocação — não o que te disseram, mas o que você sente?",
  "Se você pudesse inspirar outras pessoas, o que gostaria de inspirar?",
  "O que te faz sentir conectado com algo maior que você?",
  "Qual é o seu papel neste mundo — se é que você sente que tem um?",
  "Se você pudesse transformar vidas, como faria isso?",
  "O que te faz sentir que você está fazendo diferença?",
  "Qual é a sua paixão verdadeira que você não está vivendo?",
  "Se você pudesse dedicar sua vida a uma causa, qual seria?",
  "O que te faz sentir que você está vivendo com propósito?",
  "Qual é o seu dom que você não está usando?",
  "Se você pudesse deixar um legado, qual seria?",
  "O que te faz sentir que você está sendo útil de verdade?",
  "Qual é a sua contribuição única para o mundo?",
  "Se você pudesse ser lembrado, por que gostaria de ser lembrado?",
  "O que te faz sentir que você está evoluindo como pessoa?",
  "Qual é o seu maior potencial que você não está explorando?",
  "Se você pudesse viver sem limitações, o que faria?",
  "O que te faz sentir que você está no seu caminho?",
  "Qual é a sua luz que você não está deixando brilhar?",
  "Se você pudesse ser quem você realmente é, o que mudaria?",
  "O que te faz sentir que você está vivendo sua verdade?",
  "Qual é o seu maior talento que você está desperdiçando?",
  "Se você pudesse deixar algo para as próximas gerações, o que seria?",
  "O que te faz sentir que vale a pena estar vivo?",
  "Qual é a sua essência mais pura que você não está mostrando?",
  "Se você pudesse viver plenamente, o que faria diferente?",
  "O que te faz sentir que você está fazendo o que veio fazer aqui?",
  "Qual é o sentido da sua existência — se é que você sente que tem um?",
  "Se você pudesse viver sem medo, qual seria o seu propósito?",
  "O que te faz sentir que você está vivendo, não apenas existindo?",
  "Qual é o seu maior presente que você não está compartilhando?",
  "Se você pudesse ser lembrado por uma qualidade, qual seria?",

  // Vulnerabilidade e Medos Profundos (50)
  "Qual é o medo que você carrega que nunca contou para ninguém?",
  "Se você pudesse não ter medo de uma coisa, o que seria?",
  "O que te deixa mais vulnerável — e por que você esconde isso?",
  "Qual é a sua maior insegurança que você finge que não tem?",
  "Se você pudesse enfrentar um medo sem consequências, qual seria?",
  "O que você tem medo de perder que te paralisa?",
  "Qual é o seu maior receio sobre o futuro que você não admite?",
  "Se você pudesse não ter medo de ser julgado, o que faria?",
  "O que te assusta em você mesmo que você não quer ver?",
  "Qual é a sua maior fraqueza que você tenta esconder?",
  "Se você pudesse enfrentar algo sem medo, o que seria?",
  "O que você tem medo de descobrir sobre si mesmo?",
  "Qual é o seu maior trauma que você nunca superou?",
  "Se você pudesse não ter medo de se abrir, o que revelaria?",
  "O que te deixa com medo de amar de verdade?",
  "Qual é a sua maior ferida que você carrega em silêncio?",
  "Se você pudesse não ter medo de mostrar quem você é, o que mudaria?",
  "O que você tem medo de sentir que você reprime?",
  "Qual é o seu maior bloqueio emocional que te impede de viver?",
  "Se você pudesse não ter medo de viver, o que faria?",
  "O que te deixa com vergonha que você nunca admitiu?",
  "Qual é o seu maior peso que você carrega sozinho?",
  "Se você pudesse não ter medo de ser você, o que mudaria?",
  "O que você tem medo de aceitar sobre sua vida?",
  "Qual é o seu maior segredo que você guarda?",
  "Se você pudesse não ter medo de mudar, o que mudaria?",
  "O que te deixa com medo de crescer e evoluir?",
  "Qual é a sua maior limitação que você impõe a si mesmo?",
  "Se você pudesse não ter medo de deixar ir, o que soltaria?",
  "O que você tem medo de reconhecer em si mesmo?",
  "Qual é o seu maior obstáculo emocional que te paralisa?",
  "Se você pudesse não ter medo de ser feliz, o que faria?",
  "O que te deixa com medo de confiar nas pessoas?",
  "Qual é a sua maior barreira que te impede de amar?",
  "Se você pudesse não ter medo de perder controle, o que faria?",
  "O que você tem medo de revelar sobre quem você é?",
  "Qual é o seu maior pavor que te assombra?",
  "Se você pudesse não ter medo de ser vulnerável, o que mudaria?",
  "O que te deixa com medo de falhar que te paralisa?",
  "Qual é a sua maior sombra que você não quer enfrentar?",
  "Se você pudesse não ter medo de ser julgado, o que revelaria?",
  "O que você tem medo de que as pessoas vejam em você?",
  "Qual é o seu maior desconforto que você evita?",
  "Se você pudesse não ter medo de ser livre, o que faria?",
  "O que te deixa com medo de ser autêntico?",
  "Qual é a sua maior resistência que te impede de evoluir?",
  "Se você pudesse não ter medo de enfrentar a verdade, o que enfrentaria?",
  "O que você tem medo de que defina você?",
  "Qual é o seu maior medo sobre você mesmo?",
  "Se você pudesse não ter medo de viver plenamente, o que mudaria hoje?",
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
