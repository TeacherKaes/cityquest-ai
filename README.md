# CityQuest AI Alpha v3 – One-Click Teacher Flow

Diese Version ist auf einfache Bedienung ausgelegt.

## Für Lehrkräfte

1. Website öffnen
2. "Quest erstellen" klicken
3. Edition, Niveau, Dauer wählen
4. QR-Code anzeigen
5. Schülerinnen und Schüler scannen
6. Los geht's

## Lokal starten

```bash
npm install
npm run dev
```

Dann öffnen:

```text
http://localhost:3000
```

## Demo-Modus

Ohne Supabase und ohne OpenAI läuft die App trotzdem im Demo-Modus.

- Teacher Wizard funktioniert
- QR-Code wird erzeugt
- Schüler können lokal spielen
- NPC-Chat nutzt sicheren Fallback

## Online-Modus

Für echten Schülerlink über mehrere Geräte:

1. Supabase-Projekt erstellen
2. `supabase/schema.sql` ausführen
3. `.env.local` anlegen
4. Supabase-Werte eintragen
5. Optional OpenAI-Key eintragen
6. Auf Vercel deployen

## Wichtig

Im Alltag brauchst du später nur noch `/teacher`.
