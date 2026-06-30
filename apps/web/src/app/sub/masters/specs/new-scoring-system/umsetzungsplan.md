# Umsetzungsplan: Neues Masters-Punktesystem

Dieser Plan ist als roter Faden fuer die manuelle Implementierung gedacht. Er beschreibt die Reihenfolge, die wichtigsten Entscheidungen und die Pruefpunkte, damit die Umstellung nachvollziehbar bleibt.

## Zielbild

Die Masters-Gesamtwertung soll nicht mehr ueber ein fixes Rang-zu-Punkte-Mapping berechnet werden. Stattdessen werden pro Turnier die Masters-Punkte eines Spielers aus seiner erzielten Punktzahl berechnet:

```text
Masters-Punkte = 100 * (erzielte Punkte / maximal erreichbare Punkte) * Turnierfaktor
```

Danach werden die Turnierergebnisse eines Spielers ueber alle vorhandenen Turnier-JSON-Dateien zusammengefuehrt. Fuer die Gesamtwertung werden bis zu drei gespielte Turniere voll gezaehlt; erst ab dem vierten gespielten Turnier wird das schlechteste Ergebnis gestrichen. In der Rangliste soll ausserdem sichtbar sein, ob ein Spieler regulaerer Finalist ist, wegen zu weniger Turniere nicht finalberechtigt ist oder als Nachruecker ins Finale kommt.

## Geklaerte Grundregeln

Diese fachlichen Entscheidungen sind Grundlage fuer die Implementierung:

- Die produktiven Turnier-JSON-Dateien bleiben im bestehenden Datenordner `apps/web/src/app/sub/masters/scoreboard/database`.
- Die Dateinamen folgen weiterhin dem Muster `tournament_1.json`, `tournament_2.json` usw.
- Das kuenftige Dateiformat entspricht `apps/web/src/app/sub/masters/specs/new-scoring-system/json-example-stripped.json`.
- Die Turnier-Metadaten liegen im schlanken Endformat unter `data`, z. B. `data.tournamentName`, `data.totalRounds` und `data.pointRule`.
- Die maximale Punktzahl eines Turniers wird aus `data.totalRounds` und der Turnier-Punkteregel berechnet.
- Jedes Turnier bekommt ein Metafeld `pointRule`, damit 3-Punkte-Turniere und 1-Punkt-Turniere eindeutig unterschieden werden koennen.
- Ein Streichergebnis gibt es erst ab dem vierten gespielten Turnier. Bei einem, zwei oder drei gespielten Turnieren werden alle Ergebnisse gezaehlt.
- Fuer die Finalwertung gilt weiterhin Top 16.
- Finalist ist nur, wer innerhalb der relevanten Rangfolge mindestens drei Turniere gespielt hat.
- Wenn ein Spieler in den Top 16 steht, aber weniger als drei Turniere gespielt hat, wird er markiert und nicht als regulaerer Finalist gewertet.
- Der naechstplatzierte Spieler, der die Mindestanzahl von drei Turnieren erfuellt, rueckt als Finalist nach und wird entsprechend markiert.
- Die `playerId` aus den Turnier-JSONs wird nicht verwendet.
- Stattdessen gibt es eine eigene `playerID`. Zu jeder `playerID` gehoert eine Mapping-Struktur, z. B. ein `Set`, in dem bekannte Namensvarianten dieses Spielers gesammelt werden.

## Schritt 1: Datenmodell verstehen und neues Zielmodell skizzieren

Pruefe zuerst die Struktur der neuen JSON-Dateien:

- Turnierdaten: `data.tournamentName`
- Wertungsdaten: `data.totalRounds`, `data.pointRule`, `data.rows`
- Spielerzeilen: `rank`, `playerId`, `name`, `rating`, `score`, optional `tiebreaks`

Das Endformat enthaelt keinen separaten `tournament`-Block und aktuell auch keinen `tournament.status`. Falls spaeter wieder Statusinformationen benoetigt werden, muessten sie entweder im JSON ergaenzt oder ueber eine separate Konfiguration abgebildet werden.

Leite daraus ein internes Zielmodell ab, bevor du bestehende Typen anfasst. Sinnvoll sind mindestens:

