// ===== APP.JS - Main Application =====
window.onerror = function(msg, url, line, col, error) {
   alert("CRITICAL ERROR: " + msg + "\nLine: " + line);
};
let currentPage = 'dashboard';
let editingId = null;
let modalType = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  DB.load();
  setupNav();
  updateWeeklyTitles();
  navigate('dashboard');
});

function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return 'No definido';
  if (dateStr === 'PERMANENTE' || dateStr === 'EN PROCESO') return dateStr;
  const cleanStr = String(dateStr).trim();
  const parts = cleanStr.split('T')[0].split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const [y, m, d] = parts;
    return `${d}/${m}/${y}`;
  }
  return cleanStr;
}

function setupNav() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.page));
  });
}

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + page));
  const renders = { 
    dashboard: renderDashboard, 
    docentes: renderDocentes, 
    estudiantes: renderEstudiantes, 
    horarios: renderHorarios, 
    alertas: renderAlertas,
    config: renderConfig, 
    novedades: renderNovedades,
    historial: renderHistorial
  };
  
  // Smooth transition
  const main = document.querySelector('.main');
  main.style.opacity = '0';
  main.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    if (renders[page]) renders[page]();
    updateConflictBadge();
    
    main.style.transition = 'all 0.4s ease';
    main.style.opacity = '1';
    main.style.transform = 'translateY(0)';
  }, 50);
}

