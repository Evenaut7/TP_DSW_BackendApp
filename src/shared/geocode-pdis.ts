import { MikroORM } from '@mikro-orm/core';
import { PuntoDeInteres } from '../puntoDeInteres/puntoDeInteres.entity.js';
import { orm } from './db/orm.js';

async function geocodePDIs() {
  const em = orm.em.fork();
  
  const pdis = await em.find(PuntoDeInteres, { lat: null });
  
  for (const pdi of pdis) {
    await em.populate(pdi, ['localidad']);
    const address = `${pdi.calle} ${pdi.altura}, ${pdi.localidad.nombre}, Argentina`;
    
    try {
      // Usar servicio de geocoding (ej: Google Maps, OpenStreetMap)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        pdi.lat = parseFloat(data[0].lat);
        pdi.lng = parseFloat(data[0].lon);
        console.log(`✅ ${pdi.nombre}: ${pdi.lat}, ${pdi.lng}`);
      } else {
        console.warn(`⚠️ No se encontraron coordenadas para: ${pdi.nombre}`);
      }
      
      // Esperar 1 segundo entre requests (política de uso de Nominatim)
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error geocodificando ${pdi.nombre}:`, error);
    }
  }
  
  await em.flush();
  await orm.close();
  console.log('✅ Geocodificación completada');
}

geocodePDIs();