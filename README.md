# Alba-rosa.cz | Purpix

## Popis

Vítejte v přihlašovacím systému Alba-rosa.cz pro hru Purpix. Tento skript zajišťuje ověření uživatelů a jejich přesměrování na hlavní stránku hry po úspěšném přihlášení.

## Konfigurace

Před použitím skriptu ujistěte se, že jste provedli konfiguraci připojení k databázi v souboru `./assets/php/config.php`. To zahrnuje nastavení databázového serveru, uživatelského jména, hesla a názvu databáze.

## Přihlášení

Pokud uživatel již není přihlášen (session neobsahuje `user_id`), skript zobrazí přihlašovací formulář. Po odeslání formuláře proběhne ověření uživatelských údajů v databázi.

## Omezení

Skript obsahuje ochranná opatření proti některým nežádoucím akcím, jako jsou kontextové menu nebo klávesové zkratky pro vývojářské nástroje.

## Autoři

Tuto hru vytvořili:

- Matěj Kořalka
- Matěj Beránek
- Jiří Boucník
