# Umsetzungsplan: Neues Masters-Punktesystem

Dieser Plan ist als roter Faden fuer die manuelle Implementierung gedacht. Er beschreibt die Reihenfolge, die wichtigsten Entscheidungen und die Pruefpunkte, damit die Umstellung nachvollziehbar bleibt.

## Zielbild

Die Masters-Gesamtwertung soll nicht mehr ueber ein fixes Rang-zu-Punkte-Mapping berechnet werden. Stattdessen werden pro Turnier die Masters-Punkte eines Spielers aus seiner erzielten Punktzahl berechnet:

```text
Masters-Punkte = 100 * (erzielte Punkte / maximal erreichbare Punkte) * Turnierfaktor
```

Danach werden die Turnierergebnisse eines Spielers ueber alle vorhandenen Turnier-JSON-Dateien zusammengefuehrt. Fuer die Gesamtwertung wird das schlechteste Turnier eines Spielers gestrichen. In der Rangliste soll ausserdem sichtbar sein, ob ein Spieler fuer das Finale spielberechtigt ist, insbesondere wegen der Mindestanzahl gespielter Turniere.

## Vor der Implementierung klaeren

Diese Punkte sollten bewusst entschieden werden, bevor Code geaendert wird:

- Wo liegen die produktiven Turnier-JSON-Dateien kuenftig? Aktuell liest die Scoreboard-Logik aus `apps/web/src/app/sub/masters/scoreboard/database`. Die neuen Beispiele liegen unter `apps/web/src/app/sub/masters/specs/new-scoring-system`.
- Wie wird `maximal erreichbare Punkte` bestimmt? In den Beispiel-JSONs gibt es `data.totalRounds` und `data.rows[].score`. Die Beispiele wirken wie ein 3-Punkte-System, also wahrscheinlich `totalRounds * 3`. Wenn auch 1-Punkt-Turniere vorkommen koennen, braucht jedes Turnier eine eindeutige Metainfo oder Konfiguration.
- Soll ein einzelnes gespieltes Turnier ebenfalls gestrichen werden? Die Regel sagt "immer das schlechteste Turnier entfernen". Praktisch bedeutet das bei nur einem Turnier `0` Gesamtpunkte. Falls das nicht gewollt ist, muss die Regel praezisiert werden.
- Wie exakt wird die Finalqualifikation bestimmt? Die Seite zum neuen System nennt mindestens drei Turniere. Die alte Scoreboard-Seite arbeitet mit Top 16 plus Sonderregel fuer Spieler, die alle Turniere gespielt haben. Entscheide, ob Top 16 weiterhin gilt und ob der neue Indikator nur die Teilnahmeberechtigung oder die tatsaechliche Finalqualifikation zeigen soll.
- Wie werden Spieler ueber Turniere hinweg eindeutig erkannt? `playerId` darf nicht verwendet werden. Namen sind in den Beispielen unterschiedlich formatiert, z. B. `Minde,Timothe` und `Minde, Timothe`. Es braucht mindestens Normalisierung, eventuell zusaetzlich eine Alias-Liste fuer Sonderfaelle.

## Schritt 1: Datenmodell verstehen und neues Zielmodell skizzieren

Pruefe zuerst die Struktur der neuen JSON-Dateien:

- Turnierdaten: `tournament.id`, `tournament.slug`, `tournament.name`, `tournament.status`
- Wertungsdaten: `data.totalRounds`, `data.rows`
- Spielerzeilen: `rank`, `name`, `rating`, `score`, `withdrawn`

Leite daraus ein internes Zielmodell ab, bevor du bestehende Typen anfasst. Sinnvoll sind mindestens:

- `TournamentInput`: Rohdaten eines Turniers aus der JSON-Datei.
- `TournamentMeta`: Name, Slug/ID, Anzahl Runden, Teilnehmerzahl, Turnierfaktor, maximale Punktzahl.
- `PlayerTournamentResult`: normalisierter Spieler-Key, Anzeigename, erzielte Punkte, Masters-Punkte, Platzierung, gestrichen ja/nein.
- `PlayerStanding`: Anzeigename, gespielte Turniere, gewertete Turniere, gestrichenes Turnier, Gesamtpunkte, Finalberechtigung.

Erfolgskriterium: Du kannst fuer eine einzelne JSON-Datei erklaeren, aus welchen Feldern die Masters-Punkte berechnet werden.

## Schritt 2: Turnierdateien dynamisch laden