- `TournamentInput`: Rohdaten eines Turniers aus der JSON-Datei.
- `TournamentMeta`: Dateiname, Turniername, Anzahl Runden, `pointRule`, Punkte pro Runde, Teilnehmerzahl, Turnierfaktor, maximale Punktzahl.
- `PlayerTournamentResult`: eigene `playerID`, Anzeigename, erzielte Punkte, Masters-Punkte, Platzierung, gestrichen ja/nein.
- `PlayerStanding`: eigene `playerID`, Anzeigename, gespielte Turniere, gewertete Turniere, gestrichenes Turnier, Gesamtpunkte, Finalstatus.

Erfolgskriterium: Du kannst fuer eine einzelne JSON-Datei erklaeren, aus welchen Feldern die Masters-Punkte berechnet werden, inklusive der Frage, ob das Turnier nach 1-Punkt- oder 3-Punkte-Regel gewertet wird.

## Schritt 2: Turnierdateien dynamisch laden

Die aktuelle Implementierung kann bereits eine unbekannte Anzahl Dateien lesen, filtert aber auf Dateinamen mit `tournament`. Diese Konvention wird beibehalten: Die produktiven Dateien liegen weiterhin unter `apps/web/src/app/sub/masters/scoreboard/database` und heissen `tournament_1.json`, `tournament_2.json` usw.

Achte dabei auf:

- Nur gueltige JSON-Dateien laden.
- Das schlanke Endformat hat keinen Status. Deshalb gelten Dateien im produktiven Datenordner als zu wertende Turniere, sobald sie dem erwarteten Schema entsprechen.
- Eine stabile Sortierung der Turniere nach Dateiname herstellen, damit `tournament_1.json`, `tournament_2.json` usw. in nachvollziehbarer Reihenfolge verarbeitet werden.
- `data.tournamentName` als Anzeigenamen verwenden; der Dateiname bleibt die technische stabile Turnierreferenz.
- Das neue Metafeld `pointRule` validieren, weil es fuer die maximale Punktzahl notwendig ist.
- Fehler verstaendlich machen, wenn eine Datei nicht dem erwarteten Schema entspricht.

Betroffene bestehende Stelle: `apps/web/src/app/sub/masters/scoreboard/utils/getTournamentResults.ts`.

Erfolgskriterium: Die Logik funktioniert mit zwei, fuenf oder mehr Turnierdateien, ohne feste Felder wie `tournament1` bis `tournament5` vorauszusetzen.

## Schritt 3: Spieler-Zusammenfuehrung sauber loesen

Da die `playerId` aus den JSON-Dateien nicht verwendet werden soll, wird eine eigene `playerID` eingefuehrt. Diese ID ist die technische Identitaet eines Spielers ueber alle Turniere hinweg.

Die Zuordnung sollte nicht direkt aus einem einzelnen Exportnamen abgeleitet werden, sondern ueber eine Mapping-Struktur laufen:

- Pro Spieler gibt es genau eine eigene `playerID`.
- Zu jeder `playerID` gehoert ein `Set` mit bekannten Namensvarianten.
- Beim Einlesen wird der Exportname normalisiert und gegen diese Sets gematcht.
- Der Originalname aus dem Export kann fuer Anzeigezwecke erhalten bleiben, die Zusammenfuehrung laeuft aber ueber die eigene `playerID`.

Die Normalisierung bleibt trotzdem wichtig, damit harmlose Formatierungsunterschiede nicht zu doppelten Mapping-Eintraegen fuehren:

- Namen trimmen.
- Leerzeichen um Kommas vereinheitlichen.
- Mehrfache Leerzeichen reduzieren.
- Gross-/Kleinschreibung fuer den Vergleich normalisieren.

Moegliche Erweiterung:

- Eine zentrale Mapping-Datei oder Konfiguration anlegen, in der die `playerID` und das jeweilige Set bekannter Namensvarianten gepflegt werden.

Wichtig: Die eigene `playerID` ist die sichere technische Identitaet. Der normalisierte Name ist nur ein Hilfsmittel zum Matching. Bei gleichen oder sehr aehnlichen Namen unterschiedlicher Personen muss das Mapping manuell eindeutig gepflegt werden.

