# Aufgabe
Es gibt ein neues Punktesystem. Die Berechnung der Punkte läuft nun anders
als in der aktuellen Implementierung unter `C:\Users\alexmuzenhardt\Documents\projects\sv-altbach\apps\web\src\app\sub\masters\scoreboard`.

# Berechnungsgrundlage
- Für die Berechnung gibt es eine neue Formel: Masters-Punkte = 100 × (erzielte Punkte / maximal erreichbare Punkte) × Turnierfaktor
- Für jedes Turnier gibt es eine JSON-Datei. Beispiel der JSON-Datei unter `C:\Users\alexmuzenhardt\Documents\projects\sv-altbach\apps\web\src\app\sub\masters\specs\new-scoring-system\json-example.json` und `C:\Users\alexmuzenhardt\Documents\projects\sv-altbach\apps\web\src\app\sub\masters\specs\new-scoring-system\json-example2.json`.
- Es müssen am Ende die Punkte eines Spielers aus allen vorhandenen JSON-Dateien (unbekannte Anzahl) addiert werden, damit der Spieler eine Gesamtpunktzahl über alle gespielte Turniere hat.
- In der JSON-Datei gibt es eine `playerID`. Die kann nicht als Referenz herangezogen werden, da sie sich von Turnier zu Turnier ändert.
- Eine Erklärung zu der neuen Punktereglung gibt es unter `C:\Users\alexmuzenhardt\Documents\projects\sv-altbach\apps\web\src\app\sub\masters\new-scoring-system\page.tsx`.
- In der Gesamtwertung muss immer das schlechteste Turnier aus der Gesamtwertung entfernt werden.

# Allgemeines
- Die Rangliste zeigt die aktuelle Wertung. Allerdings benötigt man einen Indikator, der zeigt, ob ein Spieler im Finale spielberechtigt ist. Ein Spieler kann nicht spielberechtigt sein, weil er nicht die mindestanzahl an Turnieren gespielt hat.