Die aktuelle Implementierung kann bereits eine unbekannte Anzahl Dateien lesen, filtert aber auf Dateinamen mit `tournament`. Entscheide, ob diese Konvention beibehalten wird oder ob ein neuer Ordner/Dateinamenfilter fuer OpenPairing-Exports eingefuehrt wird.

Achte dabei auf:

- Nur gueltige JSON-Dateien laden.
- Nur abgeschlossene Turniere werten, falls `tournament.status !== "COMPLETED"` vorkommen kann.
- Eine stabile Sortierung der Turniere herstellen, z. B. nach Dateiname, Datum oder expliziter Konfiguration.
- Fehler verstaendlich machen, wenn eine Datei nicht dem erwarteten Schema entspricht.

Betroffene bestehende Stelle: `apps/web/src/app/sub/masters/scoreboard/utils/getTournamentResults.ts`.

Erfolgskriterium: Die Logik funktioniert mit zwei, fuenf oder mehr Turnierdateien, ohne feste Felder wie `tournament1` bis `tournament5` vorauszusetzen.

## Schritt 3: Spieler-Zusammenfuehrung sauber loesen

Da `playerId` nicht stabil ist, sollte ein eigener Spieler-Key gebildet werden.

Minimaler Ansatz:

- Namen trimmen.
- Leerzeichen um Kommas vereinheitlichen.
- Mehrfache Leerzeichen reduzieren.
- Gross-/Kleinschreibung fuer den Vergleich normalisieren.
- Den Originalnamen fuer die Anzeige separat behalten.

Moegliche Erweiterung:

- Eine kleine Alias-Konfiguration fuer bekannte Sonderfaelle anlegen, z. B. wenn dieselbe Person mit leicht anderem Namen exportiert wird.

Wichtig: Der normalisierte Key ist eine technische Hilfskonstruktion, keine sichere Identitaet. Bei gleichen Namen unterschiedlicher Personen muss es eine manuelle Korrekturmoeglichkeit geben.

Erfolgskriterium: Spieler wie `Minde,Timothe` und `Minde, Timothe` landen in derselben Gesamtwertung.

## Schritt 4: Turnierfaktor berechnen

Der Turnierfaktor kommt aus der Anzahl Teilnehmer:

```text
bis 40 Teilnehmer:     1.00
41 bis 70 Teilnehmer:  1.05
71 bis 100 Teilnehmer: 1.10
ab 101 Teilnehmer:     1.15
```

Lege diese Grenzen zentral ab, nicht verteilt in UI und Berechnung. So bleibt die Regel spaeter leicht aenderbar.

Prueffragen:

- Zaehlen zur Teilnehmerzahl alle `rows`?
- Sollen zurueckgezogene Spieler (`withdrawn: true`) mitzaehlen?
- Werden Spieler mit `score: 0` mitgezaehlt?

Erfolgskriterium: Fuer jede geladene Turnierdatei ist nachvollziehbar, welcher Faktor verwendet wurde und warum.

## Schritt 5: Masters-Punkte pro Turnier berechnen

Berechne fuer jede Spielerzeile:

```text
mastersPoints = 100 * (row.score / maxScore) * tournamentFactor
```

Dabei sollten diese Details bewusst entschieden werden:

- Rundung: Intern moeglichst mit voller Genauigkeit rechnen, fuer Anzeige z. B. auf eine oder zwei Nachkommastellen formatieren.
- `maxScore`: bevorzugt aus `totalRounds * punkteProSieg`. Wenn `punkteProSieg` nicht sicher aus der JSON-Datei hervorgeht, explizit konfigurieren.
- Division durch 0 verhindern, falls `totalRounds` fehlt oder 0 ist.
- Spieler mit `withdrawn: true` nicht automatisch ausschliessen, solange die Regel nichts anderes sagt. Ihre erzielten Punkte koennen trotzdem wertbar sein.

Das alte `pointMapping` wird fuer die neue Berechnung nicht mehr gebraucht. Es sollte erst entfernt werden, wenn die neue Berechnung und die UI vollstaendig umgestellt sind.

Erfolgskriterium: Fuer einen Beispielspieler kannst du die Masters-Punkte per Taschenrechner nachrechnen und kommst auf denselben Wert wie die Anwendung.

## Schritt 6: Gesamtwertung und Streichergebnis bilden

Pro Spieler werden alle Turnierergebnisse gesammelt. Danach:

1. Ergebnisse nach Masters-Punkten sortieren.
2. Das schlechteste Ergebnis als gestrichen markieren.
3. Alle nicht gestrichenen Ergebnisse summieren.
4. Die Anzahl gespielter Turniere separat behalten.

Wichtig ist, gestrichene Ergebnisse nicht einfach zu loeschen. Die UI sollte spaeter anzeigen koennen, welches Turnier gestrichen wurde.

Pruefe besonders:

- Spieler mit nur einem Turnier.
- Spieler mit zwei Turnieren.
- Spieler mit exakt drei Turnieren.
- Punktgleichheit beim schlechtesten Ergebnis.
- Turniere, an denen ein Spieler nicht teilgenommen hat, sind keine `0-Punkte-Turniere`, sondern fehlende Teilnahme.

Erfolgskriterium: Die Gesamtpunktzahl ist die Summe aller Turniere minus genau einem schlechtesten gespielten Turnier, gemaess der zuvor geklaerten Regel fuer Ein-Turnier-Spieler.

## Schritt 7: Sortierung der Rangliste anpassen

Die bestehende Sortierung nutzt `tournamentPoints`, durchschnittliche Platzierung, beste Platzierung und Elo-Leistung. Mit dem neuen System sollte die Primaersortierung klar sein:

1. Gesamtpunkte nach Streichergebnis absteigend.
2. Bei Gleichstand eine bewusst gewaehlte Tie-Break-Regel.

Moegliche Tie-Breaker:

- mehr gespielte Turniere,
- hoechstes einzelnes gewertetes Ergebnis,
- bestes nicht gestrichenes Ergebnis,
- beste Platzierung,
- alter Elo-Performance-Wert nur, wenn er weiterhin fachlich sinnvoll ist.

Der Tie-Breaker sollte im Code und idealerweise in der UI nachvollziehbar bleiben.

Betroffene bestehende Stelle: `apps/web/src/app/sub/masters/scoreboard/utils/sortPlayers.ts`.

Erfolgskriterium: Zwei punktgleiche Spieler werden deterministisch sortiert, ohne zufaellige Reihenfolge durch Dateilade- oder Array-Reihenfolge.

## Schritt 8: Finalberechtigung berechnen

Fuehre ein eigenes Feld fuer die Finalberechtigung ein, z. B. sinngemaess:

- `playedTournamentCount`
- `isFinalEligibleByParticipation`
- `finalEligibilityReason`

Nach aktueller Beschreibung ist ein Spieler nicht spielberechtigt, wenn er die Mindestanzahl an Turnieren nicht gespielt hat. Die Erklaerseite nennt mindestens drei Turniere.

Trenne dabei zwei Begriffe:

- Teilnahmeberechtigt: Mindestanzahl Turniere erfuellt.
- Qualifiziert: gehoert nach Gesamtwertung zu den Finalplaetzen.

Diese Trennung verhindert spaeter Missverstaendnisse in der Tabelle.

Betroffene bestehende Stellen:

- `apps/web/src/app/sub/masters/scoreboard/utils/playerUtils.ts`
- `apps/web/src/app/sub/masters/scoreboard/components/table-row.tsx`
- `apps/web/src/app/sub/masters/scoreboard/components/table-body.tsx`

Erfolgskriterium: Ein Spieler ausserhalb der Mindestanzahl wird in der Rangliste erkennbar als nicht finalberechtigt angezeigt, auch wenn seine Punkte hoch sind.

## Schritt 9: Tabellenanzeige auf dynamische Turniere umbauen

Die aktuelle Tabelle hat feste Spalten fuer `Turnier 1` bis `Turnier 5`. Das passt nicht mehr zur unbekannten Anzahl an JSON-Dateien.

Passe die UI gedanklich so an:

- Tabellenkopf aus der geladenen Turnierliste erzeugen.
- Pro Spieler pro Turnier den berechneten Masters-Punktwert anzeigen.
- Gestrichenes Ergebnis visuell markieren, z. B. durch Zusatztext, gedimmte Darstellung oder Tooltip.
- Gesamtpunkte nach Streichergebnis anzeigen.
- Anzahl gespielter Turniere anzeigen.
- Finalberechtigung klar, aber nicht ueberladen darstellen.

Betroffene bestehende Stellen:

- `apps/web/src/app/sub/masters/scoreboard/components/table-head.tsx`
- `apps/web/src/app/sub/masters/scoreboard/components/table-row.tsx`
- `apps/web/src/app/sub/masters/scoreboard/components/table-body.tsx`
- `apps/web/src/app/sub/masters/scoreboard/components/Table.tsx`