Erfolgskriterium: Spieler wie `Minde,Timothe` und `Minde, Timothe` landen in derselben Gesamtwertung, weil beide Namensvarianten derselben eigenen `playerID` zugeordnet sind.

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
- Falls spaeter wieder ein `withdrawn`-Feld auftaucht: Sollen zurueckgezogene Spieler mitzaehlen?
- Werden Spieler mit `score: 0` mitgezaehlt?

Erfolgskriterium: Fuer jede geladene Turnierdatei ist nachvollziehbar, welcher Faktor verwendet wurde und warum.

## Schritt 5: Masters-Punkte pro Turnier berechnen

Berechne fuer jede Spielerzeile:

```text
mastersPoints = 100 * (row.score / maxScore) * tournamentFactor
```

Dabei sollten diese Details bewusst entschieden werden:

- Rundung: Intern moeglichst mit voller Genauigkeit rechnen, fuer Anzeige z. B. auf eine oder zwei Nachkommastellen formatieren.
- `maxScore`: aus `data.totalRounds * punkteProRunde` berechnen.
- `punkteProRunde`: aus `data.pointRule` ableiten. Fuer 3-Punkte-Turniere ist der Wert `3`, fuer 1-Punkt-Turniere `1`.
- `pointRule` sollte pro Turnier explizit vorhanden sein. Falls das Feld fehlt, sollte die Datei entweder bewusst abgelehnt werden oder es braucht eine klar dokumentierte Fallback-Regel.
- Division durch 0 verhindern, falls `totalRounds` fehlt oder 0 ist.
- Das schlanke Endformat enthaelt aktuell kein `withdrawn`-Feld. Falls es spaeter wieder auftaucht, sollten Spieler nicht automatisch ausgeschlossen werden, solange die Regel nichts anderes sagt. Ihre erzielten Punkte koennen trotzdem wertbar sein.
- `tiebreaks` koennen fuer Anzeige oder spaetere Tie-Break-Regeln erhalten bleiben, sind aber nicht Teil der Masters-Punkte-Formel.

Das alte `pointMapping` wird fuer die neue Berechnung nicht mehr gebraucht. Es sollte erst entfernt werden, wenn die neue Berechnung und die UI vollstaendig umgestellt sind.

Erfolgskriterium: Fuer einen Beispielspieler kannst du die Masters-Punkte per Taschenrechner nachrechnen und kommst auf denselben Wert wie die Anwendung.

## Schritt 6: Gesamtwertung und Streichergebnis bilden

Pro Spieler werden alle Turnierergebnisse gesammelt. Danach:

1. Anzahl der gespielten Turniere bestimmen.
2. Bei einem, zwei oder drei gespielten Turnieren alle Ergebnisse werten.
3. Erst ab vier gespielten Turnieren die Ergebnisse nach Masters-Punkten sortieren.
4. Das schlechteste gespielte Ergebnis als gestrichen markieren.
5. Alle nicht gestrichenen Ergebnisse summieren.
6. Die Anzahl gespielter Turniere separat behalten.

Wichtig ist, gestrichene Ergebnisse nicht einfach zu loeschen. Die UI sollte spaeter anzeigen koennen, welches Turnier gestrichen wurde.

Pruefe besonders:

- Spieler mit nur einem Turnier: kein Streichergebnis.
- Spieler mit zwei Turnieren: kein Streichergebnis.
- Spieler mit exakt drei Turnieren: kein Streichergebnis.
- Spieler mit vier Turnieren: genau ein Streichergebnis.
- Punktgleichheit beim schlechtesten Ergebnis.
- Turniere, an denen ein Spieler nicht teilgenommen hat, sind keine `0-Punkte-Turniere`, sondern fehlende Teilnahme.

Erfolgskriterium: Die Gesamtpunktzahl ist bei bis zu drei gespielten Turnieren die Summe aller gespielten Turniere. Ab vier gespielten Turnieren ist sie die Summe aller gespielten Turniere minus genau einem schlechtesten gespielten Turnier.

## Schritt 7: Sortierung der Rangliste anpassen

Die bestehende Sortierung nutzt `tournamentPoints`, durchschnittliche Platzierung, beste Platzierung und Elo-Leistung. Mit dem neuen System sollte die Primaersortierung klar sein:

1. Gesamtpunkte nach Streichergebnis absteigend.
2. Bei Gleichstand eine bewusst gewaehlte Tie-Break-Regel.

Moegliche Tie-Breaker:

