## Presentazione dell'applicazione

Si tratta di webapp che permette di creare, gestire e ripetere delle flashcard sfruttando le caratteristiche della "forgetting curve", consolidando le conoscenze di studenti e chiunque voglia apprendere qualcosa di nuovo. Alcuni competitor potrebbero essere "anki" o "mochi", tuttavia voglio che la mia applicazione si differenzi per qualità dell'esperienza utente e funzionalità.

## App requirements

- L'utente può loggarsi con email+password o con il proprio account google
- L'utente può creare dei "deck", delle cartelle che contengono delle "cards". Queste sono l'elemento fondamentale, l'oggetto che interessa maggiormente all'utente e su cui si basa l'esperienza
- Ogni card possiede un titolo, del contenuto, la next due date di ripetizione, last reviewed date, deck di riferimento e risultato della scorsa ripetizione (uno score da 1 a 5)
- Il contenuto delle card prevede testo in markdown, codice con evidenziazione della sintassi
- Nell'interfaccia è presente una sidebar che mostra da struttura dei deck (tipo file-tree) e permette all'utente di navigare tra le pagine dell'applicazione
- Nell'app è presente una pagina "Due Today" che mostra tutte le carte che l'utente dovrebbe ripetere quel giorno e quelle che avrebbe dovuto ripetere in precedenza. Presenta due visualizzazioni: una "focus" che mostra solo una carta per volta e una ad elenco in una tabella
- Nell'app è presente una pagina "Next Due" che mostrare all'interno di una tabella tutte le carte da ripetere prossimamente. La tabella è ordinabile e filtrabile
- Nel footer della sidebar è presente una sezione per visualizzare il profilo dell'utente e gestire le impostazioni aprendo un dialog

## Other infos

- The backend isn't ready yet
- Come router utilizzerò react-router-dom
- ATTENZIONE: anche se scrivo in italiano, nell'applicazione DEVI utilizzare l'inglese per le scritte, i bottoni, i menu, ecc.
- Il pubblico target è composto da studenti, giovani, adulti che desiderano apprendere qualcosa di nuovo e consolidare le conoscenze già acquisite. Vorrei che il linguaggio utilizzato per tutta la app fosse scherzoso
