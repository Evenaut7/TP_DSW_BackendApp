// src/seed.ts
import { orm } from './db/orm.js';
import { Provincia } from '../provincia/provincia.entity.js';
import { Localidad } from '../localidad/localidad.entity.js';
import { Tag } from '../tag/tag.entity.js';
import { PuntoDeInteres } from '../puntoDeInteres/puntoDeInteres.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';
import { Historia } from '../historia/historia.entity.js';
import { Valoracion } from '../valoracion/valoracion.entity.js';
import { Evento } from '../evento/evento.entity.js';

console.log('📄 seed file loaded:', new Date().toISOString());
console.log('📄 running file URL:', import.meta.url);

async function main() {
  console.log('▶️ seed: start');
  const em = orm.em.fork(); // creamos EntityManager aislado
  console.time('⏱ seed');
  //-------------------------------------------------------------------------------------------
  // PROVINCIAS -------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------
  const p1 = new Provincia();
  p1.nombre = 'Buenos Aires';
  await em.persistAndFlush(p1);

  const p2 = new Provincia();
  p2.nombre = 'Santa Fe';
  await em.persistAndFlush(p2);

  const p3 = new Provincia();
  p3.nombre = 'Cordoba';
  await em.persistAndFlush(p3);

  const p4 = new Provincia();
  p4.nombre = 'Mendoza';
  await em.persistAndFlush(p4);

  const p5 = new Provincia();
  p5.nombre = 'Tierra del Fuego';
  await em.persistAndFlush(p5);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // LOCALIDADES -----------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  const l0 = new Localidad();
  l0.nombre = 'CABA';
  l0.provincia = p1;
  l0.imagen = 'caba.jpg';
  l0.descripcion =
    'Capital del país, puerta de entrada cultural y económica con atractivos históricos, parques y vida nocturna.';
  await em.persistAndFlush(l0);

  const l1 = new Localidad();
  l1.nombre = 'Quilmes';
  l1.provincia = p1;
  l1.imagen = 'quilmes.png';
  l1.descripcion =
    'Ciudad del sur del Gran Buenos Aires, famosa por su cerveza, su río y su centro de convenciones.';
  await em.persistAndFlush(l1);

  const l2 = new Localidad();
  l2.nombre = 'Rosario';
  l2.imagen = 'rosario.jpg';
  l2.provincia = p2;
  l2.descripcion =
    'Metrópolis del río Paraná con arquitectura patrimonial, playas urbanas y activa vida cultural.Y AGUANTE CENTRALITO';
  await em.persistAndFlush(l2);

  const l3 = new Localidad();
  l3.nombre = 'Funes';
  l3.imagen = 'funes.jpg';
  l3.provincia = p2;
  l3.descripcion =
    'Ciudad residencial junto a Rosario, ideal para descansar en entorno verde y practicar golf.';
  await em.persistAndFlush(l3);

  const l4 = new Localidad();
  l4.nombre = 'Cordoba';
  l4.provincia = p3;
  l4.imagen = 'cordoba.png';
  l4.descripcion =
    'Segunda ciudad del país, centro universitario con sierras cercanas, historia jesuítica y vida estudiantil.';
  await em.persistAndFlush(l4);

  const l5 = new Localidad();
  l5.nombre = 'Mendoza';
  l5.provincia = p4;
  l5.imagen = 'mendoza.png';
  l5.descripcion =
    'Capital del vino argentino, rodeada de viñedos y montañas; base para aventura y alta gastronomía.';
  await em.persistAndFlush(l5);

  const l6 = new Localidad();
  l6.nombre = 'Ushuaia';
  l6.provincia = p5;
  l6.imagen = 'ushuaia.png';
  l6.descripcion =
    'Ciudad más austral del mundo, punto de partida para navegaciones al Canal Beagle y a la Antártida.';
  await em.persistAndFlush(l6);

  const l7 = new Localidad();
  l7.nombre = 'Villa Carlos Paz';
  l7.provincia = p3;
  l7.imagen = 'villacarlospaz.jpg';
  l7.descripcion =
    'Clásico destino de veraneo cordobés con lago, espectáculos de teatro y múltiples opciones de turismo aventura.';
  await em.persistAndFlush(l7);

  const l8 = new Localidad();
  l8.nombre = 'Villa María';
  l8.provincia = p3;
  l8.imagen = 'villamaria.png';
  l8.descripcion =
    'Nudo ferroviario y agroindustrial del centro del país, con bodegas y acceso directo a las sierras.';
  await em.persistAndFlush(l8);

  const l9 = new Localidad();
  l9.nombre = 'Godoy Cruz';
  l9.provincia = p4;
  l9.imagen = 'godoycruz.jpg';
  l9.descripcion =
    'Partido del Gran Mendoza, corazón de la producción vitivinícola y cuna de importantes bodegas.';
  await em.persistAndFlush(l9);

  const l10 = new Localidad();
  l10.nombre = 'San Rafael';
  l10.provincia = p4;
  l10.imagen = 'sanrafael.jpg';
  l10.descripcion =
    'Oasis mendocino con diques turísticos, ríos de aguas turquesas y circuito del vino sur.';
  await em.persistAndFlush(l10);

  const l11 = new Localidad();
  l11.nombre = 'Río Grande';
  l11.provincia = p5;
  l11.imagen = 'riogrande.png';
  l11.descripcion =
    'Ciudad industrial de Tierra del Fuego, punto de entrada para avistaje de aves y paisajes patagónicos.';
  await em.persistAndFlush(l11);

  const l12 = new Localidad();
  l12.nombre = 'Tolhuin';
  l12.provincia = p5;
  l12.imagen = 'tolhuin.jpg';
  l12.descripcion =
    'Pueblo entre lagos en el corazón de la Isla Grande, ideal para pesca, trekking y pan recién horneado.';
  await em.persistAndFlush(l12);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // TAGS ------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  const tag1 = new Tag();
  tag1.nombre = 'Familiar';
  tag1.tipo = 'Evento';
  await em.persistAndFlush(tag1);

  const tagMusica = new Tag();
  tagMusica.nombre = 'Música';
  tagMusica.tipo = 'Evento';
  await em.persistAndFlush(tagMusica);

  const tagHistorico = new Tag();
  tagHistorico.nombre = 'Histórico';
  tagHistorico.tipo = 'Punto de Interés';
  await em.persistAndFlush(tagHistorico);

  const tagAireLibre = new Tag();
  tagAireLibre.nombre = 'Aire Libre';
  tagAireLibre.tipo = 'Actividad';
  await em.persistAndFlush(tagAireLibre);

  const tagGastronomia = new Tag();
  tagGastronomia.nombre = 'Gastronomía';
  tagGastronomia.tipo = 'Punto de Interés';
  await em.persistAndFlush(tagGastronomia);

  const tagDeporte = new Tag();
  tagDeporte.nombre = 'Deporte';
  tagDeporte.tipo = 'Evento';
  await em.persistAndFlush(tagDeporte);

  const tagCultura = new Tag();
  tagCultura.nombre = 'Cultura';
  tagCultura.tipo = 'Punto de Interés';
  await em.persistAndFlush(tagCultura);

  const tagCompras = new Tag();
  tagCompras.nombre = 'Compras';
  tagCompras.tipo = 'Punto de Interés';
  await em.persistAndFlush(tagCompras);

  const tagEducacion = new Tag();
  tagEducacion.nombre = 'Educación';
  tagEducacion.tipo = 'Evento';
  await em.persistAndFlush(tagEducacion);

  const tagBienestar = new Tag();
  tagBienestar.nombre = 'Bienestar';
  tagBienestar.tipo = 'Punto de Interés';
  await em.persistAndFlush(tagBienestar);

  const tagTecnologia = new Tag();
  tagTecnologia.nombre = 'Tecnología';
  tagTecnologia.tipo = 'Evento';
  await em.persistAndFlush(tagTecnologia);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // USUARIOS --------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------

    const usuarioAdmin = new Usuario();
    usuarioAdmin.nombre = 'admin';
    usuarioAdmin.tipo = 'admin';
    usuarioAdmin.cuit = '20123456789';
    usuarioAdmin.gmail = 'admin@gmail.com';
    usuarioAdmin.password = '123456';
    usuarioAdmin.localidad = l1;
    await em.persistAndFlush(usuarioAdmin);

  const usuario4 = new Usuario();
  usuario4.nombre = 'Valentino Laveggi';
  usuario4.tipo = 'usuario';
  usuario4.cuit = '20-11111111-1';
  usuario4.gmail = 'vl@gmail.com';
  usuario4.password = '123456';
  usuario4.localidad = l2;
  await em.persistAndFlush(usuario4);

  const usuario5 = new Usuario();
  usuario5.nombre = 'Joaquín Mourua';
  usuario5.tipo = 'usuario';
  usuario5.cuit = '20-22222222-2';
  usuario5.gmail = 'jm@gmail.com';
  usuario5.password = '123456';
  usuario5.localidad = l2;
  await em.persistAndFlush(usuario5);

  const usuario6 = new Usuario();
  usuario6.nombre = 'Gabriel Romero';
  usuario6.tipo = 'usuario';
  usuario6.cuit = '20-33333333-3';
  usuario6.gmail = 'gt@gmail.com';
  usuario6.password = '123456';
  usuario6.localidad = l2;
  await em.persistAndFlush(usuario6);

  const usuario7 = new Usuario();
  usuario7.nombre = 'Lionel Messi';
  usuario7.tipo = 'usuario';
  usuario7.cuit = '20-44444444-4';
  usuario7.gmail = 'lm@gmail.com';
  usuario7.password = '123456';
  usuario7.localidad = l2;
  await em.persistAndFlush(usuario7);

  const usuario8 = new Usuario();
  usuario8.nombre = 'Leandro Paredes';
  usuario8.tipo = 'usuario';
  usuario8.cuit = '10-11111111-1';
  usuario8.gmail = 'lp@gmail.com';
  usuario8.password = '123456';
  usuario8.localidad = l0;
  await em.persistAndFlush(usuario8);

  const usuario9 = new Usuario();
  usuario9.nombre = 'Enzo Fernández';
  usuario9.tipo = 'usuario';
  usuario9.cuit = '10-22222222-2';
  usuario9.gmail = 'ef@gmail.com';
  usuario9.password = '123456';
  usuario9.localidad = l0;
  await em.persistAndFlush(usuario9);

  const usuario10 = new Usuario();
  usuario10.nombre = 'Paulo Dybala';
  usuario10.tipo = 'usuario';
  usuario10.cuit = '40-11111111-1';
  usuario10.gmail = 'pd@gmail.com';
  usuario10.password = '123456';
  usuario10.localidad = l4;
  await em.persistAndFlush(usuario10);

  const usuario11 = new Usuario();
  usuario11.nombre = 'Mariana Díaz';
  usuario11.tipo = 'usuario';
  usuario11.cuit = '27-55555555-5';
  usuario11.gmail = 'mariana.diaz@example.com';
  usuario11.password = '123456';
  usuario11.localidad = l7;
  await em.persistAndFlush(usuario11);

  const usuario12 = new Usuario();
  usuario12.nombre = 'Santiago Pérez';
  usuario12.tipo = 'usuario';
  usuario12.cuit = '20-66666666-6';
  usuario12.gmail = 'santiago.perez@example.com';
  usuario12.password = '123456';
  usuario12.localidad = l9;
  await em.persistAndFlush(usuario12);

  const usuario13 = new Usuario();
  usuario13.nombre = 'Lucía Fernández';
  usuario13.tipo = 'usuario';
  usuario13.cuit = '27-77777777-7';
  usuario13.gmail = 'lucia.fernandez@example.com';
  usuario13.password = '123456';
  usuario13.localidad = l11;
  await em.persistAndFlush(usuario13);

  const usuarioMalaOnda = new Usuario();
  usuarioMalaOnda.nombre = 'Pedro Malafama';
  usuarioMalaOnda.tipo = 'usuario';
  usuarioMalaOnda.cuit = '20-99999999-9';
  usuarioMalaOnda.gmail = 'pedro.malafama@gmail.com';
  usuarioMalaOnda.password = '123456';
  usuarioMalaOnda.localidad = l2;
  await em.persistAndFlush(usuarioMalaOnda);
  // ----------------------------- USUARIOS (CREADOR) -----------------------------

    const muniCaba = new Usuario();
    muniCaba.nombre = 'Gobierno de la Ciudad de Buenos Aires';
    muniCaba.tipo = 'creador';
    muniCaba.cuit = '30-90000001-7';
    muniCaba.gmail = 'gcba@buenosaires.gob.ar';
    muniCaba.password = '123456';
    muniCaba.localidad = l0; // CABA
    await em.persistAndFlush(muniCaba);

    const muniQuilmes = new Usuario();
    muniQuilmes.nombre = 'Municipalidad de Quilmes';
    muniQuilmes.tipo = 'creador';
    muniQuilmes.cuit = '30-90000002-5';
    muniQuilmes.gmail = 'municipio@quilmes.gov.ar';
    muniQuilmes.password = '123456';
    muniQuilmes.localidad = l1; // Quilmes
    await em.persistAndFlush(muniQuilmes);

    const muniCordoba = new Usuario();
    muniCordoba.nombre = 'Municipalidad de Córdoba';
    muniCordoba.tipo = 'creador';
    muniCordoba.cuit = '30-90000003-3';
    muniCordoba.gmail = 'municipalidad@cordoba.gov.ar';
    muniCordoba.password = '123456';
    muniCordoba.localidad = l4; // Córdoba
    await em.persistAndFlush(muniCordoba);

    const muniMendoza = new Usuario();
    muniMendoza.nombre = 'Municipalidad de Mendoza';
    muniMendoza.tipo = 'creador';
    muniMendoza.cuit = '30-90000004-1';
    muniMendoza.gmail = 'municipalidad@mendoza.gov.ar';
    muniMendoza.password = '123456';
    muniMendoza.localidad = l5; // Mendoza
    await em.persistAndFlush(muniMendoza);

    const muniUshuaia = new Usuario();
    muniUshuaia.nombre = 'Municipalidad de Ushuaia';
    muniUshuaia.tipo = 'creador';
    muniUshuaia.cuit = '30-90000005-0';
    muniUshuaia.gmail = 'municipalidad@ushuaia.tdf.gov.ar';
    muniUshuaia.password = '123456';
    muniUshuaia.localidad = l6; // Ushuaia
    await em.persistAndFlush(muniUshuaia);

    const usuario2 = new Usuario();
    usuario2.nombre = 'Municipalidad de Rosario';
    usuario2.tipo = 'creador';
    usuario2.cuit = '20-121578-9';
    usuario2.gmail = 'munirosario@gmail.com';
    usuario2.password = '123456';
    usuario2.localidad = l2;
    await em.persistAndFlush(usuario2);

    const usuario3 = new Usuario();
    usuario3.nombre = 'Municipalidad de Funes';
    usuario3.tipo = 'creador';
    usuario3.cuit = '20-55545454-9';
    usuario3.gmail = 'munifunes@gmail.com';
    usuario3.password = '123456';
    usuario3.localidad = l3;
    await em.persistAndFlush(usuario3);

    const muniCarlosPaz = new Usuario();
    muniCarlosPaz.nombre = 'Municipalidad de Villa Carlos Paz';
    muniCarlosPaz.tipo = 'creador';
    muniCarlosPaz.cuit = '30-10000001-0';
    muniCarlosPaz.gmail = 'muni.carlospaz@gmail.com';
    muniCarlosPaz.password = '123456';
    muniCarlosPaz.localidad = l7;
    await em.persistAndFlush(muniCarlosPaz);

    const muniVillaMaria = new Usuario();
    muniVillaMaria.nombre = 'Municipalidad de Villa María';
    muniVillaMaria.tipo = 'creador';
    muniVillaMaria.cuit = '30-10000002-0';
    muniVillaMaria.gmail = 'muni.villamaria@gmail.com';
    muniVillaMaria.password = '123456';
    muniVillaMaria.localidad = l8;
    await em.persistAndFlush(muniVillaMaria);

    const muniGodoyCruz = new Usuario();
    muniGodoyCruz.nombre = 'Municipalidad de Godoy Cruz';
    muniGodoyCruz.tipo = 'creador';
    muniGodoyCruz.cuit = '30-10000003-0';
    muniGodoyCruz.gmail = 'muni.godoycruz@gmail.com';
    muniGodoyCruz.password = '123456';
    muniGodoyCruz.localidad = l9;
    await em.persistAndFlush(muniGodoyCruz);

    const muniSanRafael = new Usuario();
    muniSanRafael.nombre = 'Municipalidad de San Rafael';
    muniSanRafael.tipo = 'creador';
    muniSanRafael.cuit = '30-10000004-0';
    muniSanRafael.gmail = 'muni.sanrafael@gmail.com';
    muniSanRafael.password = '123456';
    muniSanRafael.localidad = l10;
    await em.persistAndFlush(muniSanRafael);

    const muniRioGrande = new Usuario();
    muniRioGrande.nombre = 'Municipalidad de Río Grande';
    muniRioGrande.tipo = 'creador';
    muniRioGrande.cuit = '30-10000005-0';
    muniRioGrande.gmail = 'muni.riogrande@gmail.com';
    muniRioGrande.password = '123456';
    muniRioGrande.localidad = l11;
    await em.persistAndFlush(muniRioGrande);

    const muniTolhuin = new Usuario();
    muniTolhuin.nombre = 'Municipalidad de Tolhuin';
    muniTolhuin.tipo = 'creador';
    muniTolhuin.cuit = '30-10000006-0';
    muniTolhuin.gmail = 'muni.tolhuin@gmail.com';
    muniTolhuin.password = '123456';
    muniTolhuin.localidad = l12;
    await em.persistAndFlush(muniTolhuin);

  // -------------------------------------------------------------------------------------------
  // UTILIDAD: pool de usuarios “Usuario” para valoraciones (existentes + nuevos)
  // -------------------------------------------------------------------------------------------
  const poolUsuariosValoracion: Usuario[] = [
    usuario4,
    usuario5,
    usuario6,
    usuario7,
    usuario8,
    usuario9,
    usuario10,
    usuario11,
    usuario12,
    usuario13,
  ];

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PUNTO DE INTERES ------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ROSARIO
  const pdiParqueIndependencia = new PuntoDeInteres(); // 1. Parque de la Independencia
  pdiParqueIndependencia.nombre = 'Parque de la Independencia';
  pdiParqueIndependencia.descripcion =
    "Uno de los parques urbanos más grandes y antiguos de Rosario, hogar de museos, el Rosedal, el Laguito y el estadio del club Newell's Old Boys.";
  pdiParqueIndependencia.imagen = 'parque-independencia.jpg';
  pdiParqueIndependencia.calle = 'Av. Carlos Pellegrini';
  pdiParqueIndependencia.altura = 2500;
  pdiParqueIndependencia.privado = false;
  pdiParqueIndependencia.usuario = usuario2;
  pdiParqueIndependencia.localidad = l2;
  await em.persistAndFlush(pdiParqueIndependencia);

  const pdiRioMio = new PuntoDeInteres();
  pdiRioMio.nombre = 'Río Mío - Costanera';
  pdiRioMio.descripcion =
    'Espacio de esparcimiento a orillas del río Paraná, ideal para caminatas, deportes y disfrutar la vista.';
  pdiRioMio.imagen = 'rio-mio-costanera.jpg';
  pdiRioMio.calle = 'Av. Estanislao López';
  pdiRioMio.altura = 2000;
  pdiRioMio.privado = false;
  pdiRioMio.usuario = usuario2;
  pdiRioMio.localidad = l2;
  await em.persistAndFlush(pdiRioMio);

  const pdiMonumentoBandera = new PuntoDeInteres(); // 3. Monumento Nacional a la Bandera
  pdiMonumentoBandera.nombre = 'Monumento Nacional a la Bandera';
  pdiMonumentoBandera.descripcion =
    'El ícono de Rosario y uno de los monumentos más importantes de Argentina, dedicado a la creación de la bandera.';
  pdiMonumentoBandera.imagen = 'monumento-bandera.jpg';
  pdiMonumentoBandera.calle = 'Córdoba';
  pdiMonumentoBandera.altura = 1300;
  pdiMonumentoBandera.privado = false;
  pdiMonumentoBandera.usuario = usuario2;
  pdiMonumentoBandera.localidad = l2;
  await em.persistAndFlush(pdiMonumentoBandera);

  const pdiCCPE = new PuntoDeInteres(); // 4. Centro Cultural Parque de España
  pdiCCPE.nombre = 'Centro Cultural Parque de España';
  pdiCCPE.descripcion =
    'Un complejo arquitectónico y cultural a orillas del Paraná con teatros, exposiciones y espacios de encuentro.';
  pdiCCPE.imagen = 'ccpe.jpg';
  pdiCCPE.calle = 'Sarmiento';
  pdiCCPE.altura = 1201;
  pdiCCPE.privado = false;
  pdiCCPE.usuario = usuario2;
  pdiCCPE.localidad = l2;
  await em.persistAndFlush(pdiCCPE);

  const pdiJardinNinos = new PuntoDeInteres(); // 5. El Jardín de los Niños
  pdiJardinNinos.nombre = 'El Jardín de los Niños';
  pdiJardinNinos.descripcion =
    'Un espacio lúdico y educativo dentro del Parque Independencia, con juegos, laberintos y propuestas interactivas para los más pequeños.';
  pdiJardinNinos.imagen = 'jardin-ninos.jpg';
  pdiJardinNinos.calle = 'Av. Presidente Perón';
  pdiJardinNinos.altura = 3300;
  pdiJardinNinos.privado = false;
  pdiJardinNinos.usuario = usuario2;
  pdiJardinNinos.localidad = l2;
  await em.persistAndFlush(pdiJardinNinos);

  //FUNES
  const pdiPaseoEstacionFunes = new PuntoDeInteres(); // 1. Paseo de la Estación (Funes)
  pdiPaseoEstacionFunes.nombre = 'Paseo de la Estación';
  pdiPaseoEstacionFunes.descripcion =
    'Antigua estación de tren convertida en espacio recreativo y cultural, con ferias y eventos.';
  pdiPaseoEstacionFunes.imagen = 'paseo-estacion-funes.jpg';
  pdiPaseoEstacionFunes.calle = 'Pedro Ríos';
  pdiPaseoEstacionFunes.altura = 1400; // Un número de altura aproximado o representativo
  pdiPaseoEstacionFunes.privado = false;
  pdiPaseoEstacionFunes.usuario = usuario3; // Asignar el usuario correspondiente
  pdiPaseoEstacionFunes.localidad = l3; // Asignar la localidad de Funes
  await em.persistAndFlush(pdiPaseoEstacionFunes);

  const pdiClubKentucky = new PuntoDeInteres(); // 2. Club de Campo Kentucky (Funes) - Si es un punto de interés conocido, aunque sea privado
  pdiClubKentucky.nombre = 'Club de Campo Kentucky';
  pdiClubKentucky.descripcion =
    'Reconocido club de campo con campos de golf, instalaciones deportivas y áreas verdes en Funes.';
  pdiClubKentucky.imagen = 'club-kentucky-funes.png';
  pdiClubKentucky.calle = 'Ruta Nacional A012'; // O una calle interna si es relevante
  pdiClubKentucky.altura = 500;
  pdiClubKentucky.privado = true; // Este es un ejemplo de un punto de interés privado
  pdiClubKentucky.usuario = usuario3; // Asignar el usuario correspondiente
  pdiClubKentucky.localidad = l3; // Asignar la localidad de Funes
  await em.persistAndFlush(pdiClubKentucky);

  // CABA (l0)
  const pdiObelisco = new PuntoDeInteres();
  pdiObelisco.nombre = 'Obelisco';
  pdiObelisco.descripcion = 'Monumento emblemático sobre Av. 9 de Julio.';
  pdiObelisco.imagen = 'obelisco.jpg';
  pdiObelisco.calle = 'Av. 9 de Julio';
  pdiObelisco.altura = 1100;
  pdiObelisco.privado = false;
  pdiObelisco.usuario = muniCaba;
  pdiObelisco.localidad = l0;
  pdiObelisco.tags.add(tagHistorico, tagCultura);
  await em.persistAndFlush(pdiObelisco);

  const pdiTeatroColon = new PuntoDeInteres();
  pdiTeatroColon.nombre = 'Teatro Colón';
  pdiTeatroColon.descripcion =
    'Principal casa de ópera del país, de relevancia mundial.';
  pdiTeatroColon.imagen = 'teatro-colon.jpg';
  pdiTeatroColon.calle = 'Cerrito';
  pdiTeatroColon.altura = 600;
  pdiTeatroColon.privado = false;
  pdiTeatroColon.usuario = muniCaba;
  pdiTeatroColon.localidad = l0;
  pdiTeatroColon.tags.add(tagCultura, tagHistorico);
  await em.persistAndFlush(pdiTeatroColon);

  // Quilmes (l1)
  const pdiRiberaQuilmes = new PuntoDeInteres();
  pdiRiberaQuilmes.nombre = 'Ribera de Quilmes';
  pdiRiberaQuilmes.descripcion =
    'Costanera sobre el Río de la Plata con espacios verdes.';
  pdiRiberaQuilmes.imagen = 'ribera-de-quilmes.jpg';
  pdiRiberaQuilmes.calle = 'Av. Cervantes';
  pdiRiberaQuilmes.altura = 200;
  pdiRiberaQuilmes.privado = false;
  pdiRiberaQuilmes.usuario = muniQuilmes;
  pdiRiberaQuilmes.localidad = l1;
  pdiRiberaQuilmes.tags.add(tagAireLibre, tagBienestar);
  await em.persistAndFlush(pdiRiberaQuilmes);

  const pdiCatedralQuilmes = new PuntoDeInteres();
  pdiCatedralQuilmes.nombre = 'Catedral de Quilmes';
  pdiCatedralQuilmes.descripcion =
    'Templo histórico y centro religioso de la ciudad.';
  pdiCatedralQuilmes.imagen = 'catedral-de-quilmes.png';
  pdiCatedralQuilmes.calle = 'Rivadavia';
  pdiCatedralQuilmes.altura = 300;
  pdiCatedralQuilmes.privado = false;
  pdiCatedralQuilmes.usuario = muniQuilmes;
  pdiCatedralQuilmes.localidad = l1;
  pdiCatedralQuilmes.tags.add(tagHistorico, tagCultura);
  await em.persistAndFlush(pdiCatedralQuilmes);

  // Córdoba (l4)
  const pdiParqueSarmientoCba = new PuntoDeInteres();
  pdiParqueSarmientoCba.nombre = 'Parque Sarmiento';
  pdiParqueSarmientoCba.descripcion =
    'Pulmón verde de Córdoba con laguna y senderos.';
  pdiParqueSarmientoCba.imagen = 'parque-sarmiento.jpg';
  pdiParqueSarmientoCba.calle = 'Av. Poeta Lugones';
  pdiParqueSarmientoCba.altura = 300;
  pdiParqueSarmientoCba.privado = false;
  pdiParqueSarmientoCba.usuario = muniCordoba;
  pdiParqueSarmientoCba.localidad = l4;
  pdiParqueSarmientoCba.tags.add(tagAireLibre, tagBienestar);
  await em.persistAndFlush(pdiParqueSarmientoCba);

  const pdiBuenPastor = new PuntoDeInteres();
  pdiBuenPastor.nombre = 'Paseo del Buen Pastor';
  pdiBuenPastor.descripcion = 'Centro cultural y paseo gastronómico/comercial.';
  pdiBuenPastor.imagen = 'paseo-del-buen-pastor.jpg';
  pdiBuenPastor.calle = 'Av. Hipólito Yrigoyen';
  pdiBuenPastor.altura = 325;
  pdiBuenPastor.privado = false;
  pdiBuenPastor.usuario = muniCordoba;
  pdiBuenPastor.localidad = l4;
  pdiBuenPastor.tags.add(tagCultura, tagGastronomia, tagCompras);
  await em.persistAndFlush(pdiBuenPastor);

  // Mendoza (l5)
  const pdiPlazaIndMza = new PuntoDeInteres();
  pdiPlazaIndMza.nombre = 'Plaza Independencia';
  pdiPlazaIndMza.descripcion =
    'Plaza central con ferias y actividades culturales.';
  pdiPlazaIndMza.imagen = 'plaza-independencia-mendoza.jpg';
  pdiPlazaIndMza.calle = 'Patricias Mendocinas';
  pdiPlazaIndMza.altura = 900;
  pdiPlazaIndMza.privado = false;
  pdiPlazaIndMza.usuario = muniMendoza;
  pdiPlazaIndMza.localidad = l5;
  pdiPlazaIndMza.tags.add(tagCultura, tagCompras);
  await em.persistAndFlush(pdiPlazaIndMza);

  const pdiParqueSanMartinMza = new PuntoDeInteres();
  pdiParqueSanMartinMza.nombre = 'Parque General San Martín';
  pdiParqueSanMartinMza.descripcion =
    'Parque icónico con lago, rosedal y cerro de la Gloria.';
  pdiParqueSanMartinMza.imagen = 'parque-general-san-martin.jpg';
  pdiParqueSanMartinMza.calle = 'Av. del Libertador';
  pdiParqueSanMartinMza.altura = 3900;
  pdiParqueSanMartinMza.privado = false;
  pdiParqueSanMartinMza.usuario = muniMendoza;
  pdiParqueSanMartinMza.localidad = l5;
  pdiParqueSanMartinMza.tags.add(tagAireLibre, tagBienestar);
  await em.persistAndFlush(pdiParqueSanMartinMza);

  // Ushuaia (l6)
  const pdiFaroFinDelMundo = new PuntoDeInteres();
  pdiFaroFinDelMundo.nombre = 'Faro del fin del mundo';
  pdiFaroFinDelMundo.descripcion =
    'Faro emblemático del extremo austral, en el Canal Beagle.';
  pdiFaroFinDelMundo.imagen = 'faro-del-fin-del-mundo.jpg';
  pdiFaroFinDelMundo.calle = 'Canal Beagle';
  pdiFaroFinDelMundo.altura = 1;
  pdiFaroFinDelMundo.privado = false;
  pdiFaroFinDelMundo.usuario = muniUshuaia;
  pdiFaroFinDelMundo.localidad = l6;
  pdiFaroFinDelMundo.tags.add(tagHistorico, tagAireLibre);
  await em.persistAndFlush(pdiFaroFinDelMundo);

  const pdiMuseoFinDelMundo = new PuntoDeInteres();
  pdiMuseoFinDelMundo.nombre = 'Museo del Fin del Mundo';
  pdiMuseoFinDelMundo.descripcion =
    'Museo regional con patrimonio histórico y natural.';
  pdiMuseoFinDelMundo.imagen = 'museo-del-fin-del-mundo.jpg';
  pdiMuseoFinDelMundo.calle = 'Maipú';
  pdiMuseoFinDelMundo.altura = 170;
  pdiMuseoFinDelMundo.privado = false;
  pdiMuseoFinDelMundo.usuario = muniUshuaia;
  pdiMuseoFinDelMundo.localidad = l6;
  pdiMuseoFinDelMundo.tags.add(tagCultura, tagHistorico);
  await em.persistAndFlush(pdiMuseoFinDelMundo);

  //VILLA CARLOS PAZ
  const pdiRelojCucu = new PuntoDeInteres();
  pdiRelojCucu.nombre = 'Reloj Cucú (VCP)';
  pdiRelojCucu.descripcion =
    'Emblema turístico de Villa Carlos Paz. Punto de encuentro clásico.';
  pdiRelojCucu.imagen = 'reloj-cucu.jpg';
  pdiRelojCucu.calle = 'Bv. Sarmiento';
  pdiRelojCucu.altura = 50;
  pdiRelojCucu.privado = false;
  pdiRelojCucu.usuario = muniCarlosPaz;
  pdiRelojCucu.localidad = l7;
  await em.persistAndFlush(pdiRelojCucu);

  const pdiCostaneraVCP = new PuntoDeInteres();
  pdiCostaneraVCP.nombre = 'Costanera del Lago San Roque (VCP)';
  pdiCostaneraVCP.descripcion =
    'Paseo costero para caminar, andar en bici y disfrutar del lago San Roque.';
  pdiCostaneraVCP.imagen = 'costanera-vcp.jpg';
  pdiCostaneraVCP.calle = 'Costanera Oeste';
  pdiCostaneraVCP.altura = 1800;
  pdiCostaneraVCP.privado = false;
  pdiCostaneraVCP.usuario = muniCarlosPaz;
  pdiCostaneraVCP.localidad = l7;
  await em.persistAndFlush(pdiCostaneraVCP);

  const pdiAerosilla = new PuntoDeInteres();
  pdiAerosilla.nombre = 'Aerosilla Carlos Paz';
  pdiAerosilla.descripcion =
    'Complejo con aerosilla y miradores panorámicos de la ciudad.';
  pdiAerosilla.imagen = 'aerosilla-carlos-paz.jpg';
  pdiAerosilla.calle = 'Florencio Sánchez';
  pdiAerosilla.altura = 1000;
  pdiAerosilla.privado = true;
  pdiAerosilla.usuario = muniCarlosPaz;
  pdiAerosilla.localidad = l7;
  await em.persistAndFlush(pdiAerosilla);

  //VILLA MARIA
  const pdiAnfiteatroVM = new PuntoDeInteres();
  pdiAnfiteatroVM.nombre = 'Anfiteatro Municipal (Villa María)';
  pdiAnfiteatroVM.descripcion = 'Sede del Festival Internacional de Peñas.';
  pdiAnfiteatroVM.imagen = 'anfiteatro-municipal-vm.jpg';
  pdiAnfiteatroVM.calle = 'Estados Unidos';
  pdiAnfiteatroVM.altura = 100;
  pdiAnfiteatroVM.privado = false;
  pdiAnfiteatroVM.usuario = muniVillaMaria;
  pdiAnfiteatroVM.localidad = l8;
  await em.persistAndFlush(pdiAnfiteatroVM);

  const pdiCostaneraVM = new PuntoDeInteres();
  pdiCostaneraVM.nombre = 'Costanera de Villa María';
  pdiCostaneraVM.descripcion =
    'Paseo junto al río Ctalamochita con espacios verdes y recreación.';
  pdiCostaneraVM.imagen = 'costanera-vm.jpg';
  pdiCostaneraVM.calle = 'Costanera';
  pdiCostaneraVM.altura = 500;
  pdiCostaneraVM.privado = false;
  pdiCostaneraVM.usuario = muniVillaMaria;
  pdiCostaneraVM.localidad = l8;
  await em.persistAndFlush(pdiCostaneraVM);

  const pdiPlazaIndVM = new PuntoDeInteres();
  pdiPlazaIndVM.nombre = 'Plaza Independencia (Villa María)';
  pdiPlazaIndVM.descripcion =
    'Plaza central con actividades culturales frecuentes.';
  pdiPlazaIndVM.imagen = 'plaza-independencia-vm.jpg';
  pdiPlazaIndVM.calle = 'Entre Ríos';
  pdiPlazaIndVM.altura = 300;
  pdiPlazaIndVM.privado = false;
  pdiPlazaIndVM.usuario = muniVillaMaria;
  pdiPlazaIndVM.localidad = l8;
  await em.persistAndFlush(pdiPlazaIndVM);

  //MENDOZA
  const pdiPlazaGC = new PuntoDeInteres();
  pdiPlazaGC.nombre = 'Plaza Godoy Cruz';
  pdiPlazaGC.descripcion = 'Espacio verde central con propuestas culturales.';
  pdiPlazaGC.imagen = 'plaza-godoy-cruz.jpg';
  pdiPlazaGC.calle = 'Colón';
  pdiPlazaGC.altura = 100;
  pdiPlazaGC.privado = false;
  pdiPlazaGC.usuario = muniGodoyCruz;
  pdiPlazaGC.localidad = l9;
  await em.persistAndFlush(pdiPlazaGC);

  const pdiTeatroPlaza = new PuntoDeInteres();
  pdiTeatroPlaza.nombre = 'Teatro Plaza (Godoy Cruz)';
  pdiTeatroPlaza.descripcion = 'Sala histórica con obras y conciertos.';
  pdiTeatroPlaza.imagen = 'teatro-plaza-godoy-cruz.jpg';
  pdiTeatroPlaza.calle = 'Colón';
  pdiTeatroPlaza.altura = 27;
  pdiTeatroPlaza.privado = false;
  pdiTeatroPlaza.usuario = muniGodoyCruz;
  pdiTeatroPlaza.localidad = l9;
  await em.persistAndFlush(pdiTeatroPlaza);

  const pdiPalmares = new PuntoDeInteres();
  pdiPalmares.nombre = 'Palmares Open Mall';
  pdiPalmares.descripcion = 'Centro comercial y de esparcimiento.';
  pdiPalmares.imagen = 'palmares-open-mall.jpg';
  pdiPalmares.calle = 'Panamericana';
  pdiPalmares.altura = 2650;
  pdiPalmares.privado = true;
  pdiPalmares.usuario = muniGodoyCruz;
  pdiPalmares.localidad = l9;
  await em.persistAndFlush(pdiPalmares);

  //SAN RAFAEL
  const pdiParqueSR = new PuntoDeInteres();
  pdiParqueSR.nombre = 'Parque Hipólito Yrigoyen (San Rafael)';
  pdiParqueSR.descripcion = 'Parque urbano con lago, monumentos y actividades.';
  pdiParqueSR.imagen = 'parque-hipolito-yrigoyen.jpg';
  pdiParqueSR.calle = 'Balloffet';
  pdiParqueSR.altura = 1600;
  pdiParqueSR.privado = false;
  pdiParqueSR.usuario = muniSanRafael;
  pdiParqueSR.localidad = l10;
  await em.persistAndFlush(pdiParqueSR);

  const pdiValleGrande = new PuntoDeInteres();
  pdiValleGrande.nombre = 'Dique Valle Grande (San Rafael)';
  pdiValleGrande.descripcion = 'Paisajes, deportes náuticos y aventura.';
  pdiValleGrande.imagen = 'dique-valle-grande.jpg';
  pdiValleGrande.calle = 'Ruta 173';
  pdiValleGrande.altura = 30;
  pdiValleGrande.privado = false;
  pdiValleGrande.usuario = muniSanRafael;
  pdiValleGrande.localidad = l10;
  await em.persistAndFlush(pdiValleGrande);

  const pdiMuseoSR = new PuntoDeInteres();
  pdiMuseoSR.nombre = 'Museo de San Rafael';
  pdiMuseoSR.descripcion = 'Colecciones históricas de la región.';
  pdiMuseoSR.imagen = 'museo-san-rafael.jpg';
  pdiMuseoSR.calle = 'Day';
  pdiMuseoSR.altura = 57;
  pdiMuseoSR.privado = false;
  pdiMuseoSR.usuario = muniSanRafael;
  pdiMuseoSR.localidad = l10;
  await em.persistAndFlush(pdiMuseoSR);

  //RIO GRANDE
  const pdiMalvinasRG = new PuntoDeInteres();
  pdiMalvinasRG.nombre = 'Monumento a los Héroes de Malvinas (Río Grande)';
  pdiMalvinasRG.descripcion = 'Espacio de memoria y reconocimiento.';
  pdiMalvinasRG.imagen = 'monumento-malvinas.jpg';
  pdiMalvinasRG.calle = 'Av. Héroes de Malvinas';
  pdiMalvinasRG.altura = 1200;
  pdiMalvinasRG.privado = false;
  pdiMalvinasRG.usuario = muniRioGrande;
  pdiMalvinasRG.localidad = l11;
  await em.persistAndFlush(pdiMalvinasRG);

  const pdiReservaRG = new PuntoDeInteres();
  pdiReservaRG.nombre = 'Reserva Costa Atlántica (Río Grande)';
  pdiReservaRG.descripcion =
    'Área protegida para avistaje de aves migratorias.';
  pdiReservaRG.imagen = 'reserva-costa-atlantica.jpg';
  pdiReservaRG.calle = 'Acceso Costero';
  pdiReservaRG.altura = 1;
  pdiReservaRG.privado = false;
  pdiReservaRG.usuario = muniRioGrande;
  pdiReservaRG.localidad = l11;
  await em.persistAndFlush(pdiReservaRG);

  const pdiCaboDomingo = new PuntoDeInteres();
  pdiCaboDomingo.nombre = 'Cabo Domingo (Río Grande)';
  pdiCaboDomingo.descripcion = 'Acantilados y vistas del Atlántico Sur.';
  pdiCaboDomingo.imagen = 'cabo-domingo.jpg';
  pdiCaboDomingo.calle = 'Ruta Complementaria 5';
  pdiCaboDomingo.altura = 5;
  pdiCaboDomingo.privado = false;
  pdiCaboDomingo.usuario = muniRioGrande;
  pdiCaboDomingo.localidad = l11;
  await em.persistAndFlush(pdiCaboDomingo);

  //TOLHUIN
  const pdiLagoFagnano = new PuntoDeInteres();
  pdiLagoFagnano.nombre = 'Lago Fagnano (Tolhuin)';
  pdiLagoFagnano.descripcion =
    'Lago compartido con Chile, ideal para contemplación y pesca.';
  pdiLagoFagnano.imagen = 'lago-fagnano.jpg';
  pdiLagoFagnano.calle = 'Av. de los Selknam';
  pdiLagoFagnano.altura = 100;
  pdiLagoFagnano.privado = false;
  pdiLagoFagnano.usuario = muniTolhuin;
  pdiLagoFagnano.localidad = l12;
  await em.persistAndFlush(pdiLagoFagnano);

  const pdiPaseoLagoTol = new PuntoDeInteres();
  pdiPaseoLagoTol.nombre = 'Paseo del Lago (Tolhuin)';
  pdiPaseoLagoTol.descripcion = 'Costanera urbana con miradores.';
  pdiPaseoLagoTol.imagen = 'paseo-del-lago.jpg';
  pdiPaseoLagoTol.calle = 'Costanera del Fagnano';
  pdiPaseoLagoTol.altura = 1;
  pdiPaseoLagoTol.privado = false;
  pdiPaseoLagoTol.usuario = muniTolhuin;
  pdiPaseoLagoTol.localidad = l12;
  await em.persistAndFlush(pdiPaseoLagoTol);

  const pdiPanaderiaUnion = new PuntoDeInteres();
  pdiPanaderiaUnion.nombre = 'Panadería La Unión (Tolhuin)';
  pdiPanaderiaUnion.descripcion =
    'Clásica panadería fueguina, punto de parada de ruta.';
  pdiPanaderiaUnion.imagen = 'panaderia-la-union.jpg';
  pdiPanaderiaUnion.calle = 'RN3';
  pdiPanaderiaUnion.altura = 2900;
  pdiPanaderiaUnion.privado = true;
  pdiPanaderiaUnion.usuario = muniTolhuin;
  pdiPanaderiaUnion.localidad = l12;
  await em.persistAndFlush(pdiPanaderiaUnion);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  //HISTORIA-----------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  const hObelisco = new Historia();
  hObelisco.titulo = 'Iluminación especial del Obelisco';
  hObelisco.fechaDesde = new Date('2025-09-10 19:00:00');
  hObelisco.fechaHasta = new Date('2025-09-10 23:59:00');
  hObelisco.descripcion = 'Jornada de luces por aniversario de la ciudad.';
  hObelisco.imagen = 'historia-obelisco.jpg';
  hObelisco.puntoDeInteres = pdiObelisco;
  await em.persistAndFlush(hObelisco);

  const hColon = new Historia();
  hColon.titulo = 'Temporada lírica 2026';
  hColon.fechaDesde = new Date('2026-03-01 18:00:00');
  hColon.fechaHasta = new Date('2026-07-31 23:00:00');
  hColon.descripcion =
    'Programación ampliada con producciones internacionales.';
  hColon.imagen = 'historia-teatro-colon.jpg';
  hColon.puntoDeInteres = pdiTeatroColon;
  await em.persistAndFlush(hColon);

  const hRibera = new Historia();
  hRibera.titulo = 'Reacondicionamiento de la Ribera';
  hRibera.fechaDesde = new Date('2025-11-05 08:00:00');
  hRibera.fechaHasta = new Date('2025-12-15 18:00:00');
  hRibera.descripcion = 'Mejoras en senderos y mobiliario urbano.';
  hRibera.imagen = 'historia-ribera-de-quilmes.jpg';
  hRibera.puntoDeInteres = pdiRiberaQuilmes;
  await em.persistAndFlush(hRibera);

  const hCatedralQ = new Historia();
  hCatedralQ.titulo = 'Ciclo coral en la Catedral';
  hCatedralQ.fechaDesde = new Date('2025-09-20 19:00:00');
  hCatedralQ.fechaHasta = new Date('2025-10-20 21:00:00');
  hCatedralQ.descripcion = 'Conciertos semanales de coros locales.';
  hCatedralQ.imagen = 'historia-catedral-de-quilmes.jpg';
  hCatedralQ.puntoDeInteres = pdiCatedralQuilmes;
  await em.persistAndFlush(hCatedralQ);

  const hSarmiento = new Historia();
  hSarmiento.titulo = 'Activación saludable en el Parque';
  hSarmiento.fechaDesde = new Date('2025-10-01 09:00:00');
  hSarmiento.fechaHasta = new Date('2025-11-30 18:00:00');
  hSarmiento.descripcion =
    'Clases abiertas de actividad física y caminatas guiadas.';
  hSarmiento.imagen = 'historia-parque-sarmiento.jpg';
  hSarmiento.puntoDeInteres = pdiParqueSarmientoCba;
  await em.persistAndFlush(hSarmiento);

  const hBuenPastor = new Historia();
  hBuenPastor.titulo = 'Muestras fotográficas urbanas';
  hBuenPastor.fechaDesde = new Date('2025-09-05 10:00:00');
  hBuenPastor.fechaHasta = new Date('2025-10-05 22:00:00');
  hBuenPastor.descripcion =
    'Exhibiciones temporales y música en vivo en el paseo.';
  hBuenPastor.imagen = 'historia-paseo-del-buen-pastor.jpg';
  hBuenPastor.puntoDeInteres = pdiBuenPastor;
  await em.persistAndFlush(hBuenPastor);

  const hPlazaMza = new Historia();
  hPlazaMza.titulo = 'Feria de emprendedores';
  hPlazaMza.fechaDesde = new Date('2025-09-12 16:00:00');
  hPlazaMza.fechaHasta = new Date('2025-09-14 21:00:00');
  hPlazaMza.descripcion = 'Puestos de diseño y gastronomía local.';
  hPlazaMza.imagen = 'historia-plaza-independencia-mendoza.jpg';
  hPlazaMza.puntoDeInteres = pdiPlazaIndMza;
  await em.persistAndFlush(hPlazaMza);

  const hSanMartinMza = new Historia();
  hSanMartinMza.titulo = 'Temporada de primavera en el parque';
  hSanMartinMza.fechaDesde = new Date('2025-09-01 08:00:00');
  hSanMartinMza.fechaHasta = new Date('2025-11-30 20:00:00');
  hSanMartinMza.descripcion = 'Visitas guiadas y actividades recreativas.';
  hSanMartinMza.imagen = 'historia-parque-general-san-martin.jpg';
  hSanMartinMza.puntoDeInteres = pdiParqueSanMartinMza;
  await em.persistAndFlush(hSanMartinMza);

  const hFaro = new Historia();
  hFaro.titulo = 'Navegación y avistaje en el Beagle';
  hFaro.fechaDesde = new Date('2025-12-10 10:00:00');
  hFaro.fechaHasta = new Date('2026-02-28 18:00:00');
  hFaro.descripcion = 'Circuitos náuticos y observación de fauna.';
  hFaro.imagen = 'historia-faro-del-fin-del-mundo.jpg';
  hFaro.puntoDeInteres = pdiFaroFinDelMundo;
  await em.persistAndFlush(hFaro);

  const hMuseoFdm = new Historia();
  hMuseoFdm.titulo = 'Renovación de salas del museo';
  hMuseoFdm.fechaDesde = new Date('2025-08-20 09:00:00');
  hMuseoFdm.fechaHasta = new Date('2025-10-30 19:00:00');
  hMuseoFdm.descripcion = 'Nuevas piezas y relatos sobre la región fueguina.';
  hMuseoFdm.imagen = 'historia-museo-del-fin-del-mundo.jpg';
  hMuseoFdm.puntoDeInteres = pdiMuseoFinDelMundo;
  await em.persistAndFlush(hMuseoFdm);
  //FUNES
  const h1 = new Historia();
  h1.titulo = 'Inauguración del Paseo de la Estación en Funes';
  h1.fechaDesde = new Date('2024-01-15 08:01:54'); // Fecha de inicio de esta historia
  h1.fechaHasta = new Date('2024-03-30 08:02:26'); // Fecha de fin de esta historia (opcional, pero aquí la incluyo)
  h1.descripcion =
    'Inauguración de la serie de eventos culturales "Verano en la Estación", con música en vivo y ferias de artesanos locales. Gran afluencia de público y excelente repercusión.';
  h1.imagen = 'historia-paseo-estacion-verano.jpg'; // Sustituir con una URL/ruta real
  h1.puntoDeInteres = pdiPaseoEstacionFunes; // Asignar el punto de interés "Paseo de la Estación"
  await em.persistAndFlush(h1);
  //VCP
  const hVcp1 = new Historia();
  hVcp1.titulo = 'Restauración del Reloj Cucú';
  hVcp1.fechaDesde = new Date('2025-04-10 09:00:00');
  hVcp1.fechaHasta = new Date('2025-05-01 18:00:00');
  hVcp1.descripcion =
    'Obras de puesta en valor y agenda cultural para celebrar la restauración.';
  hVcp1.puntoDeInteres = pdiRelojCucu;
  await em.persistAndFlush(hVcp1);

  const hVcp2 = new Historia();
  hVcp2.titulo = 'Ciclovía temporal en Costanera';
  hVcp2.fechaDesde = new Date('2025-10-01 08:00:00');
  hVcp2.fechaHasta = new Date('2025-11-30 20:00:00');
  hVcp2.descripcion =
    'Se habilita una ciclovía recreativa los fines de semana.';
  hVcp2.puntoDeInteres = pdiCostaneraVCP;
  await em.persistAndFlush(hVcp2);
  //VILLA MARIA
  const hVm1 = new Historia();
  hVm1.titulo = 'Edición 2026 del Festival de Peñas';
  hVm1.fechaDesde = new Date('2026-02-03 18:00:00');
  hVm1.fechaHasta = new Date('2026-02-07 23:59:00');
  hVm1.descripcion =
    'Programación ampliada con artistas nacionales e internacionales.';
  hVm1.puntoDeInteres = pdiAnfiteatroVM;
  await em.persistAndFlush(hVm1);
  //GODOY CRUZ
  const hGc1 = new Historia();
  hGc1.titulo = 'Temporada de Teatro Independiente';
  hGc1.fechaDesde = new Date('2025-08-01 18:00:00');
  hGc1.fechaHasta = new Date('2025-09-30 22:00:00');
  hGc1.descripcion = 'Ciclo con compañías locales en el Teatro Plaza.';
  hGc1.puntoDeInteres = pdiTeatroPlaza;
  await em.persistAndFlush(hGc1);
  //SAN RAFAEL
  const hSr1 = new Historia();
  hSr1.titulo = 'Temporada de Aventura en Valle Grande';
  hSr1.fechaDesde = new Date('2025-12-01 08:00:00');
  hSr1.fechaHasta = new Date('2026-02-28 20:00:00');
  hSr1.descripcion = 'Kayak, rafting y senderismo con guías locales.';
  hSr1.puntoDeInteres = pdiValleGrande;
  await em.persistAndFlush(hSr1);
  //RG
  const hRg1 = new Historia();
  hRg1.titulo = 'Jornada de Avistaje en la Reserva';
  hRg1.fechaDesde = new Date('2025-12-08 10:00:00');
  hRg1.fechaHasta = new Date('2025-12-08 16:00:00');
  hRg1.descripcion = 'Guiada por especialistas en fauna patagónica.';
  hRg1.puntoDeInteres = pdiReservaRG;
  await em.persistAndFlush(hRg1);
  //TOLHUIN
  const hTol1 = new Historia();
  hTol1.titulo = 'Fiesta del Lago';
  hTol1.fechaDesde = new Date('2026-01-25 12:00:00');
  hTol1.fechaHasta = new Date('2026-01-25 22:00:00');
  hTol1.descripcion = 'Actividades náuticas y espectáculos familiares.';
  hTol1.puntoDeInteres = pdiPaseoLagoTol;
  await em.persistAndFlush(hTol1);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  //EVENTOS -------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  const e1 = new Evento();
  e1.titulo = 'El cumple de Pedro';
  e1.descripcion = 'Tengo casa sola, apta para maraton de Harry Potter';
  e1.horaDesde = new Date('2025-08-15 20:00:00');
  e1.horaHasta = new Date('2024-08-16 06:00:00');
  e1.estado = 'Disponible';
  e1.tags = [tagTecnologia];
  e1.puntoDeInteres = pdiClubKentucky;
  e1.usuario = usuarioMalaOnda;

  //VCP
  const eVcp1 = new Evento();
  eVcp1.titulo = 'Festival de Música del Lago';
  eVcp1.descripcion = 'Bandas locales al aire libre.';
  eVcp1.horaDesde = new Date('2025-12-05 18:00:00');
  eVcp1.horaHasta = new Date('2025-12-05 23:30:00');
  eVcp1.estado = 'Disponible';
  eVcp1.tags = [tagMusica, tagAireLibre];
  eVcp1.puntoDeInteres = pdiCostaneraVCP;
  eVcp1.usuario = muniCarlosPaz;
  await em.persistAndFlush(eVcp1);

  const eVcp2 = new Evento();
  eVcp2.titulo = 'Feria de Artesanos del Cucú';
  eVcp2.descripcion = 'Productores y artesanos regionales.';
  eVcp2.horaDesde = new Date('2025-09-20 10:00:00');
  eVcp2.horaHasta = new Date('2025-09-20 20:00:00');
  eVcp2.estado = 'Disponible';
  eVcp2.tags = [tagCultura];
  eVcp2.puntoDeInteres = pdiRelojCucu;
  eVcp2.usuario = muniCarlosPaz;
  await em.persistAndFlush(eVcp2);

  const eVcp3 = new Evento();
  eVcp3.titulo = 'Trail Nocturno en Aerosilla';
  eVcp3.descripcion = 'Carrera de montaña nocturna con postas.';
  eVcp3.horaDesde = new Date('2026-01-15 19:00:00');
  eVcp3.horaHasta = new Date('2026-01-16 01:00:00');
  eVcp3.estado = 'Disponible';
  eVcp3.tags = [tagDeporte, tagAireLibre];
  eVcp3.puntoDeInteres = pdiAerosilla;
  eVcp3.usuario = muniCarlosPaz;
  await em.persistAndFlush(eVcp3);

  //VILLA MARIA
  const eVm1 = new Evento();
  eVm1.titulo = 'Peñas Juveniles';
  eVm1.descripcion = 'Encuentro musical emergente.';
  eVm1.horaDesde = new Date('2026-01-20 19:00:00');
  eVm1.horaHasta = new Date('2026-01-21 00:30:00');
  eVm1.estado = 'Disponible';
  eVm1.tags = [tagMusica, tagCultura];
  eVm1.puntoDeInteres = pdiAnfiteatroVM;
  eVm1.usuario = muniVillaMaria;
  await em.persistAndFlush(eVm1);

  const eVm2 = new Evento();
  eVm2.titulo = 'Carrera 10K Costanera';
  eVm2.descripcion = 'Deporte y salud a la ribera del Ctalamochita.';
  eVm2.horaDesde = new Date('2025-10-12 08:00:00');
  eVm2.horaHasta = new Date('2025-10-12 11:30:00');
  eVm2.estado = 'Disponible';
  eVm2.tags = [tagDeporte, tagBienestar];
  eVm2.puntoDeInteres = pdiCostaneraVM;
  eVm2.usuario = muniVillaMaria;
  await em.persistAndFlush(eVm2);

  const eVm3 = new Evento();
  eVm3.titulo = 'Feria del Libro Local';
  eVm3.descripcion = 'Autores regionales y actividades educativas.';
  eVm3.horaDesde = new Date('2025-09-05 10:00:00');
  eVm3.horaHasta = new Date('2025-09-05 20:00:00');
  eVm3.estado = 'Disponible';
  eVm3.tags = [tagEducacion, tagCultura];
  eVm3.puntoDeInteres = pdiPlazaIndVM;
  eVm3.usuario = muniVillaMaria;
  await em.persistAndFlush(eVm3);

  //GODOY CRUZ
  const eGc1 = new Evento();
  eGc1.titulo = 'Milonga en la Plaza';
  eGc1.descripcion = 'Clases abiertas y música en vivo.';
  eGc1.horaDesde = new Date('2025-11-10 19:00:00');
  eGc1.horaHasta = new Date('2025-11-10 22:30:00');
  eGc1.estado = 'Disponible';
  eGc1.tags = [tagCultura, tagMusica];
  eGc1.puntoDeInteres = pdiPlazaGC;
  eGc1.usuario = muniGodoyCruz;
  await em.persistAndFlush(eGc1);

  const eGc2 = new Evento();
  eGc2.titulo = 'Obra de Teatro Provincial';
  eGc2.descripcion = 'Funciones especiales de la temporada.';
  eGc2.horaDesde = new Date('2025-09-18 20:00:00');
  eGc2.horaHasta = new Date('2025-09-18 22:00:00');
  eGc2.estado = 'Disponible';
  eGc2.tags = [tagCultura];
  eGc2.puntoDeInteres = pdiTeatroPlaza;
  eGc2.usuario = muniGodoyCruz;
  await em.persistAndFlush(eGc2);

  const eGc3 = new Evento();
  eGc3.titulo = 'Encuentro de Tecnología y Startups';
  eGc3.descripcion = 'Charlas y networking del ecosistema local.';
  eGc3.horaDesde = new Date('2026-03-05 09:00:00');
  eGc3.horaHasta = new Date('2026-03-05 18:00:00');
  eGc3.estado = 'Disponible';
  eGc3.tags = [tagTecnologia, tagEducacion];
  eGc3.puntoDeInteres = pdiPalmares;
  eGc3.usuario = muniGodoyCruz;
  await em.persistAndFlush(eGc3);

  //SAN RAFAEL
  const eSr1 = new Evento();
  eSr1.titulo = 'Festival del Parque';
  eSr1.descripcion = 'Música en vivo y gastronomía regional.';
  eSr1.horaDesde = new Date('2025-11-22 17:00:00');
  eSr1.horaHasta = new Date('2025-11-22 23:30:00');
  eSr1.estado = 'Disponible';
  eSr1.tags = [tagMusica, tagGastronomia];
  eSr1.puntoDeInteres = pdiParqueSR;
  eSr1.usuario = muniSanRafael;
  await em.persistAndFlush(eSr1);

  const eSr2 = new Evento();
  eSr2.titulo = 'Cruce a Nado en el Dique';
  eSr2.descripcion = 'Competencia de natación en aguas abiertas.';
  eSr2.horaDesde = new Date('2026-01-10 09:00:00');
  eSr2.horaHasta = new Date('2026-01-10 13:00:00');
  eSr2.estado = 'Disponible';
  eSr2.tags = [tagDeporte, tagAireLibre];
  eSr2.puntoDeInteres = pdiValleGrande;
  eSr2.usuario = muniSanRafael;
  await em.persistAndFlush(eSr2);

  const eSr3 = new Evento();
  eSr3.titulo = 'Noche de Museos';
  eSr3.descripcion = 'Visitas guiadas y muestras temporales.';
  eSr3.horaDesde = new Date('2025-09-18 18:00:00');
  eSr3.horaHasta = new Date('2025-09-18 22:00:00');
  eSr3.estado = 'Disponible';
  eSr3.tags = [tagCultura, tagEducacion];
  eSr3.puntoDeInteres = pdiMuseoSR;
  eSr3.usuario = muniSanRafael;
  await em.persistAndFlush(eSr3);

  //RIO GRANDE
  const eRg1 = new Evento();
  eRg1.titulo = 'Vigilia por Malvinas';
  eRg1.descripcion = 'Acto conmemorativo y muestras fotográficas.';
  eRg1.horaDesde = new Date('2026-04-01 20:00:00');
  eRg1.horaHasta = new Date('2026-04-02 01:00:00');
  eRg1.estado = 'Disponible';
  eRg1.tags = [tagCultura];
  eRg1.puntoDeInteres = pdiMalvinasRG;
  eRg1.usuario = muniRioGrande;
  await em.persistAndFlush(eRg1);

  const eRg2 = new Evento();
  eRg2.titulo = 'Trekking Cabo Domingo';
  eRg2.descripcion = 'Caminata interpretativa por acantilados.';
  eRg2.horaDesde = new Date('2025-11-14 09:30:00');
  eRg2.horaHasta = new Date('2025-11-14 13:30:00');
  eRg2.estado = 'Disponible';
  eRg2.tags = [tagAireLibre, tagDeporte];
  eRg2.puntoDeInteres = pdiCaboDomingo;
  eRg2.usuario = muniRioGrande;
  await em.persistAndFlush(eRg2);

  const eRg3 = new Evento();
  eRg3.titulo = 'Feria Ambiental';
  eRg3.descripcion = 'Charlas y stands educativos en la Reserva.';
  eRg3.horaDesde = new Date('2026-02-20 10:00:00');
  eRg3.horaHasta = new Date('2026-02-20 18:00:00');
  eRg3.estado = 'Disponible';
  eRg3.tags = [tagEducacion, tagBienestar];
  eRg3.puntoDeInteres = pdiReservaRG;
  eRg3.usuario = muniRioGrande;
  await em.persistAndFlush(eRg3);

  //TOLHUIN
  const eTol1 = new Evento();
  eTol1.titulo = 'Regata del Fagnano';
  eTol1.descripcion = 'Competencia de embarcaciones menores.';
  eTol1.horaDesde = new Date('2026-02-10 09:00:00');
  eTol1.horaHasta = new Date('2026-02-10 17:00:00');
  eTol1.estado = 'Disponible';
  eTol1.tags = [tagDeporte, tagAireLibre];
  eTol1.puntoDeInteres = pdiLagoFagnano;
  eTol1.usuario = muniTolhuin;
  await em.persistAndFlush(eTol1);

  const eTol2 = new Evento();
  eTol2.titulo = 'Paseo Gastronómico';
  eTol2.descripcion = 'Degustaciones y cocina regional.';
  eTol2.horaDesde = new Date('2025-12-15 11:00:00');
  eTol2.horaHasta = new Date('2025-12-15 18:00:00');
  eTol2.estado = 'Disponible';
  eTol2.tags = [tagGastronomia, tagCultura];
  eTol2.puntoDeInteres = pdiPanaderiaUnion;
  eTol2.usuario = muniTolhuin;
  await em.persistAndFlush(eTol2);

  const eTol3 = new Evento();
  eTol3.titulo = 'Caminata Saludable';
  eTol3.descripcion = 'Actividad guiada de bajo impacto para toda la familia.';
  eTol3.horaDesde = new Date('2025-10-05 10:00:00');
  eTol3.horaHasta = new Date('2025-10-05 12:30:00');
  eTol3.estado = 'Disponible';
  eTol3.tags = [tagBienestar, tagAireLibre];
  eTol3.puntoDeInteres = pdiPaseoLagoTol;
  eTol3.usuario = muniTolhuin;
  await em.persistAndFlush(eTol3);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // VALORACIONES----------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  async function addValoraciones3(pdi: PuntoDeInteres) {
    const triples = [
      { u: usuario4, estrellas: 5, txt: 'Hermoso lugar, super recomendable.' }, // Valentino
      { u: usuario5, estrellas: 4, txt: 'Buena experiencia, volvería.' }, // Joaquín
      { u: usuario6, estrellas: 5, txt: 'Excelente, muy bien cuidado.' }, // Gabriel
    ];
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = triples[i].txt;
      v.cantEstrellas = triples[i].estrellas;
      v.fechaHora = new Date(`2025-0${9 + i}-1${i} 15:0${i}:00`); // fechas cercanas y válidas
      v.puntoDeInteres = pdi;
      v.usuario = triples[i].u;
      await em.persistAndFlush(v);
    }
    // cuarta alterna con Messi si querés sumar variedad; pero pediste 3 por PDI
  }

  // CABA
  await addValoraciones3(pdiObelisco);
  await addValoraciones3(pdiTeatroColon);

  // Quilmes
  await addValoraciones3(pdiRiberaQuilmes);
  await addValoraciones3(pdiCatedralQuilmes);

  // Córdoba
  await addValoraciones3(pdiParqueSarmientoCba);
  await addValoraciones3(pdiBuenPastor);

  // Mendoza
  await addValoraciones3(pdiPlazaIndMza);
  await addValoraciones3(pdiParqueSanMartinMza);

  // Ushuaia
  await addValoraciones3(pdiFaroFinDelMundo);
  await addValoraciones3(pdiMuseoFinDelMundo);
  // Valoraciones Rosario
  for (const pdi of [
    pdiParqueIndependencia,
    pdiRioMio,
    pdiMonumentoBandera,
    pdiCCPE,
    pdiJardinNinos,
  ]) {
    const valoracion1 = new Valoracion();
    valoracion1.comentario = 'Hermoso lugar para visitar en familia.';
    valoracion1.cantEstrellas = 5;
    valoracion1.fechaHora = new Date('2025-03-15 15:00:00');
    valoracion1.puntoDeInteres = pdi;
    valoracion1.usuario = usuario4;
    await em.persistAndFlush(valoracion1);

    const valoracion2 = new Valoracion();
    valoracion2.comentario = 'Muy concurrido pero bien cuidado.';
    valoracion2.cantEstrellas = 4;
    valoracion2.fechaHora = new Date('2025-04-10 16:30:00');
    valoracion2.puntoDeInteres = pdi;
    valoracion2.usuario = usuario5;
    await em.persistAndFlush(valoracion2);

    const valoracion3 = new Valoracion();
    valoracion3.comentario = 'Me encantó la experiencia, volvería sin dudas.';
    valoracion3.cantEstrellas = 5;
    valoracion3.fechaHora = new Date('2025-05-20 18:00:00');
    valoracion3.puntoDeInteres = pdi;
    valoracion3.usuario = usuario7;
    await em.persistAndFlush(valoracion3);
  }

  // Valoraciones Funes
  for (const pdi of [pdiPaseoEstacionFunes, pdiClubKentucky]) {
    const valoracion1 = new Valoracion();
    valoracion1.comentario = 'Buen ambiente y actividades entretenidas.';
    valoracion1.cantEstrellas = 4;
    valoracion1.fechaHora = new Date('2025-06-05 14:00:00');
    valoracion1.puntoDeInteres = pdi;
    valoracion1.usuario = usuario6; // Gabriel
    await em.persistAndFlush(valoracion1);

    const valoracion2 = new Valoracion();
    valoracion2.comentario = 'Ideal para pasar la tarde con amigos.';
    valoracion2.cantEstrellas = 5;
    valoracion2.fechaHora = new Date('2025-07-02 17:00:00');
    valoracion2.puntoDeInteres = pdi;
    valoracion2.usuario = usuario4; // Valentino
    await em.persistAndFlush(valoracion2);

    const valoracion3 = new Valoracion();
    valoracion3.comentario =
      'Muy lindo, aunque podría mejorar la señalización.';
    valoracion3.cantEstrellas = 4;
    valoracion3.fechaHora = new Date('2025-07-18 12:00:00');
    valoracion3.puntoDeInteres = pdi;
    valoracion3.usuario = usuario5; // Joaquín
    await em.persistAndFlush(valoracion3);
  }

  const v1 = new Valoracion();
  (v1.comentario =
    'Pésimo lugar, muy sucio, descuidado y hace mucho frio. No lo recomiendo.'),
    (v1.cantEstrellas = 1);
  v1.fechaHora = new Date('2024-01-10 10:00:00');
  v1.puntoDeInteres = pdiParqueIndependencia; // Asignar el punto de interés "Parque de la Independencia"
  v1.usuario = usuarioMalaOnda; // Asignar el usuario "Pedro Mal
  const v2 = new Valoracion();
  v2.comentario =
    'Nada agradable, el lugar está en muy mal estado y no hay mantenimiento. Lo unico que tiene es forma de barco.';
  v2.cantEstrellas = 1;
  v2.fechaHora = new Date('2024-01-10 10:00:00');
  v2.puntoDeInteres = pdiMonumentoBandera; // Asignar el punto de interés "Parque de la Independencia"
  v2.usuario = usuarioMalaOnda; // Asignar el usuario "Pedro Mal
  const v3 = new Valoracion();
  v3.comentario =
    'Uno va para despejarse y relajarse, pero el lugar está sucio y descuidado. No lo recomiendo. Fui porque me gusta el rio y lo unico que vi fue una playa llena de basura.';
  v3.cantEstrellas = 1;
  v3.fechaHora = new Date('2024-01-10 10:00:00');
  v3.puntoDeInteres = pdiRioMio; // Asignar el punto de interés "Parque de la Independencia"
  v3.usuario = usuarioMalaOnda; // Asignar el usuario "Pedro Mal

  // Valoraciones (VCP)
  for (const pdi of [pdiRelojCucu, pdiCostaneraVCP, pdiAerosilla]) {
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = [
        'Excelente lugar',
        'Muy lindo paseo',
        'Buena experiencia',
      ][i];
      v.cantEstrellas = [5, 4, 4][i];
      v.fechaHora = new Date(`2025-0${5 + i}-0${i + 1} 12:00:00`);
      v.puntoDeInteres = pdi;
      v.usuario =
        poolUsuariosValoracion[(i + 3) % poolUsuariosValoracion.length];
      await em.persistAndFlush(v);
    }
  }

  //Valoraciones VILLA MARIA
  for (const pdi of [pdiAnfiteatroVM, pdiCostaneraVM, pdiPlazaIndVM]) {
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = ['Muy buen ambiente', 'Linda organización', 'Volvería'][i];
      v.cantEstrellas = [5, 4, 4][i];
      v.fechaHora = new Date(`2025-0${6 + i}-0${i + 2} 13:00:00`);
      v.puntoDeInteres = pdi;
      v.usuario =
        poolUsuariosValoracion[(i + 5) % poolUsuariosValoracion.length];
      await em.persistAndFlush(v);
    }
  }

  // Valoraciones GODOY CRUZ
  for (const pdi of [pdiPlazaGC, pdiTeatroPlaza, pdiPalmares]) {
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = ['Hermoso lugar', 'Buenas propuestas', 'Limpio y seguro'][
        i
      ];
      v.cantEstrellas = [5, 4, 4][i];
      v.fechaHora = new Date(`2025-0${7 + i}-1${i} 16:00:00`);
      v.puntoDeInteres = pdi;
      v.usuario =
        poolUsuariosValoracion[(i + 7) % poolUsuariosValoracion.length];
      await em.persistAndFlush(v);
    }
  }

  //Valoraciones SAN RAFAEL
  for (const pdi of [pdiParqueSR, pdiValleGrande, pdiMuseoSR]) {
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = ['Recomendado', 'Hermosos paisajes', 'Ideal en familia'][
        i
      ];
      v.cantEstrellas = [5, 5, 4][i];
      v.fechaHora = new Date(`2025-1${0 + i}-0${i + 1} 15:00:00`);
      v.puntoDeInteres = pdi;
      v.usuario =
        poolUsuariosValoracion[(i + 9) % poolUsuariosValoracion.length];
      await em.persistAndFlush(v);
    }
  }

  //Valoraciones RIO GRANDE
  for (const pdi of [pdiMalvinasRG, pdiReservaRG, pdiCaboDomingo]) {
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = ['Emotivo', 'Excelente guía', 'Paisajes únicos'][i];
      v.cantEstrellas = [5, 5, 4][i];
      v.fechaHora = new Date(`2025-1${0 + i}-0${i + 1} 11:30:00`);
      v.puntoDeInteres = pdi;
      v.usuario =
        poolUsuariosValoracion[(i + 2) % poolUsuariosValoracion.length];
      await em.persistAndFlush(v);
    }
  }

  //Valoraciones TOLHUIN
  for (const pdi of [pdiLagoFagnano, pdiPaseoLagoTol, pdiPanaderiaUnion]) {
    for (let i = 0; i < 3; i++) {
      const v = new Valoracion();
      v.comentario = [
        'Tranquilo y lindo',
        'Buena propuesta',
        'Rico y atención amable',
      ][i];
      v.cantEstrellas = [5, 4, 4][i];
      v.fechaHora = new Date(`2025-0${2 + i}-1${i} 14:30:00`);
      v.puntoDeInteres = pdi;
      v.usuario =
        poolUsuariosValoracion[(i + 1) % poolUsuariosValoracion.length];
      await em.persistAndFlush(v);
    }
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  console.log('🟡 pre-flush');
  em.flush(); // guardamos todos los cambios en la base de datos
  console.log('🟢 post-flush');
  console.timeEnd('⏱ seed');
  console.log('✅ Base de datos poblada correctamente');
  await orm.close(true); // <- cierra pool
  process.exit(0); // terminamos el proceso
}

main().catch(async (err) => {
  console.error('❌ Error al ejecutar el seed', err);
  await orm.close(true); // <- cierra pool
  process.exit(1);
});