- mehr gespielte Turniere,
- hoechstes einzelnes gewertetes Ergebnis,
- bestes nicht gestrichenes Ergebnis,
- beste Platzierung,
- Werte aus `data.rows[].tiebreaks`, falls eine fachliche Regel diese OpenPairing-Tie-Breaks spaeter verwenden soll,
- alter Elo-Performance-Wert nur, wenn er weiterhin fachlich sinnvoll ist.

Der Tie-Breaker sollte im Code und idealerweise in der UI nachvollziehbar bleiben.

Betroffene bestehende Stelle: `apps/web/src/app/sub/masters/scoreboard/utils/sortPlayers.ts`.

Erfolgskriterium: Zwei punktgleiche Spieler werden deterministisch sortiert, ohne zufaellige Reihenfolge durch Dateilade- oder Array-Reihenfolge.

## Schritt 8: Finalisten und Nachruecker berechnen

Fuehre eigene Felder fuer Teilnahmeberechtigung und Finalstatus ein, z. B. sinngemaess:

- `playedTournamentCount`
- `isFinalEligibleByParticipation`
- `isInTop16`
- `isFinalist`
- `isDisqualifiedFromFinals`
- `isReplacementFinalist`
- `finalEligibilityReason`

Ein Spieler ist fuer das Finale nur dann regulaer qualifiziert, wenn beide Bedingungen erfuellt sind:

1. Er steht nach Gesamtwertung innerhalb der Top 16.
2. Er hat mindestens drei Turniere gespielt.

Trenne dabei zwei Begriffe:

- Teilnahmeberechtigt: Mindestanzahl Turniere erfuellt.
- Qualifiziert: gehoert nach Gesamtwertung zu den Finalplaetzen und erfuellt die Teilnahmebedingung.

Die Finalistenlogik sollte danach so arbeiten:

1. Rangliste nach Gesamtpunkten und Tie-Breakern sortieren.
2. Die ersten 16 Plaetze als Top-16-Bereich markieren.
3. Innerhalb dieses Bereichs Spieler mit weniger als drei gespielten Turnieren sichtbar markieren.
4. Diese Spieler nicht als regulaere Finalisten zaehlen.
5. Aus den nachfolgenden Plaetzen so lange Spieler nachruecken lassen, bis 16 teilnahmeberechtigte Finalisten erreicht sind oder keine passenden Spieler mehr vorhanden sind.
6. Nachruecker sichtbar als solche kennzeichnen.

Diese Trennung verhindert spaeter Missverstaendnisse in der Tabelle: Ein Spieler kann in den Top 16 stehen, aber wegen zu weniger Turniere nicht finalberechtigt sein. Ein anderer Spieler kann ausserhalb der Top 16 stehen, aber als Nachruecker tatsaechlich Finalist werden.

Betroffene bestehende Stellen:

- `apps/web/src/app/sub/masters/scoreboard/utils/playerUtils.ts`
- `apps/web/src/app/sub/masters/scoreboard/components/table-row.tsx`
- `apps/web/src/app/sub/masters/scoreboard/components/table-body.tsx`

Erfolgskriterium: Ein Spieler innerhalb der Top 16 mit weniger als drei gespielten Turnieren wird erkennbar markiert und nicht als Finalist gezaehlt. Der naechstplatzierte Spieler mit mindestens drei gespielten Turnieren wird als Nachruecker und Finalist markiert.

## Schritt 9: Tabellenanzeige auf dynamische Turniere umbauen

Die aktuelle Tabelle hat feste Spalten fuer `Turnier 1` bis `Turnier 5`. Das passt nicht mehr zur unbekannten Anzahl an JSON-Dateien.

Passe die UI gedanklich so an:

