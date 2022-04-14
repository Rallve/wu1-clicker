# Clicker spel

Lucas Liedgren, 2022-04-14

Titel: Legend of Fantasia

Tagline: Fight dangerous foes, gain XP and become the most powerful being in the legendary land of Fantasia!

URL: https://rallve.github.io/wu1-clicker/

Git: https://github.com/Rallve/wu1-clicker

## Inledning

Syftet med arbetet var att skapa ett clickerspel med ett tema och anpassa designen utifrån temat, samt lägga till/ändra lite på javascriptkoden. Vi började med en ganska designlös mall som vi sedan skulle ändra färgerna och bilderna på, samt ändra text och font.

## Bakgrund

Först funderade jag på vilket tema jag ville ha innan jag började ändra något på mallen. Ganska snabbt bestämde jag mig för att göra en RPG/Dungeon Crawler-tema eftersom att personligen tycker jag att det är ett allmänt kul tema som jag har velat använda i ett framtida spel som jag vill skapa, men också för att det finns väldigt många möjligheter för olika intressanta funktioner att lägga till som har med temat att göra.

Därefter skapade jag en pixelart bild i Photoshop av ett landskap som jag placerade på toppen av sidan, och sedan ändrade jag bakgrundsfärgen på sidan till jordfärg. Detta skapade en effekt där sidans innehåll var under marken. Sedan skapade jag även en karaktär och en slime som jag placerade ovanpå landskapsbilden genom att ändra på margin. Sedan ändrade jag även på text och font, och lade 
till en bild på clicker button som jag skapade i Photoshop. 

Nu när min sida såg ut som jag ville började lag försöka lägga till fler funktioner genom att ändra på javascriptkoden. En av de första sakerna jag gjorde var att lägga till en slash bild som visas varje gång man klickar på knappen. Den andra saken jag ville lägga till var en XP bar som ökar varje gång man attackerar slimen. När baren fylls börjar den om igen och kräver mer XP för att fylla, och spelarens level går upp. För att lägga till en mening att levla upp gjorde jag så att spelaren får en 10% bonus för money per second (Epicness) som verkade både på spelarens nuvarande epicness men också uppgraderingarna. Eftersom uppgraderingarna ändrades var jag tvungen att göra så att texten uppdateras varje sekund så att ändringarna visades. För att ge mer känsla av progress för spelaren lade jag till ännu en knapp där olika statistik visas, bland annat hur många gånger man har klickat.

Slutligen ville jag lägga till animationer. Vid det här laget har min klasskamrat Edwin skapat en gif av min slime png så att slimen såg mer livlig ut. Jag ville även förbättra min XP bar genom att visa hur mycket XP man får per klick, så jag gjorde så att ett p element med text skapades som svävar uppåt varje gång man klickar. Jag ville även göra så att man faktiskt kan döda slimen, så jag lade till ett health points värde till slimen. När detta värde når noll ska slimen dö genom att flyga iväg, och sedan kommer en ny slime. Både dödsanimationen och animationen när slimen tar skada skapades i CSS. Det absolut sista jag gjorde var att lägga till en typ av slime med mer HP och annan färg. Denna slime har en 10% chans att uppstå, och för att slippa behöva skapa en ny gif lade jag helt enkelt ett filter på den i CSS som gjorde den orange.

## Positiva erfarenheter

Det som gick bra var att lägga till en XP bar. Jag googlade upp hur man gjorde och anpassade baren så att den passar mitt spel. Det gick även bra att ändra själva designen på sidan och ändra font osv. Jag ska upprepa framgångarna genom att fortsätta att söka upp hur man gör saker och experimentera i ett testdokument eller liknande innan jag implementerar det i framtida projekt.

## Negativa erfarenheter

Det som gick mindre bra var att försöka göra avancerade saker såsom att skapa "+XP" texten varje gång man klickar som svävar uppåt. Det var väldigt förvirrande att försöka implementera det i mitt spel, speciellt eftersom att jag ej förstod hur koden fungerade när jag sökte upp exempel på hur man kan göra. Det gick dock bättre efter att ha testat delar av koden i ett testdokument och ändrat/lagt till kod för att få det att funka som jag ville.

## Sammanfattning

Personligen är jag väldigt nöjd över min produkt. Hela projektet har varit väldigt kul, vilket är varför jag har orkat arbeta så mycket med det hemma. Det finns dock fortfarande väldigt många områden som spelet kan utvecklas i, till exempel antalet uppgraderingar. Även om jag är klar med uppgiften vid det här laget kommer jag att fortsätta att utveckla spelet, enbart för att jag tycker att det är kul.