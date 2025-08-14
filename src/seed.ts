// src/seed.ts
import { orm } from './shared/db/orm.js';
import { Provincia } from './provincia/provincia.entity.js';
import { Localidad } from './localidad/localidad.entity.js';
import { Tag } from './tag/tag.entity.js';
import { PuntoDeInteres } from './puntoDeInteres/puntoDeInteres.entity.js';
import { Usuario } from './usuario/usuario.entity.js';
import { Historia } from './historia/historia.entity.js';
import { Valoracion } from './valoracion/valoracion.entity.js';
import { Evento } from './evento/evento.entity.js';

/*
async function main() {
  const em = orm.em.fork(); // creamos EntityManager aislado

  // PROVINCIAS -------------------------------------------------------------------------------
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
  // LOCALIDADES ----------------------------------------------------------------------------------------------------------------------------------------------
  const l0 = new Localidad();
  l0.nombre = 'CABA';
  l0.provincia = p1;
  await em.persistAndFlush(l0);
  const l1 = new Localidad();
  l1.nombre = 'Quilmes';
  l1.provincia = p1;
  await em.persistAndFlush(l1);
  const l2 = new Localidad();
  l2.nombre = 'Rosario';
  l2.provincia = p2;
  await em.persistAndFlush(l2);
  const l3 = new Localidad();
  l3.nombre = 'Funes';
  l3.provincia = p2;
  await em.persistAndFlush(l3);
  const l4 = new Localidad();
  l4.nombre = 'Cordoba';
  l4.provincia = p3;
  await em.persistAndFlush(l4);
  const l5 = new Localidad();
  l5.nombre = 'Mendoza';
  l5.provincia = p4;
  await em.persistAndFlush(l5);
  const l6 = new Localidad();
  l6.nombre = 'Ushuaia';
  l6.provincia = p5;
  await em.persistAndFlush(l6);
  // TAGS ----------------------------------------------------------------------------------------------------------------------------------------------
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
  // USUARIOS ----------------------------------------------------------------------------------------------------------------------------------------------
  const usuarioAdmin = new Usuario();
  usuarioAdmin.nombre = 'Administrador';
  usuarioAdmin.tipo = 'Creador';
  usuarioAdmin.cuit = '20-12345678-9';
  usuarioAdmin.gmail = 'administrador@gmail.com';
  usuarioAdmin.localidad = l1;
  await em.persistAndFlush(usuarioAdmin);
  const usuario2 = new Usuario();
  usuario2.nombre = 'Municipalidad de Rosario';
  usuario2.tipo = 'Creador';
  usuario2.cuit = '20-121578-9';
  usuario2.gmail = 'munirosario@gmail.com';
  usuario2.localidad = l2;
  await em.persistAndFlush(usuario2);
  const usuario3 = new Usuario();
  usuario3.nombre = 'Municipalidad de Funes';
  usuario3.tipo = 'Creador';
  usuario3.cuit = '20-55545454-9';
  usuario3.gmail = 'munifunes@gmail.com';
  usuario3.localidad = l3;
  await em.persistAndFlush(usuario3);
  const usuarioMalaOnda = new Usuario();
  usuarioMalaOnda.nombre = 'Pedro Malafama';
  usuarioMalaOnda.tipo = 'Usuario';
  usuarioMalaOnda.cuit = '20-99999999-9';
  usuarioMalaOnda.gmail = 'pedro.malafama@gmail.com';
  usuarioMalaOnda.localidad = l2;
  await em.persistAndFlush(usuarioMalaOnda);

  // PUNTO DE INTERES ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // 1. Parque de la Independencia
  const pdiParqueIndependencia = new PuntoDeInteres();
  pdiParqueIndependencia.nombre = 'Parque de la Independencia';
  pdiParqueIndependencia.descripcion =
    "Uno de los parques urbanos más grandes y antiguos de Rosario, hogar de museos, el Rosedal, el Laguito y el estadio del club Newell's Old Boys.";
  pdiParqueIndependencia.imagen = 'parque-independencia.jpg'; // Sustituir con una URL/ruta real
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
  pdiRioMio.imagen = 'rio-mio-costanera.jpg'; // Sustituir con una URL/ruta real
  pdiRioMio.calle = 'Av. Estanislao López';
  pdiRioMio.altura = 2000; // Altura aproximada
  pdiRioMio.privado = false;
  pdiRioMio.usuario = usuario2;
  pdiRioMio.localidad = l2;
  await em.persistAndFlush(pdiRioMio);

  // 3. Monumento Nacional a la Bandera
  const pdiMonumentoBandera = new PuntoDeInteres();
  pdiMonumentoBandera.nombre = 'Monumento Nacional a la Bandera';
  pdiMonumentoBandera.descripcion =
    'El ícono de Rosario y uno de los monumentos más importantes de Argentina, dedicado a la creación de la bandera.';
  pdiMonumentoBandera.imagen = 'monumento-bandera.jpg'; // Sustituir con una URL/ruta real
  pdiMonumentoBandera.calle = 'Córdoba';
  pdiMonumentoBandera.altura = 1300; // Altura aproximada
  pdiMonumentoBandera.privado = false;
  pdiMonumentoBandera.usuario = usuario2;
  pdiMonumentoBandera.localidad = l2;
  await em.persistAndFlush(pdiMonumentoBandera);
  // 4. Centro Cultural Parque de España
  const pdiCCPE = new PuntoDeInteres();
  pdiCCPE.nombre = 'Centro Cultural Parque de España';
  pdiCCPE.descripcion =
    'Un complejo arquitectónico y cultural a orillas del Paraná con teatros, exposiciones y espacios de encuentro.';
  pdiCCPE.imagen = 'ccpe.jpg'; // Sustituir con una URL/ruta real
  pdiCCPE.calle = 'Sarmiento';
  pdiCCPE.altura = 1201; // Altura aproximada
  pdiCCPE.privado = false;
  pdiCCPE.usuario = usuario2;
  pdiCCPE.localidad = l2;
  await em.persistAndFlush(pdiCCPE);

  // 5. El Jardín de los Niños
  const pdiJardinNinos = new PuntoDeInteres();
  pdiJardinNinos.nombre = 'El Jardín de los Niños';
  pdiJardinNinos.descripcion =
    'Un espacio lúdico y educativo dentro del Parque Independencia, con juegos, laberintos y propuestas interactivas para los más pequeños.';
  pdiJardinNinos.imagen = 'jardin-ninos.jpg'; // Sustituir con una URL/ruta real
  pdiJardinNinos.calle = 'Av. Presidente Perón';
  pdiJardinNinos.altura = 3300; // Altura aproximada
  pdiJardinNinos.privado = false;
  pdiJardinNinos.usuario = usuario2;
  pdiJardinNinos.localidad = l2;
  await em.persistAndFlush(pdiJardinNinos);

  // 1. Paseo de la Estación (Funes)
  const pdiPaseoEstacionFunes = new PuntoDeInteres();
  pdiPaseoEstacionFunes.nombre = 'Paseo de la Estación';
  pdiPaseoEstacionFunes.descripcion =
    'Antigua estación de tren convertida en espacio recreativo y cultural, con ferias y eventos.';
  pdiPaseoEstacionFunes.imagen = 'paseo-estacion-funes.jpg'; // Sustituir con una URL/ruta real
  pdiPaseoEstacionFunes.calle = 'Pedro Ríos';
  pdiPaseoEstacionFunes.altura = 1400; // Un número de altura aproximado o representativo
  pdiPaseoEstacionFunes.privado = false;
  pdiPaseoEstacionFunes.usuario = usuario3; // Asignar el usuario correspondiente
  pdiPaseoEstacionFunes.localidad = l3; // Asignar la localidad de Funes
  await em.persistAndFlush(pdiPaseoEstacionFunes);

  // 2. Club de Campo Kentucky (Funes) - Si es un punto de interés conocido, aunque sea privado
  const pdiClubKentucky = new PuntoDeInteres();
  pdiClubKentucky.nombre = 'Club de Campo Kentucky';
  pdiClubKentucky.descripcion =
    'Reconocido club de campo con campos de golf, instalaciones deportivas y áreas verdes en Funes.';
  pdiClubKentucky.imagen = 'club-kentucky-funes.jpg'; // Sustituir con una URL/ruta real
  pdiClubKentucky.calle = 'Ruta Nacional A012'; // O una calle interna si es relevante
  pdiClubKentucky.altura = 500; // Altura aproximada
  pdiClubKentucky.privado = true; // Este es un ejemplo de un punto de interés privado
  pdiClubKentucky.usuario = usuario3; // Asignar el usuario correspondiente
  pdiClubKentucky.localidad = l3; // Asignar la localidad de Funes
  await em.persistAndFlush(pdiClubKentucky);
  // VALORACION----------------------------------------------------------------------------------------------------------------------------------------------
  const v1 = new Valoracion();
  v1.comentario =
    'Pésimo lugar, muy sucio, descuidado y hace mucho frio. No lo recomiendo.';
  v1.cantEstrellas = 1;
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
  //HISTORIA-----------------------------------------------------------------------------------------------------------------------------------------------
  const h1 = new Historia();
  h1.fechaDesde = new Date('2024-01-15 08:01:54'); // Fecha de inicio de esta historia
  h1.fechaHasta = new Date('2024-03-30 08:02:26'); // Fecha de fin de esta historia (opcional, pero aquí la incluyo)
  h1.descripcion =
    'Inauguración de la serie de eventos culturales "Verano en la Estación", con música en vivo y ferias de artesanos locales. Gran afluencia de público y excelente repercusión.';
  h1.imagen = 'historia-paseo-estacion-verano.jpg'; // Sustituir con una URL/ruta real
  h1.puntoDeInteres = pdiPaseoEstacionFunes; // Asignar el punto de interés "Paseo de la Estación"
  await em.persistAndFlush(h1);
  //EVENTOS -------------------------------------------------------------------------------------------------------------------------------------------------
  const e1 = new Evento();
  e1.titulo = 'El cumple de Pedro';
  e1.descripcion = 'Tengo casa sola, apta para maraton de Harry Potter';
  e1.horaDesde = new Date('2025-08-15 20:00:00');
  e1.horaHasta = new Date('2024-08-16 06:00:00');
  e1.estado = 'Disponible';
  e1.tags = [tagTecnologia];
  e1.puntoDeInteres = pdiClubKentucky;
  e1.usuario = usuarioMalaOnda;

  em.flush(); // guardamos todos los cambios en la base de datos

  console.log('✅ Base de datos poblada correctamente');
//  process.exit(); // terminamos el proceso
}

main().catch((err) => {
  console.error('❌ Error al ejecutar el seed', err);
//  process.exit(1);
});
*/