- Tabellenkopf aus der geladenen Turnierliste erzeugen.
- Pro Spieler pro Turnier den berechneten Masters-Punktwert anzeigen.
- Gestrichenes Ergebnis visuell markieren, z. B. durch Zusatztext, gedimmte Darstellung oder Tooltip.
- Gesamtpunkte nach Streichergebnis anzeigen.
- Anzahl gespielter Turniere anzeigen.
- Finalstatus klar, aber nicht ueberladen darstellen: regulaerer Finalist, wegen Mindestteilnahme nicht finalberechtigt, oder Nachruecker.

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
- Verwendungen der exportierten `playerId` entfernen und durch die eigene `playerID` samt Mapping ersetzen.
- Sicherstellen, dass `pointRule` statt versteckter Annahmen ueber 1-Punkt- oder 3-Punkte-Turniere verwendet wird.
- Alte Zugriffe auf `tournament.name`, `tournament.slug`, `tournament.id` oder `tournament.status` durch das neue Endformat ersetzen.
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
- Ein 3-Punkte-Turnier berechnet `maxScore` als `totalRounds * 3`.
- Ein 1-Punkt-Turnier berechnet `maxScore` als `totalRounds * 1`.
- Ein Spieler mit drei Turnieren ist teilnahmeberechtigt.
- Ein Spieler mit zwei Turnieren ist nicht teilnahmeberechtigt.
- Ein Spieler mit drei Turnieren hat kein Streichergebnis.
- Ein Spieler mit vier Turnieren bekommt genau ein Streichergebnis.
- Nicht teilgenommene Turniere werden nicht als schlechtestes Ergebnis gewertet.
- Ein Top-16-Spieler mit weniger als drei Turnieren wird markiert und nicht als Finalist gezaehlt.
- Der naechstplatzierte Spieler mit mindestens drei Turnieren wird als Nachruecker-Finalist markiert.
- Eine weitere JSON-Datei wird ohne Codeaenderung geladen.
- Eine Datei im Endformat mit `data.tournamentName`, `data.totalRounds`, `data.pointRule` und `data.rows` wird korrekt geladen.
- Eine Datei ohne `tournament`-Block wird nicht wegen fehlender alter Metadaten abgelehnt.

Erfolgskriterium: Die wichtigsten Regeln sind unabhaengig von der UI pruefbar.

## Schritt 12: Manuelle Abnahme mit Beispieldaten

Zum Schluss die Beispiel-JSONs einmal manuell durchgehen:

- Entspricht die Datei dem Endformat aus `json-example-stripped.json`?
- Stimmen Teilnehmerzahl und Faktor?
- Stimmen `totalRounds`, `pointRule`, Punkte pro Runde und maximale Punktzahl?
- Stimmen die Masters-Punkte fuer mindestens drei Spieler pro Turnier?
- Werden gleiche Spieler aus beiden Dateien korrekt zusammengefuehrt?
- Wird das schlechteste Turnier erst ab dem vierten gespielten Turnier korrekt markiert?
- Ist in der Tabelle klar, ob ein Spieler regulaerer Finalist, nicht finalberechtigt oder Nachruecker ist?

Erfolgskriterium: Ein fachlicher Leser kann aus JSON, Formel und Tabelle nachvollziehen, wie die angezeigte Gesamtwertung entstanden ist.

## Empfohlene Implementierungsreihenfolge

1. Datenmodell und offene Regeln klaeren.
2. Loader fuer neue Turnier-JSONs stabilisieren.
3. Eigene `playerID` samt Mapping und Namensnormalisierung bauen.
4. `pointRule`, Turnierfaktor und Masters-Punkte pro Turnier berechnen.
5. Gesamtwertung mit Streichergebnis bilden.
6. Sortierung anpassen.
7. Finalisten, nicht berechtigte Top-16-Spieler und Nachruecker berechnen.
8. Tabellen-UI dynamisieren.
9. Alte Annahmen entfernen.
10. Fachliche Testfaelle und manuelle Abnahme durchgehen.

## Kleine Orientierung beim Arbeiten

Wenn du waehrend der Umsetzung stecken bleibst, frage zuerst:

- Welche Regel versuche ich gerade abzubilden?
- Kommt der Fehler aus dem Laden, dem Zusammenfuehren, der Berechnung, der Sortierung oder der Anzeige?
- Kann ich den Wert fuer einen Spieler und ein Turnier von Hand nachrechnen?
- Ist ein Turnier nicht gespielt oder mit 0 Punkten gespielt worden?
- Verwende ich gerade den Anzeigenamen, den normalisierten Namen oder die eigene `playerID`?
- Greift gerade die 1-Punkt- oder die 3-Punkte-Regel?
- Ist der Spieler regulaerer Top-16-Finalist, nicht teilnahmeberechtigt oder Nachruecker?

Diese Trennung macht die Umstellung deutlich leichter zu debuggen.