function updateConflictBadge() {
  const c = detectConflicts();
  const badge = document.getElementById('conflict-badge');
  if (badge) { badge.textContent = c.length; badge.style.display = c.length > 0 ? 'inline' : 'none'; }
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} ${msg}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ===== DASHBOARD =====
function renderDashboard() {
  const conflicts = detectConflicts();
  const estudiantes = DB.estudiantes;
  const docentes = DB.docentes;

  const estudiantesActivos = estudiantes.filter(e => e.estado !== 'En Espera' && e.estado !== 'Próximo Ingreso');
  // Actualizar Stats
  document.getElementById('stat-docentes').textContent = docentes.length;
  document.getElementById('stat-estudiantes').textContent = estudiantesActivos.length;
  
  // Calcular vencimientos próximos (próximos 30 días o vencidos)
  const hoy = new Date();
  const vencidos = estudiantes.filter(e => {
    if (!e.certificadoVence) return false;
    const vence = new Date(e.certificadoVence);
    return vence <= hoy || (vence - hoy) < (30 * 24 * 60 * 60 * 1000);
  });
  const estudiantesEspera = Estudiantes.getAll().filter(e => e.estado === 'En Espera' || e.estado === 'Próximo Ingreso');
  
  document.getElementById('stat-vencimientos').textContent = vencidos.length;
  document.getElementById('stat-conflictos').textContent = conflicts.length;
  const statEsperaEl = document.getElementById('stat-espera');
  if (statEsperaEl) statEsperaEl.textContent = estudiantesEspera.length;

  // Lista de Estudiantes en Espera (Ordenada cronológicamente por prioridad médica)
  renderWaitList();

  // Lista de Conflictos
  const el = document.getElementById('conflict-list');
  if (conflicts.length === 0) {
    el.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--accent-green);">
      <div style="font-size: 3rem; margin-bottom: 10px;">✨</div>
      <h3 style="font-weight: 700;">Rutas Optimizadas</h3>
      <p style="opacity: 0.7;">No se detectaron conflictos de horarios ni traslados.</p>
    </div>`;
  } else {
    el.innerHTML = conflicts.map(c => `
      <div class="conflict-item ${c.severity === 'error' ? 'danger' : 'warning'}">
        <div style="font-size: 1.2rem;">${c.severity === 'error' ? '🚫' : '⚠️'}</div>
        <div class="conflict-text">
          <strong style="display: block; margin-bottom: 2px;">${c.message}</strong>
          <small style="opacity: 0.7;">Verificar en la grilla de horarios</small>
        </div>
      </div>`).join('');
  }

  // Escuelas de Origen
  renderOrigins();
}

function calculateWaitListPriority(e) {
  const hoy = new Date();
  
  // Fecha de remisión por la Escuela de Origen
  const remisionDate = e.fechaRemision ? new Date(e.fechaRemision) : hoy;
  const diasEsperando = Math.max(0, Math.floor((hoy - remisionDate) / (1000 * 60 * 60 * 24)));
  
  // Cálculo de vencimiento de cobertura médica (fechaCertificado + diasCobertura)
  let vencimientoDate = null;
  if (e.fechaCertificado && e.diasCobertura) {
    const certDate = new Date(e.fechaCertificado);
    vencimientoDate = new Date(certDate.getTime() + (parseInt(e.diasCobertura) * 24 * 60 * 60 * 1000));
  } else if (e.certificadoVence && e.certificadoVence !== 'PERMANENTE' && e.certificadoVence !== 'EN PROCESO') {
    vencimientoDate = new Date(e.certificadoVence);
  }
  
  let diasRestantesCobertura = vencimientoDate ? Math.floor((vencimientoDate - hoy) / (1000 * 60 * 60 * 24)) : 999;
  
  // Puntaje de prioridad: A mayor tiempo en espera y vencimiento más cercano = Mayor Urgencia
  let priorityScore = (diasEsperando * 2) - (diasRestantesCobertura > 0 ? diasRestantesCobertura : -50);
  
  let priorityLevel = 'NORMAL';
  let badgeClass = 'badge-success';
  let badgeIcon = '🟢';

  if (diasEsperando >= 5 || diasRestantesCobertura <= 15) {
    priorityLevel = 'URGENTE / ALTA PRIORIDAD';
    badgeClass = 'badge-danger';
    badgeIcon = '🔴';
  } else if (diasEsperando >= 2 || diasRestantesCobertura <= 30) {
    priorityLevel = 'PRIORIDAD MEDIA';
    badgeClass = 'badge-warning';
    badgeIcon = '🟡';
  }

  return {
    diasEsperando,
    diasRestantesCobertura,
    vencimientoDate,
    priorityScore,
    priorityLevel,
    badgeClass,
    badgeIcon
  };
}

function renderWaitList() {
  const el = document.getElementById('wait-list-container');
  if (!el) return;

  const estudiantesEspera = Estudiantes.getAll().filter(e => e.estado === 'En Espera' || e.estado === 'Próximo Ingreso');

  const statEsperaEl = document.getElementById('stat-espera');
  if (statEsperaEl) statEsperaEl.textContent = estudiantesEspera.length;

  if (estudiantesEspera.length === 0) {
    el.innerHTML = `
      <div style="text-align: center; padding: 25px 15px; color: var(--text-secondary);">
        <div style="font-size: 2rem; margin-bottom: 6px;">✨</div>
        <strong style="display:block; font-size:0.95rem; color:var(--text-main);">Sin Estudiantes en Espera</strong>
        <span style="font-size: 0.8rem; opacity: 0.8;">Todos los estudiantes derivados tienen docentes y horarios asignados.</span>
      </div>`;
    return;
  }

  const evaluated = estudiantesEspera.map(e => ({
    student: e,
    metrics: calculateWaitListPriority(e)
  }));

  // Ordenar cronológicamente de mayor urgencia a menor urgencia
  evaluated.sort((a, b) => b.metrics.priorityScore - a.metrics.priorityScore);

  el.innerHTML = evaluated.map(({ student: e, metrics: m }) => {
    const remisionFormatted = formatDateDDMMYYYY(e.fechaRemision || e.fechaCertificado || '');
    const certFormatted = formatDateDDMMYYYY(e.fechaCertificado || e.certificadoVence || '');
    const venceFormatted = m.vencimientoDate ? formatDateDDMMYYYY(m.vencimientoDate.toISOString().slice(0, 10)) : (formatDateDDMMYYYY(e.certificadoVence) || 'S/D');

    return `
      <div class="card" style="padding: 16px; margin-bottom: 12px; border-left: 5px solid ${m.badgeClass === 'badge-danger' ? 'var(--danger)' : m.badgeClass === 'badge-warning' ? 'var(--warning)' : 'var(--success)'}; background: rgba(255, 255, 255, 0.95);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-size: 1rem; color: var(--text-main);">${e.nombre}</strong>
              <span class="badge ${m.badgeClass}" style="font-size: 0.65rem; font-weight: 800;">${m.badgeIcon} ${m.priorityLevel}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 3px;">
              🏫 <strong>${e.escuelaOrigen || 'Escuela de Origen N/D'}</strong> • ${e.grado || 'Grado N/D'} • 📍 ${e.barrio || 'Sin barrio'}
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-primary btn-sm" onclick="openActivarEstudianteModal('${e.id}')" style="font-size: 0.75rem; font-weight: 700; padding: 5px 10px;">
              🎓 Asignar a Docente
            </button>
            <button class="btn btn-secondary btn-sm" onclick="openEstudianteEsperaModal('${e.id}')" title="Editar ficha de espera">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="deleteEstudiante('${e.id}')" title="Eliminar de espera">🗑️</button>
          </div>
        </div>

        <!-- Cronología y Cobertura Médica -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-top: 12px; padding: 10px; background: var(--bg-main); border-radius: 8px; font-size: 0.75rem;">
          <div>
            <span style="color: var(--text-secondary); display: block; text-transform: uppercase; font-size: 0.62rem; font-weight: 700;">📅 Remisión Origen</span>
            <strong>${remisionFormatted}</strong> <span style="opacity: 0.75;">(Hace ${m.diasEsperando} días)</span>
          </div>
          <div>
            <span style="color: var(--text-secondary); display: block; text-transform: uppercase; font-size: 0.62rem; font-weight: 700;">🩺 Certificado Médico</span>
            <strong>${certFormatted}</strong> <span style="opacity: 0.75;">(${e.diasCobertura || 30} días reposo)</span>
          </div>
          <div>
            <span style="color: var(--text-secondary); display: block; text-transform: uppercase; font-size: 0.62rem; font-weight: 700;">⏳ Vencimiento Cobertura</span>
            <strong style="${m.diasRestantesCobertura < 15 ? 'color: var(--danger); font-weight: 800;' : ''}">${venceFormatted}</strong>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderOrigins() {
  const el = document.getElementById('origins-list');
  if (!el) return;
  
  const origins = {};
  DB.estudiantes.forEach(e => {
    const esc = e.escuelaOrigen || 'Otra / Sede';
    origins[esc] = (origins[esc] || 0) + 1;
  });

  const sorted = Object.entries(origins).sort((a, b) => b[1] - a[1]);
  const total = DB.estudiantes.length;

  el.innerHTML = sorted.map(([esc, count]) => `
    <div style="margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 5px;">
        <span>${esc}</span>
        <span>${count}</span>
      </div>
      <div style="height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden;">
        <div style="height: 100%; width: ${(count/total)*100}%; background: var(--primary); border-radius: 10px;"></div>
      </div>
    </div>
  `).join('');
}

let activeAlertasTab = 'Secundaria';

function setAlertasTab(tab) {
  activeAlertasTab = tab;
  renderAlertas();
}

function renderAlertas() {
  const el = document.getElementById('alertas-list');
  const hoy = new Date();
  
  const allAlerts = DB.estudiantes.map(e => {
    if (!e.certificadoVence) return { ...e, status: 'none', days: 999 };
    if (e.certificadoVence === 'PERMANENTE') return { ...e, status: 'permanente', days: 9999 };
    const vence = new Date(e.certificadoVence);
    const diff = Math.ceil((vence - hoy) / (1000 * 60 * 60 * 24));
    return { ...e, status: diff < 0 ? 'vencido' : (diff < 15 ? 'critico' : (diff < 30 ? 'proximo' : 'ok')), days: diff };
  }).sort((a, b) => a.days - b.days);

  const niveles = ['Secundaria'];
  let html = `<div style="display:flex; justify-content:flex-start; align-items:center; margin-bottom: 20px;">
    <div style="display:flex; gap:10px; overflow-x: auto; padding-bottom: 5px;">`;
  niveles.forEach(nivel => {
    const alertsForNivel = allAlerts.filter(a => a.nivel === nivel);
    const isActive = activeAlertasTab === nivel;
    html += `
      <button class="btn ${isActive ? 'btn-primary' : 'btn-secondary'}" 
              onclick="setAlertasTab('${nivel}')"
              style="border-radius: 20px; white-space: nowrap; padding: 6px 16px;">
        ${nivel} <span style="background: ${isActive ? 'rgba(255,255,255,0.2)' : 'var(--border-color)'}; padding: 2px 6px; border-radius: 10px; font-size: 0.75rem; margin-left: 6px; color: ${isActive ? '#fff' : 'var(--text-main)'}">${alertsForNivel.length}</span>
      </button>
    `;
  });
  html += `</div></div>`;

  const activeAlerts = allAlerts.filter(a => a.nivel === activeAlertasTab);

  if (activeAlerts.length === 0) {
    html += `<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No hay alertas médicas pendientes para este nivel.</p>`;
  } else {
    html += `
      <table class="data-table" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 2px solid var(--border-color);">
            <th style="padding: 12px;">Estudiante</th>
            <th style="padding: 12px;">Nivel</th>
            <th style="padding: 12px;">Vencimiento</th>
            <th style="padding: 12px;">Estado</th>
            <th style="padding: 12px;">Acción</th>
          </tr>
        </thead>
        <tbody>
          ${activeAlerts.map(a => {
            let badgeClass = 'badge-secondary';
            let badgeText = '';
            if (a.status === 'vencido') { badgeClass = 'badge-danger'; badgeText = `VENCIDO (hace ${Math.abs(a.days)} días)`; }
            else if (a.status === 'critico') { badgeClass = 'badge-warning'; badgeText = `CRÍTICO (${a.days} días)`; }
            else if (a.status === 'proximo') { badgeClass = 'badge-primary'; badgeText = `PRÓXIMO (${a.days} días)`; }
            else if (a.status === 'permanente') { badgeClass = 'badge-success'; badgeText = 'PERMANENTE'; }
            else if (a.status === 'ok') { badgeClass = 'badge-success'; badgeText = `AL DÍA (${a.days} días)`; }
            else { badgeText = 'SIN CARGAR'; }

            return `
            <tr style="border-bottom: 1px solid var(--border-color); ${a.status === 'vencido' ? 'background: rgba(239, 68, 68, 0.08);' : ''}">
              <td style="padding: 12px;"><strong>${a.nombre}</strong></td>
              <td style="padding: 12px;"><span class="badge badge-secondary">${a.nivel}</span></td>
              <td style="padding: 12px; ${a.status === 'vencido' ? 'color: var(--danger); font-weight: bold;' : ''}">${formatDateDDMMYYYY(a.certificadoVence)}</td>
              <td style="padding: 12px;">
                <span class="badge ${badgeClass}">${badgeText}</span>
              </td>
              <td style="padding: 12px;">
                <button class="btn btn-secondary btn-sm" onclick="showToast('Aviso enviado a familia de ${a.nombre}')">📱 Avisar</button>
              </td>
            </tr>
          `}).join('')}
        </tbody>
      </table>
    `;
  }
  el.innerHTML = html;
}

function showDetailModal(estado, nivel = null) {
  const modal = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const saveBtn = document.getElementById('modal-save-btn');
  
  if (saveBtn) saveBtn.style.display = 'none';
  
  let estudiantes = Estudiantes.getAll();
  if (estado === 'Activo') {
    estudiantes = estudiantes.filter(e => e.estado !== 'Alta Médica' && e.estado !== 'Próximo Ingreso');
  } else {
    estudiantes = estudiantes.filter(e => e.estado === estado);
  }
  
  if (nivel) {
    estudiantes = estudiantes.filter(e => e.nivel === nivel);
    title.textContent = `Estudiantes ${estado === 'Activo' ? 'Activos' : estado} - ${nivel}`;
  } else {
    title.textContent = `Listado de Estudiantes: ${estado === 'Activo' ? 'Activos' : estado}`;
  }

  if (estudiantes.length === 0) {
    body.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-secondary)">No hay estudiantes registrados en esta categoría.</p>`;
  } else {
    body.innerHTML = `
      <div style="max-height: 400px; overflow-y: auto;">
        <table style="width:100%; border-collapse: collapse; font-size:0.9rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border); text-align:left;">
              <th style="padding:10px;">Nombre</th>
              <th style="padding:10px;">Nivel</th>
              <th style="padding:10px;">${estado === 'Alta Médica' ? 'Fecha Alta' : 'Barrio'}</th>
            </tr>
          </thead>
          <tbody>
            ${estudiantes.map(e => `
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding:10px;"><strong>${e.nombre}</strong></td>
                <td style="padding:10px;"><span class="badge-nivel ${e.nivel?.toLowerCase()}">${e.nivel}</span></td>
                <td style="padding:10px;">${estado === 'Alta Médica' ? (e.fechaAlta || '-') : (e.barrio || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
  
  modal.classList.add('active');
}

// ===== DOCENTES =====
let activeDocentesTab = 'Secundaria';

function setDocentesTab(tab) {
  activeDocentesTab = tab;
  renderDocentes();
}
function renderDocentes() {
  const docs = Docentes.getAll();
  const el = document.getElementById('docentes-list');
  if (!docs.length) {
    el.innerHTML = `<div class="empty-state"><div class="icon">👨‍🏫</div><h3>Sin docentes</h3><p>Agregá el primer docente.</p></div>`;
    return;
  }
  
  const niveles = ['Secundaria'];
  let html = `<div style="display:flex; gap:10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 5px;">`;
  niveles.forEach(nivel => {
    const isActive = activeDocentesTab === nivel;
    const count = docs.filter(d => d.nivel === nivel).length;
    html += `
      <button class="btn ${isActive ? 'btn-primary' : 'btn-secondary'}" 
              onclick="setDocentesTab('${nivel}')"
              style="border-radius: 20px; white-space: nowrap; padding: 6px 16px;">
        ${nivel} <span style="background: ${isActive ? 'rgba(255,255,255,0.2)' : 'var(--border-color)'}; padding: 2px 6px; border-radius: 10px; font-size: 0.75rem; margin-left: 6px;">${count}</span>
      </button>
    `;
  });
  html += `</div>`;

  const activeDocs = docs.filter(d => d.nivel === activeDocentesTab);
  if (!activeDocs.length) {
    html += `<div style="padding: 40px; text-align: center; color: var(--text-secondary);"><p>No hay docentes registrados en esta categoría.</p></div>`;
  } else {
    html += `<div class="card" style="overflow-x: auto;">
      <table class="data-table" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="text-align: left; border-bottom: 2px solid var(--border-color);">
          <th style="padding: 12px;">CUIL/DNI</th>
          <th style="padding: 12px;">APELLIDO Y NOMBRE</th>
          <th style="padding: 12px;">MATERIA / ROL</th>
          <th style="padding: 12px;">JORNADA LABORAL</th>
          <th style="padding: 12px; text-align: right;">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        ${activeDocs.map(d => `
          <tr style="border-bottom: 1px solid var(--border-color); ${d.status ? 'opacity: 0.7; background: rgba(0,0,0,0.02);' : ''}">
            <td style="padding: 12px; font-family: monospace; font-size: 0.8rem; color: var(--text-secondary);">
              ${d.cuil || '-'}<br>${d.dni || '-'}
            </td>
            <td style="padding: 12px;">
              <strong>${d.nombre}</strong>
              ${d.status ? `<br><small style="color: var(--accent-pink); font-weight: 700;">📍 ${d.status.toUpperCase()}</small>` : ''}
            </td>
            <td style="padding: 12px;">
              <span class="badge badge-primary">${d.materia}</span>
            </td>
            <td style="padding: 12px; font-size: 0.8rem;">
              ${DIAS.map(dia => {
                const j = d.jornada?.[dia];
                return j ? `<div style="margin-bottom:2px"><strong>${dia.slice(0,2)}:</strong> ${j.i}-${j.f}</div>` : '';
              }).join('') || '<span style="opacity:0.5">No definida</span>'}
            </td>
            <td style="padding: 12px; text-align: right;">
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary btn-sm" onclick="openDocenteModal('${d.id}')" title="Editar">✏️</button>
                <button class="btn btn-danger btn-sm" onclick="deleteDocente('${d.id}')" title="Eliminar">🗑️</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
      </table>
    </div>`;
  }
  el.innerHTML = html;
}

function openDocenteModal(id = null) {
  editingId = id;
  modalType = 'docente';
  const modal = document.getElementById('modal-overlay');
  const d = id ? Docentes.getById(id) : null;
  document.getElementById('modal-title').textContent = d ? 'Editar Docente' : 'Nuevo Docente';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Nombre Completo</label>
      <input class="form-input" id="f-nombre" value="${d?.nombre || ''}" placeholder="Apellido y Nombre">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">CUIL</label>
        <input class="form-input" id="f-cuil" value="${d?.cuil || ''}" placeholder="Sin guiones">
      </div>
      <div class="form-group">
        <label class="form-label">DNI</label>
        <input class="form-input" id="f-dni" value="${d?.dni || ''}" placeholder="Solo números">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input class="form-input" id="f-email" type="email" value="${d?.email || ''}" placeholder="correo@ejemplo.com">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Materia / Rol</label>
        <input class="form-input" id="f-materia" value="${d?.materia || ''}" placeholder="Ej: Matemática">
      </div>
      <div class="form-group">
        <label class="form-label">Estado Especial (Ej: Comisión)</label>
        <input class="form-input" id="f-status" value="${d?.status || ''}" placeholder="Opcional">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Nivel</label>
      <select class="form-select" id="f-nivel">
        ${['Secundaria'].map(n => `<option ${d?.nivel === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Jornada Laboral</label>
      <div id="jornada-fields">
        ${DIAS.map(dia => {
          const j = d?.jornada?.[dia];
          return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <label style="width:90px;font-size:0.8rem;color:var(--text-secondary)">${dia}</label>
            <input class="form-input" type="time" id="j-${dia}-i" value="${j?.i || ''}" style="width:auto">
            <span style="color:var(--text-muted)">a</span>
            <input class="form-input" type="time" id="j-${dia}-f" value="${j?.f || ''}" style="width:auto">
          </div>`;
        }).join('')}
      </div>
    </div>`;
  modal.classList.add('active');
}

function editDocente(id) { openDocenteModal(id); }

function saveModal() {
  if (modalType === 'docente') saveDocente();
  else if (modalType === 'estudiante') saveEstudiante();
  else if (modalType === 'asignacion') saveAsignacion();
  else if (modalType === 'novedad') saveNovedad();
}

function saveDocente() {
  const nombre = document.getElementById('f-nombre').value.trim();
  if (!nombre) { showToast('El nombre es obligatorio', 'error'); return; }
  
  const cuil = document.getElementById('f-cuil').value.trim();
  const dni = document.getElementById('f-dni').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const materia = document.getElementById('f-materia').value.trim();
  const status = document.getElementById('f-status').value.trim();
  const nivel = document.getElementById('f-nivel').value;
  
  const jornada = {};
  DIAS.forEach(dia => {
    const i = document.getElementById(`j-${dia}-i`).value;
    const f = document.getElementById(`j-${dia}-f`).value;
    if (i && f) jornada[dia] = { i, f };
  });

  const docenteData = { nombre, cuil, dni, email, materia, status, nivel, jornada };

  if (editingId) { 
    Docentes.update(editingId, docenteData); 
    showToast('Docente actualizado'); 
  } else { 
    Docentes.add(docenteData); 
    showToast('Docente creado'); 
  }
  closeModal();
  renderDocentes();
  updateConflictBadge();
}

function deleteDocente(id) {
  if (!confirm('¿Eliminar este docente y todas sus asignaciones?')) return;
  Docentes.delete(id);
  showToast('Docente eliminado');
  renderDocentes();
  updateConflictBadge();
}

function openEstudiantesDeDocenteModal(docenteId) {
  const d = Docentes.getById(docenteId);
  if (!d) return;
  const asigs = Asignaciones.getByDocente(docenteId);
  const uniqueEstIds = [...new Set(asigs.map(a => a.estudianteId))];
  const estudiantesList = uniqueEstIds.map(id => Estudiantes.getById(id)).filter(Boolean);

  modalType = 'ver_estudiantes';
  editingId = null;
  const modal = document.getElementById('modal-overlay');
  document.getElementById('modal-title').textContent = `Estudiantes de ${d.nombre}`;
  const saveBtn = document.getElementById('modal-save-btn');
  if (saveBtn) saveBtn.style.display = 'none';

  if (estudiantesList.length === 0) {
    document.getElementById('modal-body').innerHTML = `<p style="color:var(--text-secondary);text-align:center;padding:20px;">Este docente no tiene estudiantes asignados en la grilla de horarios.</p>`;
  } else {
    const otrosDocentes = Docentes.getAll().filter(doc => doc.id !== docenteId);
    let html = `<div style="display:flex;flex-direction:column;gap:12px;">`;
    
    estudiantesList.forEach(e => {
      const eAsigs = asigs.filter(a => a.estudianteId === e.id);
      html += `<div style="background:var(--surface-light);padding:12px;border-radius:8px;display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong>${e.nombre}</strong>
          <span style="font-size:0.8rem;color:var(--text-secondary)">${eAsigs.length} clases asignadas</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <select class="form-select" id="derivar-select-${e.id}" style="flex:1">
            <option value="">Derivar a otro docente...</option>
            ${otrosDocentes.map(od => `<option value="${od.id}">${od.nombre} (${od.materia})</option>`).join('')}
          </select>
          <button class="btn btn-secondary btn-sm" onclick="derivarEstudiante('${e.id}', '${docenteId}')">Derivar</button>
        </div>
      </div>`;
    });
    html += `</div>`;
    document.getElementById('modal-body').innerHTML = html;
  }
  modal.classList.add('active');
}

function derivarEstudiante(estudianteId, fromDocenteId) {
  const selectEl = document.getElementById(`derivar-select-${estudianteId}`);
  const toDocenteId = selectEl.value;
  if (!toDocenteId) {
    showToast('Seleccioná un docente destino', 'warning');
    return;
  }
  const toDocente = Docentes.getById(toDocenteId);
  const est = Estudiantes.getById(estudianteId);
  if (!confirm(`¿Estás seguro de derivar a ${est?.nombre} al docente ${toDocente?.nombre}? Esto moverá todos sus horarios actuales.`)) return;

  const asigsToMove = Asignaciones.getAll().filter(a => a.estudianteId === estudianteId && a.docenteId === fromDocenteId);
  asigsToMove.forEach(a => {
    a.docenteId = toDocenteId;
    Asignaciones.update(a.id, a);
  });

  showToast(`${est?.nombre} derivado a ${toDocente?.nombre} exitosamente.`);
  updateConflictBadge();
  openEstudiantesDeDocenteModal(fromDocenteId);
  if (currentPage === 'horarios') renderHorarios();
  if (currentPage === 'docentes') renderDocentes();
}

// ===== ESTUDIANTES =====
let activeEstudiantesTab = 'Activos';

function setEstudiantesTab(tab) {
  activeEstudiantesTab = tab;
  renderEstudiantes();
}

function renderEstudiantes() {
  const allEstudiantes = Estudiantes.getAll();
  const el = document.getElementById('estudiantes-list');
  if (!allEstudiantes.length) {
    el.innerHTML = `<div class="empty-state"><div class="icon">🎓</div><h3>Sin estudiantes</h3><p>Agregá el primer estudiante.</p></div>`;
    return;
  }
  
  const estsActivos = allEstudiantes.filter(e => e.estado !== 'En Espera' && e.estado !== 'Próximo Ingreso');
  const estsEspera = allEstudiantes.filter(e => e.estado === 'En Espera' || e.estado === 'Próximo Ingreso');
  
  // Render tabs para separar 100% Matrícula Activa de Lista de Espera
  let html = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; flex-wrap:wrap; gap:10px;">
    <div style="display:flex; gap:10px;">
      <button class="btn ${activeEstudiantesTab === 'Activos' ? 'btn-primary' : 'btn-secondary'}" 
              onclick="setEstudiantesTab('Activos')"
              style="border-radius: 20px; white-space: nowrap; padding: 6px 18px; font-weight: 700;">
        🎓 Matrícula Activa (${estsActivos.length})
      </button>
      <button class="btn ${activeEstudiantesTab === 'Espera' ? 'btn-primary' : 'btn-secondary'}" 
              onclick="setEstudiantesTab('Espera')"
              style="border-radius: 20px; white-space: nowrap; padding: 6px 18px; font-weight: 700; background: ${activeEstudiantesTab === 'Espera' ? 'var(--warning)' : ''}; color: ${activeEstudiantesTab === 'Espera' ? '#000' : ''};">
        ⏳ Lista de Espera (${estsEspera.length})
      </button>
    </div>
    ${activeEstudiantesTab === 'Activos' ? `<button class="btn btn-secondary" onclick="exportWordPorNivel()" style="background-color: #2b5797; color: white; border-radius: 20px;">📄 Generar Word (Matrícula Activa)</button>` : ''}
  </div>`;

  if (activeEstudiantesTab === 'Espera') {
    html += `<div id="wait-list-container-tab"></div>`;
    el.innerHTML = html;
    setTimeout(() => {
      const waitContainer = document.getElementById('wait-list-container-tab');
      if (waitContainer) {
        const origEl = document.getElementById('wait-list-container');
        renderWaitList();
        waitContainer.innerHTML = origEl ? origEl.innerHTML : '';
      }
    }, 10);
    return;
  }
  
  // Render solo Matrícula Activa
  const activeEsts = estsActivos;
  
  if (activeEsts.length === 0) {
    html += `<div style="padding: 40px; text-align: center; color: var(--text-secondary);"><p>No hay estudiantes en esta categoría.</p></div>`;
  } else {
    html += `<div class="data-grid">
      ${activeEsts.map(e => {
        const asigs = Asignaciones.getByEstudiante(e.id);
        const asigsCount = asigs.length;
        return `
        <div class="data-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main); margin-bottom: 2px;">${e.nombre}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">${e.barrio || 'Sin barrio'}</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px;">
              <span class="badge badge-primary">${e.nivel}</span>
              ${e.alertaClases ? `<span class="badge badge-warning" style="font-size:0.6rem; cursor:help;" title="${e.detalleAlerta || 'Clases pendientes'}">⚠️ FALTÓ</span>` : ''}
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
            <div style="background: #f8fafc; padding: 10px; border-radius: 10px;">
              <div style="font-size: 0.65rem; color: var(--text-secondary); text-transform: uppercase;">Escuela</div>
              <div style="font-size: 0.85rem; font-weight: 700;">${e.escuelaOrigen || '-'}</div>
            </div>
            <div style="background: #f8fafc; padding: 10px; border-radius: 10px;">
              <div style="font-size: 0.65rem; color: var(--text-secondary); text-transform: uppercase;">Clases</div>
              <div style="font-size: 0.85rem; font-weight: 700;">${asigsCount} por semana</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
               <span>Certificado:</span>
               <span style="font-weight: 700; color: ${
                 e.certificadoVence === 'PERMANENTE' ? 'var(--success)' :
                 e.certificadoVence === 'EN PROCESO' ? 'var(--warning)' :
                 (new Date(e.certificadoVence) < new Date() ? 'var(--danger)' : 'var(--success)')
               }">${formatDateDDMMYYYY(e.certificadoVence)}</span>
               <button class="btn btn-secondary btn-sm" onclick="quickUpdateCertificado('${e.id}')" style="padding: 2px 8px; font-size: 0.7rem; font-weight: 600; border-radius: 6px;" title="Actualizar fecha de vencimiento">📅 Actualizar</button>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary btn-sm" onclick="editEstudiante('${e.id}')">✏️ Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteEstudiante('${e.id}')">🗑️</button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }
  
  el.innerHTML = html;
}

function openEstudianteModal(id = null) {
  editingId = id;
  modalType = 'estudiante';
  const modal = document.getElementById('modal-overlay');
  const e = id ? Estudiantes.getById(id) : null;
  document.getElementById('modal-title').textContent = e ? 'Editar Estudiante' : 'Nuevo Estudiante';
  document.getElementById('modal-body').innerHTML = `
    <div style="display:flex; gap:15px; margin-bottom:15px; align-items:center;">
      <div id="f-photo-preview" style="width:80px; height:80px; border:2px dashed var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden; background:var(--bg-secondary);">
        ${e?.foto ? `<img src="${e.foto}" style="width:100%; height:100%; object-fit:cover;">` : '<span style="font-size:1.5rem;">👤</span>'}
      </div>
      <div style="flex:1">
        <label class="form-label">Foto del Estudiante</label>
        <input type="file" id="f-photo-input" accept="image/*" style="display:none" onchange="handlePhotoUpload(this)">
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('f-photo-input').click()">📷 Seleccionar Imagen</button>
        <p style="font-size:0.7rem; color:var(--text-secondary); margin-top:5px;">Tamaño sugerido: cuadrado (1:1)</p>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Nombre completo</label><input class="form-input" id="f-nombre" value="${e?.nombre || ''}"></div>
    <div class="form-group"><label class="form-label">Escuela de Origen</label><input class="form-input" id="f-escuela" value="${e?.escuelaOrigen || ''}" placeholder="Ej: Escuela N° 161"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Grado/Año</label><input class="form-input" id="f-grado" value="${e?.grado || ''}"></div>
      <div class="form-group"><label class="form-label">Nivel</label>
        <select class="form-select" id="f-nivel">${['Secundaria'].map(n => `<option ${e?.nivel === n ? 'selected' : ''}>${n}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Barrio</label><input class="form-input" id="f-barrio" value="${e?.barrio || ''}"></div>
      <div class="form-group"><label class="form-label">Teléfono Familia</label><input class="form-input" id="f-telefono" value="${e?.telefono || ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Teléfono de Emergencias</label><input class="form-input" id="f-emergencia" value="${e?.emergencia || ''}" placeholder="Ej: 2974XXXXXX"></div>
      <div class="form-group"><label class="form-label">Vencimiento Certificado</label><input class="form-input" id="f-vence" value="${e?.vencimientoCertificado || ''}" placeholder="Ej: ABRIL 23, 2026"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Wi-Fi</label>
        <select class="form-select" id="f-wifi">
          <option value="SI" ${e?.wifi === 'SI' ? 'selected' : ''}>SI</option>
          <option value="NO" ${e?.wifi === 'NO' ? 'selected' : ''}>NO</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">3G/4G</label>
        <select class="form-select" id="f-conectividad">
          <option value="SI" ${e?.conectividad === 'SI' ? 'selected' : ''}>SI</option>
          <option value="NO" ${e?.conectividad === 'NO' ? 'selected' : ''}>NO</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Domicilio</label><input class="form-input" id="f-domicilio" value="${e?.domicilio || ''}"></div>
      <div class="form-group"><label class="form-label">Coordenadas GPS (Lat, Lng)</label><input class="form-input" id="f-coordenadas" placeholder="-45.81595, -67.45211" value="${e?.coordenadas ? `${e.coordenadas.lat}, ${e.coordenadas.lng}` : ''}"></div>
    </div>
    <div class="form-row" style="background:var(--bg-secondary); padding: 10px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid var(--danger);">
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Estado</label>
        <select class="form-select" id="f-estado" onchange="document.getElementById('f-fecha-alta-container').style.display = this.value === 'Alta Médica' ? 'block' : 'none'">
          <option value="Activo" ${e?.estado !== 'Alta Médica' && e?.estado !== 'Próximo Ingreso' ? 'selected' : ''}>Activo (En clases)</option>
          <option value="Próximo Ingreso" ${e?.estado === 'Próximo Ingreso' ? 'selected' : ''}>Próximo Ingreso</option>
          <option value="Alta Médica" ${e?.estado === 'Alta Médica' ? 'selected' : ''}>Alta Médica (Finalizado)</option>
        </select>
      </div>
      <div class="form-group" id="f-fecha-alta-container" style="display: ${e?.estado === 'Alta Médica' ? 'block' : 'none'}; margin-bottom:0;">
        <label class="form-label">Fecha de Alta</label>
        <input class="form-input" type="date" id="f-fecha-alta" value="${e?.fechaAlta || ''}">
      </div>
    </div>
    <div class="form-row" style="background:var(--bg-secondary); padding: 10px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid var(--warning);">
      <div class="form-group" style="margin-bottom:0; width: 100%;">
        <label class="form-label" style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="f-alerta-clases" ${e?.alertaClases ? 'checked' : ''} onchange="document.getElementById('f-detalle-alerta-container').style.display = this.checked ? 'block' : 'none'">
          ⚠️ Alerta de Inasistencia / Clases Pendientes
        </label>
        <div id="f-detalle-alerta-container" style="display: ${e?.alertaClases ? 'block' : 'none'}; margin-top: 10px;">
          <input class="form-input" id="f-detalle-alerta" value="${e?.detalleAlerta || ''}" placeholder="Ej: Faltó a Plástica por Paro (Recuperar)">
          <p style="font-size:0.7rem; color:var(--text-secondary); margin-top:4px;">Este alerta se activa automáticamente si una clase se cancela durante la semana y se archiva el historial.</p>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Disponibilidad Horaria (Opcional)</label>
      <div id="disp-fields">
        ${DIAS.map(dia => {
          const d = e?.disponibilidad?.[dia];
          return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <label style="width:90px;font-size:0.8rem;color:var(--text-secondary)">${dia}</label>
            <input class="form-input" type="time" id="disp-${dia}-i" value="${d?.i || ''}" style="width:auto">
            <span style="color:var(--text-muted)">a</span>
            <input class="form-input" type="time" id="disp-${dia}-f" value="${d?.f || ''}" style="width:auto">
          </div>`;
        }).join('')}
      </div>
    </div>`;
  modal.classList.add('active');
}

function editEstudiante(id) {
  try {
    openEstudianteModal(id);
  } catch(e) {
    alert("Error al abrir lapiz: " + e.message + "\nLínea: " + e.stack);
  }
}

function saveEstudiante() {
  const nombre = document.getElementById('f-nombre').value.trim();
  if (!nombre) { showToast('El nombre es obligatorio', 'error'); return; }

  const disponibilidad = {};
  DIAS.forEach(dia => {
    const i = document.getElementById(`disp-${dia}-i`).value;
    const f = document.getElementById(`disp-${dia}-f`).value;
    if (i && f) disponibilidad[dia] = { i, f };
  });

  const estado = document.getElementById('f-estado').value;
  const fechaAlta = estado === 'Alta Médica' ? document.getElementById('f-fecha-alta').value : null;

  let coordenadas = null;
  const coordsStr = document.getElementById('f-coordenadas').value.trim();
  if (coordsStr) {
    const match = coordsStr.match(/(-?\d+\.\d+)[\s,]+(-?\d+\.\d+)/);
    if (match) {
      coordenadas = { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }
  }

  const data = {
    nombre,
    grado: document.getElementById('f-grado').value.trim(),
    escuelaOrigen: document.getElementById('f-escuela').value.trim(),
    nivel: document.getElementById('f-nivel').value,
    barrio: document.getElementById('f-barrio').value.trim(),
    telefono: document.getElementById('f-telefono').value.trim(),
    domicilio: document.getElementById('f-domicilio').value.trim(),
    estado,
    fechaAlta,
    vencimientoCertificado: document.getElementById('f-vence').value.trim(),
    certificadoVence: document.getElementById('f-vence').value.trim(),
    emergencia: document.getElementById('f-emergencia').value.trim(),
    wifi: document.getElementById('f-wifi').value,
    conectividad: document.getElementById('f-conectividad').value,
    foto: document.getElementById('modal-overlay').dataset.tempPhoto || (editingId ? Estudiantes.getById(editingId).foto : null),
    coordenadas,
    disponibilidad,
    alertaClases: document.getElementById('f-alerta-clases').checked,
    detalleAlerta: document.getElementById('f-detalle-alerta').value.trim()
  };
  if (editingId) { Estudiantes.update(editingId, data); showToast('Estudiante actualizado'); }
  else { Estudiantes.add(data); showToast('Estudiante creado'); }
  closeModal();
  renderEstudiantes();
}

function quickUpdateCertificado(id) {
  const e = Estudiantes.getById(id);
  if (!e) return;
  
  modalType = 'quick_certificado';
  editingId = id;
  const modal = document.getElementById('modal-overlay');
  modal.classList.add('active');
  document.getElementById('modal-title').textContent = `📅 Actualizar Certificado - ${e.nombre}`;
  
  const currentVal = e.certificadoVence || e.vencimientoCertificado || '';
  const dateVal = (currentVal !== 'PERMANENTE' && currentVal !== 'EN PROCESO') ? currentVal : '';

  document.getElementById('modal-body').innerHTML = `
    <div style="padding: 10px 0;">
      <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:15px;">
        Selecciona o ingresa la nueva fecha de vencimiento del certificado médico para <strong>${e.nombre}</strong>.
      </p>
      <div class="form-group">
        <label class="form-label">Fecha de Vencimiento (día/mes/año)</label>
        <input type="date" class="form-input" id="f-quick-cert-date" value="${dateVal}">
      </div>
      <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('f-quick-cert-date').value='PERMANENTE'">♾️ Marcar PERMANENTE</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('f-quick-cert-date').value='EN PROCESO'">⏳ Marcar EN PROCESO</button>
      </div>
      <div style="margin-top:20px; text-align:right;">
        <button class="btn btn-primary" onclick="saveQuickCertificado('${e.id}')">💾 Guardar Fecha</button>
      </div>
    </div>`;

  const saveBtn = document.getElementById('modal-save-btn');
  if (saveBtn) saveBtn.style.display = 'none';
}

function saveQuickCertificado(id) {
  const e = Estudiantes.getById(id);
  if (!e) return;
  const newVal = document.getElementById('f-quick-cert-date').value.trim();
  if (!newVal) {
    showToast('Ingresá una fecha o seleccioná un estado', 'warning');
    return;
  }
  e.certificadoVence = newVal;
  e.vencimientoCertificado = newVal;
  Estudiantes.update(id, e);
  showToast(`Certificado de ${e.nombre} actualizado a ${formatDateDDMMYYYY(newVal)}`);
  closeModal();
  renderEstudiantes();
  if (typeof renderAlertas === 'function') renderAlertas();
  updateConflictBadge();
}

function deleteEstudiante(id) {
  if (!confirm('¿Eliminar este estudiante y todas sus asignaciones?')) return;
  Estudiantes.delete(id);
  showToast('Estudiante eliminado');
  renderDashboard();
  renderEstudiantes();
  updateConflictBadge();
}

function openEstudianteEsperaModal(id = null) {
  editingId = id;
  modalType = 'estudiante_espera';
  const modal = document.getElementById('modal-overlay');
  const e = id ? Estudiantes.getById(id) : null;
  document.getElementById('modal-title').textContent = e ? 'Editar Estudiante en Espera' : '⏳ Cargar Estudiante en Lista de Espera';
  
  const hoy = new Date().toISOString().slice(0, 10);
  
  document.getElementById('modal-body').innerHTML = `
    <div class="form-group"><label class="form-label">Nombre Completo del Estudiante</label><input class="form-input" id="f-wait-nombre" value="${e?.nombre || ''}" placeholder="Ej: MENDOZA FACUNDO"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Escuela de Origen</label><input class="form-input" id="f-wait-escuela" value="${e?.escuelaOrigen || ''}" placeholder="Ej: N° 766"></div>
      <div class="form-group"><label class="form-label">Grado / Año</label><input class="form-input" id="f-wait-grado" value="${e?.grado || ''}" placeholder="Ej: 3° Año"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Barrio</label><input class="form-input" id="f-wait-barrio" value="${e?.barrio || ''}" placeholder="Ej: Standard Norte"></div>
      <div class="form-group"><label class="form-label">Domicilio</label><input class="form-input" id="f-wait-domicilio" value="${e?.domicilio || ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Teléfono Familia</label><input class="form-input" id="f-wait-telefono" value="${e?.telefono || ''}"></div>
      <div class="form-group"><label class="form-label">Teléfono Emergencia</label><input class="form-input" id="f-wait-emergencia" value="${e?.emergencia || ''}"></div>
    </div>
    <div style="background: var(--bg-main); padding: 14px; border-radius: 10px; margin-top: 10px; border-left: 4px solid var(--warning);">
      <h4 style="font-size:0.85rem; font-weight:700; margin-bottom:10px; color:var(--text-main);">📋 Datos de Remisión y Reposo Médico</h4>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">📅 Fecha de Remisión (Escuela Origen)</label>
          <input type="date" class="form-input" id="f-wait-remision" value="${e?.fechaRemision || hoy}">
        </div>
        <div class="form-group">
          <label class="form-label">🩺 Fecha del Certificado Médico</label>
          <input type="date" class="form-input" id="f-wait-cert-date" value="${e?.fechaCertificado || hoy}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">⏳ Días de Cobertura / Reposo (Días corridos)</label>
        <input type="number" class="form-input" id="f-wait-dias-cobertura" value="${e?.diasCobertura || 30}" min="1" max="365" placeholder="Ej: 30, 45, 60">
      </div>
    </div>
    <div style="margin-top:20px; text-align:right;">
      <button class="btn btn-primary" onclick="saveEstudianteEspera()">💾 Guardar en Lista de Espera</button>
    </div>`;

  modal.classList.add('active');
  const saveBtn = document.getElementById('modal-save-btn');
  if (saveBtn) saveBtn.style.display = 'none';
}

function saveEstudianteEspera() {
  const nombre = document.getElementById('f-wait-nombre').value.trim();
  if (!nombre) { showToast('Ingresá el nombre del estudiante', 'error'); return; }
  
  const fechaCertificado = document.getElementById('f-wait-cert-date').value;
  const diasCobertura = parseInt(document.getElementById('f-wait-dias-cobertura').value) || 30;
  
  let certificadoVence = '';
  if (fechaCertificado) {
    const certDate = new Date(fechaCertificado);
    const venceDate = new Date(certDate.getTime() + (diasCobertura * 24 * 60 * 60 * 1000));
    certificadoVence = venceDate.toISOString().slice(0, 10);
  }

  const data = {
    nombre,
    escuelaOrigen: document.getElementById('f-wait-escuela').value.trim(),
    grado: document.getElementById('f-wait-grado').value.trim(),
    barrio: document.getElementById('f-wait-barrio').value.trim(),
    domicilio: document.getElementById('f-wait-domicilio').value.trim(),
    telefono: document.getElementById('f-wait-telefono').value.trim(),
    emergencia: document.getElementById('f-wait-emergencia').value.trim(),
    fechaRemision: document.getElementById('f-wait-remision').value,
    fechaCertificado,
    diasCobertura,
    certificadoVence,
    vencimientoCertificado: certificadoVence,
    nivel: 'Secundaria',
    estado: 'En Espera'
  };

  if (editingId) {
    Estudiantes.update(editingId, data);
    showToast(`Ficha de espera de ${nombre} actualizada`);
  } else {
    Estudiantes.add(data);
    showToast(`¡${nombre} registrado en la lista de espera cronológica!`);
  }

  closeModal();
  renderDashboard();
  if (typeof renderEstudiantes === 'function') renderEstudiantes();
}

function openActivarEstudianteModal(id) {
  const e = Estudiantes.getById(id);
  if (!e) return;

  editingId = id;
  modalType = 'activar_estudiante';
  const modal = document.getElementById('modal-overlay');
  modal.classList.add('active');
  document.getElementById('modal-title').textContent = `🎓 Pasar a Matrícula Activa y Asignar Docente`;

  const docentes = Docentes.getAll();

  document.getElementById('modal-body').innerHTML = `
    <div style="padding: 10px 0;">
      <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--success); padding: 12px; border-radius: 8px; margin-bottom: 15px;">
        <strong style="font-size:0.95rem; color:var(--text-main); display:block;">Estudiante: ${e.nombre}</strong>
        <span style="font-size:0.8rem; color:var(--text-secondary);">Escuela Origen: ${e.escuelaOrigen || 'N/D'} • Barrio: ${e.barrio || 'N/D'}</span>
      </div>
      
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">
        Al ingresar a la plantilla activa, selecciona el docente y horario inicial para agregarlo a la grilla de planificación:
      </p>

      <div class="form-group">
        <label class="form-label">Docente Asignado</label>
        <select class="form-select" id="f-act-docente">
          ${docentes.map(d => `<option value="${d.id}">${d.nombre} (${d.materia})</option>`).join('')}
        </select>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Día de Clase</label>
          <select class="form-select" id="f-act-dia">
            ${DIAS.map(d => `<option value="${d}">${d}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Hora Inicio</label>
          <input type="time" class="form-input" id="f-act-hinicio" value="13:20">
        </div>
        <div class="form-group">
          <label class="form-label">Hora Fin</label>
          <input type="time" class="form-input" id="f-act-hfin" value="14:30">
        </div>
      </div>

      <div style="margin-top:20px; text-align:right;">
        <button class="btn btn-primary" onclick="saveActivarEstudiante('${e.id}')">🚀 Confirmar Asignación y Activar</button>
      </div>
    </div>`;

  const saveBtn = document.getElementById('modal-save-btn');
  if (saveBtn) saveBtn.style.display = 'none';
}

function saveActivarEstudiante(id) {
  const e = Estudiantes.getById(id);
  if (!e) return;

  const docenteId = document.getElementById('f-act-docente').value;
  const dia = document.getElementById('f-act-dia').value;
  const horaInicio = document.getElementById('f-act-hinicio').value;
  const horaFin = document.getElementById('f-act-hfin').value;

  if (!horaInicio || !horaFin) {
    showToast('Ingresá los horarios de clase', 'warning');
    return;
  }

  // 1. Cambiar estado del estudiante a Activo
  e.estado = 'Activo';
  Estudiantes.update(id, e);

  // 2. Crear asignación horaria en la grilla
  const asig = {
    docenteId,
    estudianteId: id,
    dia,
    horaInicio,
    horaFin,
    estadoSemana: 'Normal'
  };
  Asignaciones.add(asig);

  const d = Docentes.getById(docenteId);
  showToast(`¡${e.nombre} activado en la matrícula y asignado a ${d ? d.nombre.split(' ')[0] : 'docente'}!`);
  
  closeModal();
  renderDashboard();
  renderHorarios();
  if (typeof renderEstudiantes === 'function') renderEstudiantes();
}

// ===== HORARIOS =====
let activeHorariosTab = 'SECUNDARIA';

function setHorariosTab(tab) {
  activeHorariosTab = tab;
  document.getElementById('filter-docente').value = '';
  renderHorarios();
}

function renderHorarios() {
  const filterDocente = document.getElementById('filter-docente')?.value || '';

  let docentes = Docentes.getAll().filter(d => d.nivel === 'Secundaria');

  // Populate docente filter only with the current tab's docentes
  const filterEl = document.getElementById('filter-docente');
  if (filterEl) {
    const currentVal = filterEl.value;
    filterEl.innerHTML = '<option value="">Todos los docentes</option>';
    docentes.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id; opt.textContent = d.nombre;
      if (d.id === currentVal) opt.selected = true;
      filterEl.appendChild(opt);
    });
  }

  // Apply docente filter
  if (filterDocente) docentes = docentes.filter(d => d.id === filterDocente);

  const conflicts = detectConflicts();
  const conflictIds = new Set();
  conflicts.forEach(c => c.ids.forEach(id => conflictIds.add(id)));

  const grid = document.getElementById('horarios-grid');
  
  let html = ``;

  if (!docentes.length) {
    html += `<div class="empty-state"><div class="icon">📅</div><h3>Sin docentes para mostrar</h3></div>`;
    grid.innerHTML = html;
    return;
  }

  html += `<div class="schedule-grid">
    <div class="schedule-header">Docente</div>
    ${DIAS.map(d => `<div class="schedule-header">${d}</div>`).join('')}`;

  docentes.forEach(doc => {
    html += `<div class="schedule-row-label">${doc.nombre}<span class="materia">${doc.materia}</span></div>`;
    DIAS.forEach(dia => {
      const asigs = Asignaciones.getByDocente(doc.id).filter(a => a.dia === dia)
        .sort((a, b) => timeToMin(a.horaInicio) - timeToMin(b.horaInicio));
      
      html += `<div class="schedule-cell" onclick="openAsignacionModal(null,'${doc.id}','${dia}')">`;
      
      // Mostrar Paro, Retención de Servicios, Licencia o Status Especial si existe
      if (doc.novedades && doc.novedades[dia]) {
        const nov = doc.novedades[dia];
        let novBg = 'rgba(239, 68, 68, 0.12)';
        let novBorder = 'var(--danger)';
        let novColor = '#dc2626';
        let icon = '📢';

        if (nov.includes('Paro')) {
          icon = '✊'; novBg = 'rgba(239, 68, 68, 0.12)'; novBorder = '#ef4444'; novColor = '#dc2626';
        } else if (nov.includes('Retención') || nov.includes('Retencion')) {
          icon = '🛑'; novBg = 'rgba(245, 158, 11, 0.12)'; novBorder = '#f59e0b'; novColor = '#d97706';
        } else if (nov.includes('Licencia')) {
          icon = '🏥'; novBg = 'rgba(139, 92, 246, 0.12)'; novBorder = '#8b5cf6'; novColor = '#7c3aed';
        }

        html += `<div style="background: ${novBg}; color: ${novColor}; font-weight: 800; font-size: 0.68rem; padding: 6px 8px; border-radius: 8px; text-align: center; border: 1.5px solid ${novBorder}; margin-bottom: 6px; display:flex; align-items:center; justify-content:space-between;">
          <span>${icon} ${nov.toUpperCase()}</span>
          <button onclick="event.stopPropagation(); clearDocenteNovedad('${doc.id}', '${dia}')" style="background:none; border:none; color:${novColor}; cursor:pointer; font-weight:bold; font-size:0.8rem; margin-left:4px;" title="Quitar novedad">✕</button>
        </div>`;
      }

      // Indicador de jornada laboral disponible si no hay alumnos asignados en este día
      const jornadaDia = doc.jornada ? doc.jornada[dia] : null;
      if (asigs.length === 0) {
        if (jornadaDia && jornadaDia.i && jornadaDia.f) {
          html += `
            <div class="jornada-indicator" style="background: rgba(99, 102, 241, 0.07); border: 1px dashed rgba(99, 102, 241, 0.35); padding: 8px 6px; border-radius: 8px; text-align: center; margin-bottom: 6px; pointer-events: none;">
              <div style="font-size: 0.62rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">🕒 JORNADA LABORAL</div>
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-main);">${jornadaDia.i} a ${jornadaDia.f}</div>
            </div>`;
        } else {
          html += `
            <div style="font-size: 0.65rem; color: var(--text-secondary); opacity: 0.45; text-align: center; padding: 6px 0; font-style: italic; pointer-events: none;">Sin jornada este día</div>`;
        }
      }

      asigs.forEach(a => {
        const est = Estudiantes.getById(a.estudianteId);
        const isConflict = conflictIds.has(a.id);
        const isWait = a.status === 'espera';
        const isCancelada = a.estadoSemana && a.estadoSemana !== 'Normal';
        const canceladaStyle = isCancelada ? 'opacity: 0.65; background: repeating-linear-gradient(45deg, rgba(148, 163, 184, 0.08), rgba(148, 163, 184, 0.08) 10px, rgba(148, 163, 184, 0.18) 10px, rgba(148, 163, 184, 0.18) 20px); border: 1.5px dashed var(--text-secondary); border-radius: 8px;' : '';
        const canceladaBadge = isCancelada ? `<span style="color:var(--text-secondary); font-size:0.6rem; display:block; margin-top:2px; font-weight:bold;">🚫 ${a.estadoSemana}</span>` : '';
        const estAlert = est && est.alertaClases ? `<span title="${est.detalleAlerta || 'Clases Pendientes'}" style="font-size:0.8rem; margin-left:4px;">⚠️</span>` : '';

        html += `
          <div class="schedule-slot ${isConflict ? 'conflict' : ''} ${isWait ? 'waiting' : ''}" 
               style="border-left: 4px solid ${doc.color || '#ccc'}; ${isWait ? 'opacity: 0.6; background: #fffbeb;' : ''} ${canceladaStyle}"
               onclick="event.stopPropagation(); openAsignacionModal('${a.id}')">
            <button class="delete-slot-btn" onclick="event.stopPropagation(); deleteAsignacionSlot('${a.id}')" title="Eliminar estudiante asignado">🗑️</button>
            <div class="slot-student" style="font-weight: 700; font-size: 0.75rem; padding-right: 18px; ${isCancelada ? 'text-decoration: line-through; color: var(--text-secondary);' : ''}">
              ${est ? est.nombre : 'S/D'} ${estAlert}
              ${isWait ? '<span style="color:var(--warning); font-size:0.6rem; display:block">⏳ EN ESPERA</span>' : ''}
              ${canceladaBadge}
            </div>
            <div class="slot-time" style="${isCancelada ? 'color: var(--text-secondary); font-style: italic;' : ''}">${a.horaInicio} - ${a.horaFin}</div>
          </div>`;
      });
      html += `<div style="display:flex; gap:4px; margin-top:4px;">
        <button class="add-slot-btn" style="flex:1;" onclick="event.stopPropagation();openAsignacionModal(null,'${doc.id}','${dia}')">+ Agregar</button>
        <button class="btn btn-secondary" onclick="event.stopPropagation();setNovedadRapidaDocente('${doc.id}','${dia}')" style="padding: 3px 6px; font-size: 0.65rem; border-radius:6px; white-space:nowrap;" title="Cargar Paro, Retención de Servicios o Licencia Docente">📢 Novedad</button>
      </div></div>`;
    });
  });

  html += '</div>';
  grid.innerHTML = html;
}

function openAsignacionModal(asigId = null, docenteId = '', dia = 'Lunes') {
  modalType = 'asignacion';
  editingId = asigId;
  const a = asigId ? Asignaciones.getAll().find(x => x.id === asigId) : null;
  const modal = document.getElementById('modal-overlay');
  document.getElementById('modal-title').textContent = a ? 'Editar Asignación' : 'Nueva Asignación';

  const docentes = Docentes.getAll();
  const estudiantes = Estudiantes.getAll();

  const getDiasParaDocente = (dId) => {
    const doc = docentes.find(d => d.id === dId);
    const docDias = doc?.jornada && Object.keys(doc.jornada).length > 0 ? Object.keys(doc.jornada) : DIAS;
    if (a && a.dia && !docDias.includes(a.dia)) {
      return [a.dia, ...docDias];
    }
    return docDias;
  };
  const initialDocenteId = a?.docenteId || docenteId || (docentes.length ? docentes[0].id : '');

  document.getElementById('modal-body').innerHTML = `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Docente</label>
        <select class="form-select" id="f-docente">${docentes.map(d => `<option value="${d.id}" ${initialDocenteId === d.id ? 'selected' : ''}>${d.nombre} (${d.materia})</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Día</label>
        <select class="form-select" id="f-dia">${getDiasParaDocente(initialDocenteId).map(d => `<option ${(a?.dia || dia) === d ? 'selected' : ''}>${d}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Estudiante</label>
      <select class="form-select" id="f-estudiante">${estudiantes.filter(e => e.estado !== 'Alta Médica' && e.estado !== 'Próximo Ingreso' || a?.estudianteId === e.id).map(e => `<option value="${e.id}" ${a?.estudianteId === e.id ? 'selected' : ''}>${e.nombre} (${e.nivel})</option>`).join('')}</select>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Hora Inicio</label><input class="form-input" type="time" id="f-hinicio" value="${a?.horaInicio || '13:20'}"></div>
      <div class="form-group">
        <label class="form-label" style="display:flex; justify-content:space-between;">Hora Fin 
          <button type="button" class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 0.7rem;" onclick="autoSugerirHorario()">🤖 Sugerir Libre</button>
        </label>
        <input class="form-input" type="time" id="f-hfin" value="${a?.horaFin || '14:30'}">
      </div>
    </div>
    <div class="form-row" style="margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 10px;">
      <div class="form-group" style="width: 100%;">
        <label class="form-label">Estado de la Clase (Esta Semana)</label>
        <select class="form-select" id="f-estado-semana">
          <option value="Normal" ${a?.estadoSemana === 'Normal' || !a?.estadoSemana ? 'selected' : ''}>✅ Normal (Clase activa)</option>
          <option value="Paro Docente" ${a?.estadoSemana === 'Paro Docente' ? 'selected' : ''}>✊ Paro Docente</option>
          <option value="Retención de Servicios" ${a?.estadoSemana === 'Retención de Servicios' ? 'selected' : ''}>🛑 Retención de Servicios</option>
          <option value="Licencia Docente" ${a?.estadoSemana === 'Licencia Docente' ? 'selected' : ''}>🏥 Licencia Docente</option>
          <option value="Cancelada por Docente" ${a?.estadoSemana === 'Cancelada por Docente' ? 'selected' : ''}>👨‍🏫 Cancelada por Docente</option>
          <option value="Cancelada por Estudiante" ${a?.estadoSemana === 'Cancelada por Estudiante' ? 'selected' : ''}>🎓 Cancelada por Estudiante</option>
          <option value="Estudiante sin clases esta semana" ${a?.estadoSemana === 'Estudiante sin clases esta semana' ? 'selected' : ''}>🚫 Estudiante sin clases esta semana</option>
        </select>
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 5px;">Al archivar la semana, se generará un alerta automática si la clase fue cancelada.</p>
      </div>
    </div>
    <div id="preview-conflicts" style="margin-top:12px"></div>
    ${a ? `<div style="margin-top:16px; padding-top:14px; border-top: 1px dashed var(--border-color); display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:0.85rem; color:var(--danger); font-weight:600;">¿Quitar estudiante de este horario?</span>
      <button class="btn btn-danger btn-sm" onclick="deleteAsignacion('${a.id}')" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">🗑️ Eliminar Asignación</button>
    </div>` : ''}`;

  // Live conflict preview
  const preview = () => {
    const tempData = {
      docenteId: document.getElementById('f-docente').value,
      estudianteId: document.getElementById('f-estudiante').value,
      dia: document.getElementById('f-dia').value,
      horaInicio: document.getElementById('f-hinicio').value,
      horaFin: document.getElementById('f-hfin').value,
      id: editingId || '_temp_'
    };
    if (!tempData.dia) return; // Wait until populated
    const previewEl = document.getElementById('preview-conflicts');
    // Temporarily add to check
    const origAsigs = [...DB.data.asignaciones];
    if (editingId) DB.data.asignaciones = DB.data.asignaciones.filter(x => x.id !== editingId);
    DB.data.asignaciones.push(tempData);
    const conflicts = detectConflicts().filter(c => c.ids.includes(tempData.id));
    DB.data.asignaciones = origAsigs;
    if (conflicts.length) {
      previewEl.innerHTML = conflicts.map(c => `<div class="conflict-item ${c.severity === 'error' ? 'error' : 'warn'}" style="padding:10px;margin-bottom:6px">
        <span class="conflict-icon">${c.severity === 'error' ? '🔴' : '🟡'}</span>
        <div class="conflict-text" style="font-size:0.8rem">${c.message}</div>
      </div>`).join('');
    } else {
      previewEl.innerHTML = '<div style="color:var(--success);font-size:0.8rem;padding:8px">✅ Sin conflictos</div>';
    }
  };

  ['f-docente','f-estudiante','f-dia','f-hinicio','f-hfin'].forEach(id => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        if (id === 'f-docente') {
          el.addEventListener('change', () => {
            const dias = getDiasParaDocente(el.value);
            const diaSelect = document.getElementById('f-dia');
            const prevVal = diaSelect.value;
            diaSelect.innerHTML = dias.map(d => `<option ${prevVal === d ? 'selected' : ''}>${d}</option>`).join('');
            if (!dias.includes(prevVal) && dias.length > 0) diaSelect.value = dias[0];
            preview();
          });
        } else {
          el.addEventListener('change', preview);
        }
      }
    }, 50);
  });
  setTimeout(preview, 100);

  modal.classList.add('active');
}

window.autoSugerirHorario = function() {
  const docenteId = document.getElementById('f-docente').value;
  const estudianteId = document.getElementById('f-estudiante').value;
  if (!docenteId || !estudianteId) return showToast('Seleccione docente y estudiante primero', 'error');

  const docente = DB.docentes.find(d => d.id === docenteId);
  const estudiante = DB.estudiantes.find(e => e.id === estudianteId);
  const asigs = DB.asignaciones.filter(a => a.docenteId === docenteId && a.id !== editingId);
  
  const classDuration = 70; // 1h 10m default
  const defaultJornada = {i: '13:20', f: '17:20'};
  
  for (const dia of DIAS) {
    let j = docente.jornada?.[dia];
    if (!j && (!docente.jornada || Object.keys(docente.jornada).length === 0)) j = defaultJornada;
    if (!j) continue; // No trabaja este día
    
    let dayAsigs = asigs.filter(a => a.dia === dia).sort((a, b) => timeToMin(a.horaInicio) - timeToMin(b.horaInicio));
    
    let startMin = timeToMin(j.i);
    let endMin = timeToMin(j.f);
    
    // Check available slots
    let slots = [];
    let current = startMin;
    for (const a of dayAsigs) {
      slots.push({i: current, f: timeToMin(a.horaInicio), prev: slots.length ? dayAsigs[slots.length-1] : null, next: a});
      current = timeToMin(a.horaFin);
    }
    slots.push({i: current, f: endMin, prev: dayAsigs.length ? dayAsigs[dayAsigs.length-1] : null, next: null});
    
    for (const slot of slots) {
      if (slot.f - slot.i >= classDuration) {
        // Evaluate travel time
        let prevEst = slot.prev ? DB.estudiantes.find(e => e.id === slot.prev.estudianteId) : null;
        let nextEst = slot.next ? DB.estudiantes.find(e => e.id === slot.next.estudianteId) : null;
        
        let requiredPrevTravel = 0;
        if (prevEst) {
           requiredPrevTravel = (prevEst.barrio === estudiante.barrio && estudiante.barrio !== '') ? 10 : CONFIG.tiempoTraslado;
        }
        
        let requiredNextTravel = 0;
        if (nextEst) {
           requiredNextTravel = (nextEst.barrio === estudiante.barrio && estudiante.barrio !== '') ? 10 : CONFIG.tiempoTraslado;
        }
        
        let proposedStart = slot.i + requiredPrevTravel;
        let proposedEnd = proposedStart + classDuration;
        
        if (proposedEnd + requiredNextTravel <= slot.f) {
           // We found a slot!
           document.getElementById('f-dia').value = dia;
           let h = Math.floor(proposedStart / 60).toString().padStart(2, '0');
           let m = (proposedStart % 60).toString().padStart(2, '0');
           document.getElementById('f-hinicio').value = `${h}:${m}`;
           
           let he = Math.floor(proposedEnd / 60).toString().padStart(2, '0');
           let me = (proposedEnd % 60).toString().padStart(2, '0');
           document.getElementById('f-hfin').value = `${he}:${me}`;
           
           showToast(`¡Horario óptimo sugerido el ${dia}!`, 'success');
           document.getElementById('f-dia').dispatchEvent(new Event('change'));
           return;
        }
      }
    }
  }
  showToast('No se encontró hueco libre con tiempo de viaje suficiente.', 'error');
};

function saveAsignacion() {
  const data = {
    docenteId: document.getElementById('f-docente').value,
    estudianteId: document.getElementById('f-estudiante').value,
    dia: document.getElementById('f-dia').value,
    horaInicio: document.getElementById('f-hinicio').value,
    horaFin: document.getElementById('f-hfin').value,
    estadoSemana: document.getElementById('f-estado-semana').value
  };
  if (!data.horaInicio || !data.horaFin) { showToast('Completá los horarios', 'error'); return; }
  if (editingId) { Asignaciones.update(editingId, data); showToast('Asignación actualizada'); }
  else { Asignaciones.add(data); showToast('Asignación creada'); }
  closeModal();
  renderHorarios();
  updateConflictBadge();
}

function deleteAsignacionSlot(id) {
  const a = Asignaciones.getAll().find(x => x.id === id);
  const est = a ? Estudiantes.getById(a.estudianteId) : null;
  const nombreEst = est ? est.nombre : 'este estudiante';
  if (!confirm(`¿Estás seguro de eliminar a ${nombreEst} de este horario?`)) return;
  Asignaciones.delete(id);
  showToast(`Asignación de ${nombreEst} eliminada`);
  renderHorarios();
  updateConflictBadge();
}

function deleteAsignacion(id) {
  const a = Asignaciones.getAll().find(x => x.id === id);
  const est = a ? Estudiantes.getById(a.estudianteId) : null;
  const nombreEst = est ? est.nombre : 'este estudiante';
  if (!confirm(`¿Estás seguro de eliminar a ${nombreEst} de este horario?`)) return;
  Asignaciones.delete(id);
  showToast(`Asignación de ${nombreEst} eliminada`);
  closeModal();
  renderHorarios();
  updateConflictBadge();
}

function clearAllAssignments() {
  if (!confirm('⚠️ ¿Estás seguro de que deseas VACIAR TODA LA GRILLA? Se borrarán todas las clases asignadas de todos los docentes. Esta acción no se puede deshacer.')) return;
  
  DB.data.asignaciones = [];
  DB.save();
  
  showToast('Grilla vaciada completamente', 'info');
  renderHorarios();
  updateConflictBadge();
}

function setNovedadRapidaDocente(docId, dia) {
  const doc = Docentes.getById(docId);
  if (!doc) return;
  
  modalType = 'novedad_rapida';
  editingId = docId;
  const modal = document.getElementById('modal-overlay');
  modal.classList.add('active');
  document.getElementById('modal-title').textContent = `📢 Situación Docente - ${doc.nombre} (${dia})`;
  
  const actualNov = (doc.novedades && doc.novedades[dia]) || 'Normal';

  document.getElementById('modal-body').innerHTML = `
    <div style="padding: 10px 0;">
      <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:15px;">
        Selecciona la situación o novedad laboral para <strong>${doc.nombre}</strong> el día <strong>${dia}</strong>:
      </p>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn ${actualNov === 'Paro Docente' ? 'btn-primary' : 'btn-secondary'}" 
                onclick="applyNovedadDocente('${docId}', '${dia}', 'Paro Docente')"
                style="justify-content:flex-start; padding:12px; font-weight:700; border-left:4px solid var(--danger);">
          ✊ PARO DOCENTE
        </button>
        <button class="btn ${actualNov === 'Retención de Servicios' ? 'btn-primary' : 'btn-secondary'}" 
                onclick="applyNovedadDocente('${docId}', '${dia}', 'Retención de Servicios')"
                style="justify-content:flex-start; padding:12px; font-weight:700; border-left:4px solid var(--warning);">
          🛑 RETENCIÓN DE SERVICIOS
        </button>
        <button class="btn ${actualNov === 'Licencia Docente' ? 'btn-primary' : 'btn-secondary'}" 
                onclick="applyNovedadDocente('${docId}', '${dia}', 'Licencia Docente')"
                style="justify-content:flex-start; padding:12px; font-weight:700; border-left:4px solid var(--accent-purple);">
          🏥 LICENCIA DOCENTE
        </button>
        <button class="btn btn-secondary" 
                onclick="applyNovedadDocente('${docId}', '${dia}', 'Normal')"
                style="justify-content:flex-start; padding:12px; font-weight:600; opacity:0.8;">
          🟢 NORMAL (Sin Novedad / Clase Activa)
        </button>
      </div>
    </div>`;

  const saveBtn = document.getElementById('modal-save-btn');
  if (saveBtn) saveBtn.style.display = 'none';
}

function applyNovedadDocente(docId, dia, novedadTipo) {
  const doc = Docentes.getById(docId);
  if (!doc) return;
  
  if (!doc.novedades) doc.novedades = {};
  
  if (novedadTipo === 'Normal') {
    delete doc.novedades[dia];
  } else {
    doc.novedades[dia] = novedadTipo;
  }
  
  // Actualizar también el estadoSemana de las asignaciones de ese docente en ese día
  const asigs = Asignaciones.getByDocente(docId).filter(a => a.dia === dia);
  asigs.forEach(a => {
    a.estadoSemana = novedadTipo === 'Normal' ? 'Normal' : novedadTipo;
    Asignaciones.update(a.id, a);
  });

  Docentes.update(docId, doc);
  
  showToast(novedadTipo === 'Normal' ? `Novedad del ${dia} quitada` : `Novedad "${novedadTipo}" registrada para el ${dia}`);
  closeModal();
  renderHorarios();
  updateConflictBadge();
}

function clearDocenteNovedad(docId, dia) {
  applyNovedadDocente(docId, dia, 'Normal');
}


// ===== NOVEDADES =====
function renderNovedades() {
  const novedades = Novedades.getAll();
  const el = document.getElementById('novedades-list');
  if (!novedades.length) {
    el.innerHTML = `<div class="empty-state"><div class="icon">📢</div><h3>Sin novedades</h3><p>Agregá excepciones o turnos médicos.</p></div>`;
    return;
  }
  
  // Sort by dia (naive)
  const diaOrder = { 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5 };
  novedades.sort((a, b) => diaOrder[a.dia] - diaOrder[b.dia]);

  el.innerHTML = novedades.map(n => {
    const est = n.estudianteId ? Estudiantes.getById(n.estudianteId) : null;
    const doc = n.docenteId ? Docentes.getById(n.docenteId) : null;
    const nombre = n.estudianteId ? (est?.nombre || '?') : (doc?.nombre || '?');
    const label = n.estudianteId ? 'Estudiante' : 'Docente';
    
    return `<div class="student-card" style="display:flex; flex-direction:row; align-items:center; justify-content:space-between; padding:15px; border-left: 4px solid ${n.estudianteId ? 'var(--warning)' : 'var(--primary)'};">
      <div>
        <h4 style="margin:0 0 5px 0;">
          <span style="font-size:0.7rem; text-transform:uppercase; background:rgba(0,0,0,0.05); padding:2px 6px; border-radius:4px; margin-right:8px;">${label}</span>
          ${nombre} 
          <span style="font-size:0.8rem; font-weight:normal; color:var(--text-secondary); margin-left:10px;">${n.dia} (${n.horaInicio} a ${n.horaFin})</span>
        </h4>
        <div style="font-size:0.9rem;">${n.motivo}</div>
      </div>
      <div>
        <button class="btn btn-secondary btn-sm" onclick="openNovedadModal('${n.id}')">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteNovedad('${n.id}')">🗑️</button>
      </div>
    </div>`;
  }).join('<div style="margin-bottom:10px;"></div>');
}

function openNovedadModal(id = null) {
  editingId = id;
  modalType = 'novedad';
  const modal = document.getElementById('modal-overlay');
  const n = id ? Novedades.getById(id) : null;
  document.getElementById('modal-title').textContent = n ? 'Editar Novedad' : 'Nueva Novedad';

  const estudiantes = Estudiantes.getAll().filter(e => e.estado !== 'Alta Médica' && e.estado !== 'Próximo Ingreso' || n?.estudianteId === e.id);

  document.getElementById('modal-body').innerHTML = `
    <div class="form-group">
      <label class="form-label">Tipo de Novedad</label>
      <div style="display:flex; gap:15px; margin-bottom:10px;">
        <label style="display:flex; align-items:center; gap:5px; cursor:pointer;">
          <input type="radio" name="nov-tipo" value="estudiante" ${!n || n.estudianteId ? 'checked' : ''} onchange="toggleNovSujeto()"> Estudiante
        </label>
        <label style="display:flex; align-items:center; gap:5px; cursor:pointer;">
          <input type="radio" name="nov-tipo" value="docente" ${n?.docenteId ? 'checked' : ''} onchange="toggleNovSujeto()"> Docente
        </label>
      </div>
    </div>
    <div class="form-group" id="f-nov-estudiante-container" style="display: ${!n || n.estudianteId ? 'block' : 'none'}">
      <label class="form-label">Estudiante</label>
      <select class="form-select" id="f-nov-estudiante">
        ${estudiantes.map(e => `<option value="${e.id}" ${n?.estudianteId === e.id ? 'selected' : ''}>${e.nombre} (${e.nivel})</option>`).join('')}
      </select>
    </div>
    <div class="form-group" id="f-nov-docente-container" style="display: ${n?.docenteId ? 'block' : 'none'}">
      <label class="form-label">Docente</label>
      <select class="form-select" id="f-nov-docente">
        ${Docentes.getAll().map(d => `<option value="${d.id}" ${n?.docenteId === d.id ? 'selected' : ''}>${d.nombre} (${d.materia})</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Días (Seleccioná uno o varios)</label>
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px; background:var(--bg-secondary); padding:10px; border-radius:8px;">
        ${DIAS.map(d => {
          const isChecked = n?.dias ? n.dias.includes(d) : (n?.dia === d || n?.dia === 'Toda la semana');
          return `
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
            <input type="checkbox" class="nov-dia-check" value="${d}" ${isChecked ? 'checked' : ''}> ${d}
          </label>`;
        }).join('')}
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Hora Inicio (Bloqueo)</label>
        <input class="form-input" type="time" id="f-nov-hinicio" value="${n?.horaInicio || '00:00'}">
      </div>
      <div class="form-group">
        <label class="form-label">Hora Fin (Bloqueo)</label>
        <input class="form-input" type="time" id="f-nov-hfin" value="${n?.horaFin || '23:59'}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Motivo</label>
      <input class="form-input" id="f-nov-motivo" value="${n?.motivo || ''}" placeholder="Ej: Turno médico en el Hospital">
    </div>
    <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:10px;">
      ℹ️ El estudiante <strong>NO estará disponible</strong> en la franja horaria indicada arriba.
    </p>
  `;
  modal.classList.add('active');
}

function toggleNovSujeto() {
  const tipo = document.querySelector('input[name="nov-tipo"]:checked').value;
  document.getElementById('f-nov-estudiante-container').style.display = tipo === 'estudiante' ? 'block' : 'none';
  document.getElementById('f-nov-docente-container').style.display = tipo === 'docente' ? 'block' : 'none';
}

function saveNovedad() {
  const selectedDias = Array.from(document.querySelectorAll('.nov-dia-check:checked')).map(el => el.value);
  if (selectedDias.length === 0) { showToast('Seleccioná al menos un día', 'error'); return; }

  const tipo = document.querySelector('input[name="nov-tipo"]:checked').value;
  const data = {
    estudianteId: tipo === 'estudiante' ? document.getElementById('f-nov-estudiante').value : null,
    docenteId: tipo === 'docente' ? document.getElementById('f-nov-docente').value : null,
    dias: selectedDias,
    dia: selectedDias.length === 5 ? 'Toda la semana' : selectedDias.join(', '),
    horaInicio: document.getElementById('f-nov-hinicio').value,
    horaFin: document.getElementById('f-nov-hfin').value,
    motivo: document.getElementById('f-nov-motivo').value.trim() || 'Sin motivo especificado'
  };
  
  if (!data.horaInicio || !data.horaFin) { showToast('Completá las horas', 'error'); return; }
  
  if (editingId) { 
    Novedades.update(editingId, data); 
    showToast('Novedad actualizada'); 
  } else { 
    Novedades.add(data); 
    showToast('Novedad registrada'); 
  }
  
  closeModal();
  renderNovedades();
  updateConflictBadge();
}

function deleteNovedad(id) {
  if (!confirm('¿Eliminar esta novedad?')) return;
  Novedades.delete(id);
  showToast('Novedad eliminada');
  renderNovedades();
  updateConflictBadge();
}


// ===== CONFIG =====
function renderConfig() {
  const trasladoEl = document.getElementById('config-traslado');
  if (trasladoEl) trasladoEl.value = DB.data?.config?.tiempoTraslado || 20;

  const semanaEl = document.getElementById('config-semana');
  if (semanaEl) semanaEl.value = CONFIG.semana || '18 al 22 de Mayo de 2026';
}

function saveConfig() {
  const trasladoEl = document.getElementById('config-traslado');
  if (trasladoEl && DB.data?.config) {
    DB.data.config.tiempoTraslado = parseInt(trasladoEl.value) || 20;
  }

  const semanaEl = document.getElementById('config-semana');
  if (semanaEl) {
    CONFIG.semana = semanaEl.value;
    if (DB.data?.config) DB.data.config.semana = CONFIG.semana;
  }

  DB.save();
  updateWeeklyTitles();
  showToast('Configuración guardada');
  updateConflictBadge();
}

function handleArchiveWeek() {
  if (!confirm(`⚠️ ¿Estás seguro de cerrar la semana "${CONFIG.semana}"?\n\nEsto guardará una copia inalterable de todas las clases y novedades actuales en el Historial.`)) return;
  
  const archived = DB.archiveWeek();
  showToast(`Semana "${archived.rangoSemana}" archivada con éxito`);
  renderHistorial();
}

function renderHistorial() {
  const historial = DB.historial;
  const el = document.getElementById('historial-list');
  
  if (historial.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="icon">📚</div><h3>Historial Vacío</h3><p>Las semanas aparecerán aquí una vez que las archives.</p></div>`;
    return;
  }

  el.innerHTML = historial.slice().reverse().map(week => `
    <div class="card" style="padding:20px; margin-bottom:15px; border-left: 4px solid var(--primary);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h3 style="margin:0;">Semana: ${week.rangoSemana}</h3>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin:5px 0 0 0;">Cerrada el: ${new Date(week.fechaCierre).toLocaleString()}</p>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-primary">${week.asignaciones.length} Clases</span>
          <span class="badge badge-secondary">${week.novedades.length} Novedades</span>
        </div>
      </div>
      <div style="margin-top:15px; padding-top:15px; border-top:1px solid var(--border-color); display:flex; gap:10px;">
        <button class="btn btn-secondary btn-sm" onclick="showToast('Función de exportación de semana pasada en desarrollo')">📄 Exportar Reporte</button>
        <button class="btn btn-secondary btn-sm" onclick="console.log(DB.historial.find(h => h.id === '${week.id}'))">🔍 Ver Detalles (Consola)</button>
      </div>
    </div>
  `).join('');
}

function updateWeeklyTitles() {
  const footer = document.querySelector('.sidebar-footer');
  if (footer) footer.textContent = `Semana: ${CONFIG.semana}`;

  const dashSub = document.getElementById('dashboard-subtitle');
  if (dashSub) dashSub.textContent = `Semana del ${CONFIG.semana}`;

  const horSub = document.getElementById('horarios-subtitle');
  if (horSub) horSub.textContent = `Cronograma de la Semana del ${CONFIG.semana}`;
}

function resetData() {
  if (!confirm('¿Restaurar todos los datos a los valores iniciales? Se perderán todos los cambios.')) return;
  DB.reset();
  showToast('Datos restaurados');
  navigate(currentPage);
}

function exportData() { DB.exportJSON(); showToast('Datos exportados'); }

function importData() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = async (e) => {
    try {
      await DB.importJSON(e.target.files[0]);
      showToast('Datos importados correctamente');
      navigate(currentPage);
    } catch (err) { showToast('Error al importar: ' + err.message, 'error'); }
  };
  input.click();
}

// ===== MODAL =====
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  const saveBtn = document.getElementById('modal-save-btn');
  if (saveBtn) saveBtn.style.display = 'block';
  editingId = null;
  modalType = null;
}


function handlePhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('f-photo-preview').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
    document.getElementById('modal-overlay').dataset.tempPhoto = e.target.result;
  };
  reader.readAsDataURL(file);
}

function exportWordPorNivel() {
  const nivel = activeEstudiantesTab;
  const estudiantes = Estudiantes.getAll().filter(e => e.nivel === nivel);
  const assignments = Asignaciones.getAll();
  const teachers = Docentes.getAll();
  
  if (estudiantes.length === 0) {
    showToast(`No hay estudiantes en el nivel ${nivel}`, 'warning');
    return;
  }

  showToast(`Generando cuadernillo para ${nivel}...`, 'info');
  
  // Format date utility
  const formatCertDate = (dateStr) => {
    if (!dateStr) return 'S/D';
    if (dateStr === 'PERMANENTE' || dateStr === 'EN PROCESO') return dateStr;
    const [y, m, d] = dateStr.split('-');
    if (!y || !m || !d) return dateStr;
    const months = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    return `${months[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
  };

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Horarios - ${nivel}</title>
      <style>
        body { font-family: 'Arial', sans-serif; padding: 20px; color: #000; font-size: 14px; }
        .ficha { width: 100%; margin-bottom: 30px; page-break-inside: avoid; }
        .ficha-table { width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed; border: 1px solid #000; }
        .ficha-table th, .ficha-table td { border: 1px solid #000; vertical-align: top; }
        .photo-cell { width: 110px; text-align: center; vertical-align: middle !important; padding: 5px; }
        .photo-cell img { width: 95px; height: 115px; object-fit: cover; }
        .info-cell { padding: 10px; text-align: justify; line-height: 1.4; vertical-align: middle !important; font-size: 14px; }
        .info-label { font-weight: bold; }
        .link-text { color: #0563c1; text-decoration: underline; }
        .emergencia-row { text-align: center; color: #e3000f; font-weight: bold; font-style: italic; padding: 4px; font-size: 14px; }
        .ficha-table th { background: #e6e6ea; text-transform: uppercase; font-weight: bold; padding: 4px; font-size: 14px; }
        .schedule-cell { height: 120px; vertical-align: top; text-align: center; padding: 5px; }
        .vencimiento-row { text-align: center; color: #5b2c6f; font-weight: bold; padding: 4px; font-size: 14px; text-transform: uppercase; }
        .footer-row { text-align: center; font-weight: bold; padding: 4px; font-size: 14px; }
        .print-btn { display: block; margin: 0 auto 20px; padding: 12px 24px; font-size: 16px; cursor: pointer; background: #2b5797; color: white; border: none; border-radius: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .print-btn:hover { background: #1e3f70; }
        @media print { .print-btn { display: none; } body { padding: 0; } }
      </style>
    </head>
    <body>
      <button class="print-btn" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
      <h2 style="text-align: center; margin-bottom: 30px; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; display: inline-block; margin-left: auto; margin-right: auto; width: 100%;">
        ${nivel} - DOCENTES Y HORARIOS - SEMANA ACTUAL
      </h2>
  `;

  estudiantes.forEach(e => {
    const asigs = assignments.filter(a => a.estudianteId === e.id);
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    let diasHTML = '';
    
    dias.forEach(dia => {
      // Find all classes for this day (in case there are multiple, like 'Martes1' and 'Martes2' logic, but here we just take all matching the 'dia')
      const classesForDay = asigs.filter(a => a.dia === dia).sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
      
      if (classesForDay.length > 0) {
        diasHTML += `<td class="schedule-cell">`;
        classesForDay.forEach(c => {
          const doc = teachers.find(t => t.id === c.docenteId);
          diasHTML += `
            <div style="margin-bottom: 12px;">
              <div style="font-weight:bold; font-size:14px;">${doc ? doc.nombre.split(' ')[0].toUpperCase() : ''}</div>
              <div style="font-size:14px;">${doc ? doc.materia.toUpperCase() : ''}</div>
              <div style="margin-top:2px; font-weight:bold; font-size:14px;">${c.horaInicio} a ${c.horaFin}</div>
            </div>
          `;
        });
        diasHTML += `</td>`;
      } else {
        diasHTML += `<td class="schedule-cell"></td>`;
      }
    });

    html += `
      <div class="ficha">
        <table class="ficha-table">
          <tr>
            <td class="photo-cell">
              ${e.foto ? `<img src="${e.foto}" alt="Foto">` : `<div style="width:95px; height:115px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; color:#999; font-size:12px; border:1px solid #ccc;">Sin foto</div>`}
            </td>
            <td class="info-cell" colspan="4" style="line-height: 1.6;">
              <span style="font-size: 16px; font-weight: bold; font-style: italic;">${e.nombre.toUpperCase()}:</span> <span style="font-size: 16px;">${e.grado || e.nivel}.</span> 
              <span style="font-size: 15px; font-style: italic;">ESC. DE ORIGEN:</span> <span style="font-size: 18px; font-weight: bold;">${e.escuelaOrigen || 'S/D'}</span> - 
              <span style="font-size: 15px; font-style: italic;">DOMICILIO:</span> <span class="link-text" style="font-size: 16px;">${e.domicilio || 'S/D'}</span> - 
              <span style="font-size: 15px; font-style: italic;">BARRIO:</span> <span style="font-size: 16px;">${e.barrio || 'S/D'}</span> - 
              <span style="font-size: 15px; font-style: italic;">TELÉFONO:</span> <span class="link-text" style="font-size: 16px;">${e.telefono || 'S/D'}</span> - 
              <span style="font-size: 15px; font-style: italic;">WI-FI:</span> <span class="info-label" style="font-size: 16px;">${e.wifi || 'S/D'}</span> 
              <span style="font-size: 15px; font-style: italic;">3G/4G:</span> <span class="info-label" style="font-size: 16px;">${e.conectividad || 'S/D'}</span> –
            </td>
          </tr>
          <tr>
            <td colspan="5" class="emergencia-row">
              TELÉFONO DE EMERGENCIAS: ${e.emergencia || ''}
            </td>
          </tr>
          <tr>
            ${dias.map(d => `<th>${d}</th>`).join('')}
          </tr>
          <tr>
            ${diasHTML}
          </tr>
          <tr>
            <td colspan="5" class="vencimiento-row">
              VENCIMIENTO CERTIFICADO: ${formatCertDate(e.certificadoVence)}
            </td>
          </tr>
          <tr>
            <td colspan="5" class="footer-row">
              HORARIOS SUJETOS A MODIFICACIONES.
            </td>
          </tr>
        </table>
      </div>
    `;
  });

  html += `</body></html>`;
  
  // Open in a new tab
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}
