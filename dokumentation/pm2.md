# Titel

Lucas LG, 2023-06-06

## Inledning

Syftet med arbetet var att använda våra kunskaper om routes och databaser för att skapa ett slags slutprojekt. I mitt fall valde jag att förbättra mitt clickerspel.

## Bakgrund

I denna uppgift valde jag att förbättra mitt gamla clickerspel med login- och databasfunktioner. Först flyttades clickerspelet över till ubuntu. Därefter installerade jag en massa packages som behövdes för att få de nya funktionerna att fungera och skapade några nya nödvändiga filer. Sedan tog jag kod för att logga in och registrera sig från ett tidigare projekt och satte in det i clickerspelsprojektet. Jag skapade även en ny tabell i Tableplus för spelarna i mitt spel med kolumner för de olika datan som skulle sparas i databasen när spelaren loggade in och sparade sina framsteg. Jag lyckades däremot tyvärr inte lista ut hur man skulle hämta datan från Tableplus in i klientens clicker.js. På grund av tidsbegränsningar blev jag därefter tvungen att ge upp.

## Positiva erfarenheter

Det som var positivt var att det var ganska lätt att implementera koden för att registrera sig och logga in. Det lyckades jag fixa väldigt snabbt.

## Negativa erfarenheter

Det var lite problem med att få allt att fungera i ubuntu till en början. Lyckligtvis lyckades jag få det att fungera tillslut. Det största problemet med projektet var som sagt att hämta datan från databasen till klienten. Jag hoppas att det inte är något super-självklart som jag har missat, men jag har tidigare bara lyckats printa ut datan i HTMLen med hjälp av nunjucks. Jag har aldrig lyckats hämta datan in i en javascriptfil på klientens sida. Jag försökte lista ut hur man skulle göra det i flera, flera timmar, men tyvärr hittade jag aldrig lösningen.

## Sannnnanfatning

Jag är överlag inte särskilt nöjd med projektet. Problemet som uppstod var som en vägg som jag inte kunde komma förbi. Jag hade kanske kunnat lösa problemet om jag hade jobbat effektivare på lektionerna, men samtidigt har jag varit väldigt upptagen med andra ämnen också. Det var dessutom inte alltid lätt att få hjälp när läraren ofta var borta. Ifall jag hade kunnat lösa problemet hade jag gjort så att man kan ladda och spara sina framsteg på en databas, samt att kunna visa sina achievements på sin profil. 