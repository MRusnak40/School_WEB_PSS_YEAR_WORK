# Dokumentace k maturitnímu projektu: Healthier (GymProject)

**Autor:** Matyáš Rusňák  
**Obor:** Informační technologie  
**Školní rok:** 2025/2026  
**Technologie:** Python (Django), SQLite, HTML/CSS/JS  

---

## 1. Anotace
Tato práce se zabývá návrhem a realizací webové aplikace **Healthier**, která slouží jako osobní coach pro sledování fyzického progresu a podporu zdraví. Aplikace umožňuje uživatelům sledování denních aktivit, plnění třicetidenních výzev a vzdělávání se v oblasti zdravého životního stylu. Hlavním cílem je motivace uživatele skrze systém "Flames" a poskytnutí přehledného prostředí bez rušivých reklam.

---

## 2. Úvod
V současné době čelí mladí lidé rostoucímu tlaku na výkon, což často vede k pocitům vyhoření, demotivace nebo dokonce k depresivním stavům. Právě osobní zkušenost s těmito stavy byla hlavním impulsem pro vznik projektu **Healthier**. Aplikace není koncipována pouze jako další fitness tracker v řadě, ale jako nástroj pro vybudování disciplíny a denní rutiny, která pomáhá uživatelům najít smysl v každodenním pohybu a péči o sebe sama.

Hlavní myšlenkou projektu je, že život by neměl být brán příliš vážně a že i malé krůčky vedou k velkým změnám. Motto aplikace **"SO GO AND LIVE"** odráží filozofii, že nejdůležitější je začít a uvědomit si, že v tom člověk není sám. Mnoho existujících fitness aplikací je pro začátečníka demotivujících kvůli své komplexnosti nebo neustálému tlaku na perfektní výsledky. Healthier naopak sází na jednoduchost a pozitivní posilování.

Uživatelé se po přihlášení setkávají s přehledným prostředím, které je edukuje o stravování a potřebách těla v sekci "Be Healthier". Systém denních přihlášení odměňuje uživatele "Ohníčky" (Flames), což vytváří zdravý návyk pravidelnosti. Třicetidenní výzvy (Challenges) pak slouží jako milníky, které uživatele provází jejich cestou za lepším já. Celý projekt je postaven na víře, že fyzická aktivita je jedním z nejlepších léků na špatné psychické stavy, a aplikace má být tím prvním, co uživatel ráno otevře, aby získal motivaci pro svůj den.

---

## 3. Ekonomická rozvaha

### Popis konkurence
Na trhu existuje nepřeberné množství aplikací (např. MyFitnessPal, Jefit), které však často trpí následujícími neduhy:
* **Přeplácanost:** Příliš mnoho textu a složitých grafů, které uživatele spíše děsí.
* **Agresivní monetizace:** Neustálé zobrazování reklam nebo zamykání základních funkcí za předplatné.
* **Vizuální chaos:** Hravost na úkor přehlednosti.

### Konkurenční výhoda
Healthier se odlišuje absolutním minimalismem a zaměřením na začátečníky. Absence reklam zajišťují, že se uživatel soustředí pouze na svůj pokrok. Unikátní je také propojení fyzického cvičení s edukací o duševním zdraví.

### Propagace a návratnost investic
* **Propagace:** Cílená kampaň na sociálních sítích (TikTok, Instagram Reels) zaměřená na komunitu lidí zajímajících se o self-improvement a mental health.
* **Návratnost:** Vzhledem k nulovým nákladům na software (open-source technologie) a využití školního VPS je projekt udržitelný s minimálními náklady. Návratnost investovaného času se projevuje v budování loajální uživatelské základny, kterou lze v budoucnu monetizovat skrze prémiové vzdělávací kurzy.

---

## 4. Vývoj

### Použité technologie
* **Backend:** Framework **Django (Python)** zajišťuje robustní logiku a bezpečnost.
* **Databáze:** **SQLite** pro ukládání dat o uživatelích a jejich cílech.
* **Frontend:** **CSS** pro unikátní vizuální identitu a **JavaScript** pro interaktivní výpočty

### Členění programu
Projekt je strukturován do logických celků:
* `GymApp/`: Obsahuje modely, view a logiku aplikace.
* `templates/dj/`: HTML šablony (např. `login.html`, `register.html`).
* `static/`: Kaskádové styly (`login.css`, `styles.css`) a JavaScriptové soubory.

Vývoj probíhal metodou agilního programování s pravidelným verzováním na GitHubu. Dokumentace je obsažena přímo v kódu formou docstringů a komentářů u složitějších databázových operací.

---

## 5. Testování
Testování proběhlo s účastí 5 testerů. Připomínky byly evidovány jako "Issues" na GitHubu.

1. **Scénář: Registrace a Login:** Ověření funkčnosti Django autentizace a správy session. *(Výsledek: OK)*
2. **Scénář: Přidání osobního cíle:** Testování zápisu do databáze a následné zobrazení v dashboardu. *(Výsledek: OK)*
3. **Scénář: Přičítání Flames:** Ověření, že systém správně detekuje denní přihlášení. *(Výsledek: OK)*
4. **Scénář: Responzivita:** Testování zobrazení na různých rozlišeních (mobil vs PC). *(Výsledek: OK, úprava stylů pro mobilní zobrazení)*
5. **Scénář: Nasazení na server:** Úspěšný deployment na školní VPS a konfigurace statických souborů. *(Výsledek: OK)*

---

## 6. Nasazení a spuštění
Pro zopakování projektu je potřeba mít nainstalovaný **Python 3.x**.

1. Stáhněte zdrojový kód z repozitáře.
2. Vytvořte virtuální prostředí:  
   `python -m venv venv`
3. Aktivujte prostředí a nainstalujte Django:  
   `pip install django`
4. Proveďte migrace databáze:  
   `python manage.py migrate`
5. Spusťte vývojový server:  
   `python manage.py runserver`

---

## 7. Licence
Tento projekt je šířen pod licencí **MIT**. Uživatelé mohou kód volně šířit a upravovat při zachování odkazu na původního autora.

---

## 8. Odkaz na GIT
Celý projekt včetně historie vývoje naleznete na:  
https://github.com/MRusnak40/School_WEB_PSS_YEAR_WORK

---

## 9. Závěr
Projekt **Healthier** úspěšně splnil všechny stanovené cíle. Podařilo se vytvořit funkční, bezpečnou a vizuálně čistou aplikaci, která řeší reálný problém motivace k pohybu. Práce na projektu mi přinesla cenné zkušenosti s frameworkem Django a řešením technických výzev spojených s deploymentem webových aplikací. V budoucnu plánuji rozšíření o komunitní chat, který by dále posílil pocit sounáležitosti mezi uživateli.