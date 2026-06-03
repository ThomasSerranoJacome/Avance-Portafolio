const btnCargar = document.getElementById('btnCargar');
const estado = document.getElementById('estado');
const contenedorEstudiantes = document.getElementById('contenedorEstudiantes');
const errorDiv = document.getElementById('error');
const log = document.getElementById('log');

async function cargarEstudiantes() {
    btnCargar.disabled = true;
    estado.textContent = 'Cargando...';

    try {
        const respuesta = await fetch('./datos.json');

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}`);
        }

        const estudiantes = await respuesta.json();
        estado.textContent = `${estudiantes.length} estudiantes cargados ✓`;

        estudiantes.forEach(est => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'section';

            const colorPromedio =
                est.promedio >= 4.5 ? '#06b6d4' :
                est.promedio >= 3.5 ? '#3b82f6' :
                '#94a3b8';

            tarjeta.innerHTML = `
                <img src="${est.foto}" alt="${est.nombre}"
                     style="width:60px; height:60px; border-radius:50%; border:2px solid white; object-fit:cover;">
                <p style="color:white; margin:5px 0;"><strong>${est.nombre}</strong></p>
                <span class="badge" style="background:${colorPromedio}">${est.promedio}</span>
                <span class="badge">${est.carrera}</span>
                <span class="badge">${est.ciudad}</span>
                <span class="badge">${est.edad} años</span>`;

            contenedorEstudiantes.appendChild(tarjeta);
        });

    } catch (err) {
        errorDiv.textContent = `No se pudo cargar: ${err.message}`;
        errorDiv.style.display = 'block';
    } finally {
        btnCargar.disabled = false;
    }
}

function mostrarLog(mensaje) {
    log.textContent = `${mensaje} | ${new Date().toLocaleTimeString()}`;
}

document.getElementById('demo-getId').addEventListener('click', () => {
    document.getElementById('titulo').style.color = '#9a17ce';
    mostrarLog('getElementById() → cambió el color del título');
});

document.getElementById('demo-queryAll').addEventListener('click', () => {
    document.querySelectorAll('.section').forEach(el => el.style.border = '2px solid #06b6d4');
    mostrarLog('querySelectorAll() → resaltó todas las secciones');
});

document.getElementById('demo-classList').addEventListener('click', () => {
    document.querySelectorAll('.badge').forEach(b => b.classList.toggle('badge'));
    mostrarLog('classList.toggle() → alternó estilos de badges');
});

document.getElementById('demo-atributos').addEventListener('click', () => {
    btnCargar.toggleAttribute('disabled');
    btnCargar.setAttribute('title', btnCargar.disabled ? 'Deshabilitado' : 'Habilitado');
    mostrarLog('toggleAttribute() → alternó el botón');
});

document.getElementById('demo-contenido').addEventListener('click', () => {
    const subtitulo = document.getElementById('subtitulo');
    if (subtitulo.textContent === 'Manipulación del DOM') {
        subtitulo.innerHTML = 'Ejemplo de <strong style="color:#06b6d4">Manipulación del DOM</strong>';
    } else {
        subtitulo.textContent = 'Manipulación del DOM';
    }
    mostrarLog('textContent vs innerHTML → cambió el subtítulo');
});

window.addEventListener('DOMContentLoaded', cargarEstudiantes);