import json

with open('/Users/juanjosemiro/Downloads/Antigravity/Escuela302_2026/js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('const DEFAULT_DATA = {')
end_idx = code.find(';\n\n// MANEJO DE BASE DE DATOS', start_idx)
json_chunk = code[start_idx + len('const DEFAULT_DATA = '):end_idx]
data = json.loads(json_chunk)

print("Current config semana:", data.get('config', {}).get('semana'))
print("Current asignaciones count:", len(data.get('asignaciones', [])))
print("Current historial count:", len(data.get('historial', [])))
for h in data.get('historial', []):
    print(" - Historial:", h.get('rangoSemana'))