Erfolgskriterium: Eine zusaetzliche Turnierdatei erzeugt automatisch eine weitere Turnierspalte oder eine anderweitig nachvollziehbare Darstellung, ohne dass Tabellen-Code manuell erweitert werden muss.

## Schritt 10: Alte Annahmen entfernen oder bewusst behalten

Beim Umbau aufraeumen, aber nur dort, wo es zur Umstellung gehoert:

- `pointMapping` ersetzen oder entfernen.
- Feste Felder `tournament1` bis `tournament5` durch eine Liste oder Map ersetzen.
- `hasPlayedAllTournaments` durch die neue Mindestteilnahme-Regel ersetzen.
- Hardcodierte Sonderfaelle wie `player.name === "Uhl,Lars"` pruefen und entweder fachlich begruenden oder entfernen.
- Texte auf der Scoreboard-Seite aktualisieren, damit sie zum neuen System passen.

Erfolgskriterium: Im Scoreboard-Code gibt es keine versteckte Annahme mehr, dass exakt fuenf Turniere vorhanden sind.

## Schritt 11: Testfaelle vorbereiten

Auch wenn die Implementierung manuell erfolgt, lohnt sich eine kleine fachliche Testliste.

Mindestens pruefen:

- Ein Turnier mit 40 Teilnehmern verwendet Faktor `1.00`.
- Ein Turnier mit 41 Teilnehmern verwendet Faktor `1.05`.
- Ein Turnier mit 71 Teilnehmern verwendet Faktor `1.10`.
- Ein Turnier mit 101 Teilnehmern verwendet Faktor `1.15`.
- Ein Spieler mit Namensvariante wird zusammengefuehrt.
- Ein Spieler mit drei Turnieren ist teilnahmeberechtigt.
- Ein Spieler mit zwei Turnieren ist nicht teilnahmeberechtigt.
- Das schlechteste gespielte Turnier wird gestrichen.
- Nicht teilgenommene Turniere werden nicht als schlechtestes Ergebnis gewertet.
- Eine weitere JSON-Datei wird ohne Codeaenderung geladen.

Erfolgskriterium: Die wichtigsten Regeln sind unabhaengig von der UI pruefbar.

## Schritt 12: Manuelle Abnahme mit Beispieldaten

Zum Schluss die Beispiel-JSONs einmal manuell durchgehen:

- Stimmen Teilnehmerzahl und Faktor?
- Stimmen `totalRounds`, angenommene Punkte pro Sieg und maximale Punktzahl?
- Stimmen die Masters-Punkte fuer mindestens drei Spieler pro Turnier?
- Werden gleiche Spieler aus beiden Dateien korrekt zusammengefuehrt?
- Wird das schlechteste Turnier korrekt markiert?
- Ist in der Tabelle klar, ob ein Spieler finalberechtigt ist?

Erfolgskriterium: Ein fachlicher Leser kann aus JSON, Formel und Tabelle nachvollziehen, wie die angezeigte Gesamtwertung entstanden ist.

## Empfohlene Implementierungsreihenfolge

1. Datenmodell und offene Regeln klaeren.
2. Loader fuer neue Turnier-JSONs stabilisieren.
3. Namensnormalisierung und Spieler-Zusammenfuehrung bauen.
4. Turnierfaktor und Masters-Punkte pro Turnier berechnen.
5. Gesamtwertung mit Streichergebnis bilden.
6. Sortierung anpassen.
7. Finalberechtigung berechnen.
8. Tabellen-UI dynamisieren.
9. Alte Annahmen entfernen.
10. Fachliche Testfaelle und manuelle Abnahme durchgehen.

## Kleine Orientierung beim Arbeiten

Wenn du waehrend der Umsetzung stecken bleibst, frage zuerst:

- Welche Regel versuche ich gerade abzubilden?
- Kommt der Fehler aus dem Laden, dem Zusammenfuehren, der Berechnung, der Sortierung oder der Anzeige?
- Kann ich den Wert fuer einen Spieler und ein Turnier von Hand nachrechnen?
- Ist ein Turnier nicht gespielt oder mit 0 Punkten gespielt worden?
- Verwende ich gerade den Anzeigenamen oder den normalisierten Spieler-Key?

Diese Trennung macht die Umstellung deutlich leichter zu debuggen.
