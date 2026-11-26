(async function(){
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let D;
try{D=await (await fetch('data/site.json')).json()}catch(e){
 $('#app').innerHTML='<div class="wrap" style="padding-top:120px"><p>Não foi possível carregar o conteúdo. Abra o site por um servidor (GitHub Pages ou <code>python3 -m http.server</code>) em vez de abrir o arquivo direto.</p></div>';return}
const I=D.instituicao,C=D.contato,R=D.recrutamento,M=D.motostudent;
const mail=`mailto:${C.email}`;
const html=`
<section class="hero" id="inicio"><div class="hero-bg" role="img" aria-label="Protótipo vermelho e branco do LABEM"></div><div class="wrap">
 <img class="hero-logo" src="assets/logos/ufcg.png" alt="Brasão da UFCG" style="width:56px;margin-bottom:1rem">
 <h1>${esc(I.nomeCompleto)}</h1><p class="lead">${esc(I.lema)}</p>
 <a class="btn" href="#faca-parte">Faça parte</a><a class="btn ghost" href="#parcerias">Seja nosso parceiro</a></div></section>

<section id="sobre"><div class="wrap"><div class="split"><div>
 <h2>Engenharia de motocicletas na UFCG</h2><p>${esc(I.descricao)}</p><p>${esc(I.descricao2)}</p></div>
 <img class="photo" src="assets/img/equipe-moto.webp" alt="Integrantes do LABEM ao lado do protótipo" loading="lazy"></div>
 <div class="stats">${D.indicadores.map(i=>`<div><b>${esc(i.valor)}</b><span>${esc(i.rotulo)}</span></div>`).join('')}</div>
 <h2 style="margin-top:5rem">Uma trajetória de 13 anos</h2><p>${esc(D.historia.texto)}</p>
 <div class="timeline">${D.historia.linhaDoTempo.map(t=>`<figure><b>${esc(t.ano)}</b><img src="${t.imagem}" alt="${esc(t.texto)}" loading="lazy"><figcaption>${esc(t.texto)}</figcaption></figure>`).join('')}</div>
 <h2 style="margin-top:5rem">O que nos move</h2><ol class="list">${D.objetivos.map(o=>`<li>${esc(o)}</li>`).join('')}</ol></div></section>

<section id="motostudent"><div class="wrap"><div class="split"><div>
 <h2>Competição internacional de motovelocidade</h2><p>${esc(M.texto)}</p>
 <dl class="ficha">${M.ficha.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl></div>
 <div>${M.imagens.map(s=>`<img class="photo wide" style="margin-bottom:1rem" src="${s}" alt="Equipe do LABEM na MotoStudent" loading="lazy">`).join('')}</div></div>
 <div class="ms">${M.fases.map(f=>`<div><b>${esc(f.sigla)}</b><strong>${esc(f.nome)}</strong><p>${esc(f.texto)}</p></div>`).join('')}</div></div></section>

<section id="engenharia"><div class="wrap"><h2>Seis frentes, uma motocicleta</h2><p>Engenharia integrada: cada subsistema contribui com uma parte do projeto e todos evoluem juntos.</p>
 <div class="sub">${D.subsistemas.map(s=>`<div><h3>${esc(s.nome)}</h3><p>${esc(s.texto)}</p></div>`).join('')}</div>
 <h2 style="margin-top:5rem">Da ideia à pista</h2>
 <ol class="chain">${D.fases.map(f=>`<li><b>${esc(f.nome)}</b><span>${esc(f.texto)}</span></li>`).join('')}</ol>
 <h2 style="margin-top:5rem">Para onde vamos</h2><ol class="list">${D.metas.map(o=>`<li>${esc(o)}</li>`).join('')}</ol></div></section>

<section id="resultados"><div class="wrap"><h2>Presença acadêmica e técnica</h2>
 ${D.resultados.map(r=>`<div class="res"><img src="${r.imagem}" alt="${esc(r.titulo)}" loading="lazy"><div><h3>${esc(r.titulo)}</h3><p>${esc(r.texto)}</p></div></div>`).join('')}
 <div class="dest"><div><h3 style="font-size:2rem;margin-bottom:.6rem">${esc(D.destaque.titulo)}</h3><p><strong>${esc(D.destaque.subtitulo)}</strong></p><p>${esc(D.destaque.texto)}</p><small>${esc(D.destaque.fonte)}</small></div>
 <img src="${D.destaque.imagem}" alt="Modelo massa-mola-amortecedor da suspensão com acoplamento magnético" loading="lazy"></div></div></section>

<section id="parcerias"><div class="wrap"><h2>${esc(D.parcerias.titulo)}</h2>
 <ul class="partners">${D.parcerias.itens.map(p=>p.logo?`<li><img src="${p.logo}" alt="${esc(p.nome)}" loading="lazy"></li>`:`<li>${esc(p.nome)}</li>`).join('')}</ul>
 <p class="note">${esc(D.parcerias.aviso)}</p>
 <h3 style="font-size:2rem;margin:2.5rem 0 .6rem">Seja nosso parceiro</h3>
 <p>Empresas podem colaborar com apoio financeiro, materiais, tecnologia, serviços de fabricação, consultoria, treinamentos e visitas técnicas. Escreva para combinar o formato.</p>
 <a class="btn" href="${C.formularioEmpresas||mail+'?subject=Parceria%20com%20o%20LABEM'}">Falar sobre parceria</a></div></section>

<section id="faca-parte"><div class="wrap"><h2>${esc(R.titulo)}</h2>
 <span class="status">${esc(R.statusTextos[R.status])}</span>
 <div class="vagas">${R.vagas.map(v=>`<div><b>${v[1]}</b>${v[1]>1?'vagas':'vaga'} em ${esc(v[0])}</div>`).join('')}</div>
 <a class="btn" href="${R.link||C.formularioEstudantes||mail+'?subject=Processo%20seletivo%20LABEM'}">${R.link?'Inscreva-se':'Pergunte sobre as vagas'}</a></div></section>

<section id="contato"><div class="wrap"><h2>Contato</h2><p>${esc(I.universidade)}, ${esc(I.centro)}. ${esc(I.cidade)}.</p>
 <p><a href="${mail}">${esc(C.email)}</a><br><a href="${C.instagram}" rel="noopener" target="_blank">Instagram ${esc(C.instagramUser)}</a></p></div></section>`;
$('#app').innerHTML=html;
$('#rodape').innerHTML=`<div class="wrap"><div><img src="assets/logos/labem.png" alt="LABEM UFCG"><p style="color:var(--muted);font-size:.9rem">${esc(I.nomeCompleto)}. ${esc(I.universidade)}, ${esc(I.centro)}.</p></div>
 <div><a href="#sobre">Sobre nós</a><a href="#motostudent">MotoStudent</a><a href="#engenharia">Engenharia</a><a href="#faca-parte">Faça parte</a></div>
 <div><a href="${mail}">${esc(C.email)}</a><a href="${C.instagram}" target="_blank" rel="noopener">${esc(C.instagramUser)}</a><span style="color:var(--muted)">${esc(I.cidade)}</span></div>
 <small>© ${new Date().getFullYear()} ${esc(I.nome)}</small></div>`;
const b=$('#menu'),n=$('#nav');
b.onclick=()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)};
n.onclick=e=>{if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded',false)}};
if(location.hash){const t=document.getElementById(location.hash.slice(1));t&&t.scrollIntoView()}
})();
