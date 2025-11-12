import Link from 'next/link';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { TermsContent } from './page-content';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    pl: 'Regulamin - Prawo Jazdy',
    en: 'Terms of Service - Driving License',
    uk: 'Умови використання - Водійські права',
    de: 'Nutzungsbedingungen - Führerschein',
  };

  return {
    title: titles[locale as Locale] || titles.pl,
  };
}

const translations = {
  pl: {
    backToHome: 'Powrót do strony głównej',
    effectiveDate: 'Data wejścia w życie',
    contact: 'Kontakt',
    title: 'Regulamin',
    section1: {
      title: '1. Akceptacja Regulaminu',
      content: 'Uzyskując dostęp lub korzystając z aplikacji i strony internetowej Prawo Jazdy (łącznie „Usługa"), zgadzasz się być związany niniejszym Regulaminem. Usługa jest własnością i jest prowadzona przez Nomadic Studio. Jeśli nie zgadzasz się z niniejszymi warunkami, nie możesz korzystać z Usługi.',
    },
    section2: {
      title: '2. Opis Usługi',
      content1: 'Prawo Jazdy zapewnia kompleksową platformę do nauki pytań z teorii egzaminu na prawo jazdy, w tym:',
      list: [
        'Oficjalne pytania egzaminacyjne ze zdjęciami i filmami',
        'Autorskie wyjaśnienia i treści edukacyjne',
        'Testy praktyczne i symulacje egzaminów',
        'Śledzenie postępów i statystyki',
        'Wsparcie wielu języków (polski, angielski, ukraiński, niemiecki)',
      ],
      content2: 'Usługa jest świadczona wyłącznie do celów edukacyjnych osobistych. Chociaż dążymy do dokładności, zalecamy użytkownikom weryfikację informacji z oficjalnymi źródłami podczas przygotowywania się do rzeczywistych egzaminów na prawo jazdy.',
    },
    section3: {
      title: '3. Własność Intelektualna i Ochrona Praw Autorskich',
      warning: '⚠️ Ważne Powiadomienie o Prawach Autorskich',
      warningText: 'Cała zawartość tej Usługi jest chroniona prawem autorskim i innymi prawami własności intelektualnej.',
      subtitle1: '3.1 Chroniona Zawartość',
      content1: 'Następujące materiały są zastrzeżone i chronione prawem autorskim:',
      protectedList: [
        'Wyjaśnienia pytań - Oryginalne treści edukacyjne stworzone przez Nomadic Studio',
        'Kompilacja bazy danych - Wybór, koordynacja i układ pytań',
        'Tłumaczenia - Wszystkie tłumaczenia i lokalizacje wielojęzyczne',
        'Oprogramowanie i kod - Kod źródłowy aplikacji i algorytmy',
        'Projekt interfejsu użytkownika - Projekt wizualny, układy i grafika',
        'Branding - Znaki towarowe, logo i tożsamość marki',
      ],
      subtitle2: '3.2 Zabronione Działania',
      content2: 'Użytkownikom surowo zabrania się:',
      prohibitedList: [
        'Kopiowania, scrapowania lub wyodrębniania pytań, wyjaśnień lub zawartości bazy danych',
        'Reprodukowania, dystrybuowania lub ponownego publikowania jakiejkolwiek chronionej zawartości',
        'Tworzenia dzieł pochodnych lub kompilacji opartych na naszej zawartości',
        'Używania automatycznych narzędzi (boty, scrapery, crawlery) do dostępu lub pobierania zawartości',
        'Inżynierii wstecznej aplikacji lub struktury bazy danych',
        'Sprzedaży, licencjonowania lub komercyjnej eksploatacji jakiejkolwiek zawartości z Usługi',
        'Usuwania lub ukrywania informacji o prawach autorskich lub atrybucji',
      ],
      subtitle3: '3.3 Dozwolone Użycie',
      content3: 'Możesz korzystać z Usługi tylko do osobistych, niekomercyjnych celów edukacyjnych za pośrednictwem oficjalnych interfejsów aplikacji i strony internetowej. Jakiekolwiek użycie wykraczające poza osobistą naukę wymaga wyraźnej pisemnej zgody Nomadic Studio.',
    },
    section4: {
      title: '4. Zachowanie Użytkownika i Akceptowalne Użycie',
      content: 'Użytkownicy zgadzają się:',
      list: [
        'Korzystać z Usługi tylko w celach zgodnych z prawem i zgodnie z niniejszym Regulaminem',
        'Nie próbować uzyskać nieautoryzowanego dostępu do jakichkolwiek systemów lub sieci',
        'Nie zakłócać ani nie przerywać Usługi lub serwerów',
        'Przestrzegać wszystkich obowiązujących przepisów lokalnych, krajowych i międzynarodowych',
        'Szanować prawa własności intelektualnej Nomadic Studio i stron trzecich',
      ],
    },
    section5: {
      title: '5. Funkcje Premium i Zakupy w Aplikacji',
      content: 'Usługa oferuje zarówno funkcje bezpłatne, jak i premium:',
      list: [
        'Darmowi użytkownicy mogą zdobywać kredyty, oglądając reklamy',
        'Subskrypcje premium zapewniają nieograniczony dostęp do wszystkich funkcji',
        'Wszystkie zakupy są przetwarzane przez oficjalne sklepy aplikacji (Google Play, Apple App Store)',
        'Zwroty podlegają zasadom sklepów aplikacji',
      ],
    },
    section6: {
      title: '6. Dane Użytkownika i Prywatność',
      content: 'Twoje korzystanie z Usługi podlega również naszej',
      privacyLink: 'Polityce Prywatności',
      content2: '. Zbieramy anonimowe dane analityczne i korzystamy z usług stron trzecich do celów reklamowych. Postępy użytkownika, zakładki i odpowiedzi są przechowywane lokalnie na Twoim urządzeniu.',
    },
    section7: {
      title: '7. Wyłączenie Gwarancji',
      content1: 'USŁUGA JEST ŚWIADCZONA „TAK JAK JEST" I „W MIARĘ DOSTĘPNOŚCI" BEZ JAKICHKOLWIEK GWARANCJI.',
      content2: 'Nie gwarantujemy, że Usługa będzie wolna od błędów, nieprzerwana, bezpieczna lub wolna od wirusów. Chociaż dążymy do dokładności, nie udzielamy gwarancji dotyczących kompletności lub dokładności treści. Użytkownicy powinni zweryfikować wszystkie informacje z oficjalnymi źródłami rządowymi przed przystąpieniem do rzeczywistych egzaminów na prawo jazdy.',
    },
    section8: {
      title: '8. Ograniczenie Odpowiedzialności',
      content: 'W MAKSYMALNYM ZAKRESIE DOZWOLONYM PRZEZ PRAWO, NOMADIC STUDIO NIE PONOSI ODPOWIEDZIALNOŚCI ZA JAKIEKOLWIEK POŚREDNIE, PRZYPADKOWE, SPECJALNE, WYNIKOWE LUB KARNE SZKODY, W TYM MIĘDZY INNYMI UTRATĘ ZYSKÓW, DANYCH, UŻYTKOWANIA LUB DOBREJ WOLI, WYNIKAJĄCE Z KORZYSTANIA Z USŁUGI.',
    },
    section9: {
      title: '9. Naruszenie Praw Autorskich i Egzekwowanie',
      content1: 'Poważnie traktujemy ochronę własności intelektualnej. Naruszenia praw autorskich lub niniejszego Regulaminu mogą skutkować:',
      list: [
        'Natychmiastowym zakończeniem dostępu do Usługi',
        'Działaniami prawnymi zmierzającymi do odszkodowania i nakazu sądowego',
        'Zgłoszeniem odpowiednim władzom i sklepom aplikacji',
      ],
      content2: 'Jeśli uważasz, że Twoja praca została skopiowana w sposób stanowiący naruszenie praw autorskich, skontaktuj się z nami natychmiast pod adresem',
    },
    section10: {
      title: '10. Modyfikacje Usługi i Regulaminu',
      content: 'Zastrzegamy sobie prawo do modyfikowania, zawieszania lub zaprzestania Usługi (lub jej części) w dowolnym momencie. Możemy również okresowo aktualizować niniejszy Regulamin. Dalsze korzystanie z Usługi po zmianach stanowi akceptację zmodyfikowanego Regulaminu.',
    },
    section11: {
      title: '11. Prawo Właściwe i Jurysdykcja',
      content: 'Niniejszy Regulamin podlega prawu polskiemu. Wszelkie spory wynikające z niniejszego Regulaminu lub korzystania z Usługi podlegają wyłącznej jurysdykcji sądów polskich.',
    },
    section12: {
      title: '12. Rozdzielność',
      content: 'Jeśli jakiekolwiek postanowienie niniejszego Regulaminu zostanie uznane za niewykonalne lub nieważne, pozostałe postanowienia pozostają w pełnej mocy.',
    },
    section13: {
      title: '13. Cała Umowa',
      content: 'Niniejszy Regulamin wraz z naszą Polityką Prywatności stanowią całą umowę między Tobą a Nomadic Studio dotyczącą Usługi i zastępują wszystkie wcześniejsze umowy i porozumienia.',
    },
    section14: {
      title: '14. Informacje Kontaktowe',
      content: 'W przypadku pytań dotyczących niniejszego Regulaminu lub zgłaszania naruszenia praw autorskich, skontaktuj się z:',
      companyName: 'Nomadic Studio',
      email: 'Email',
    },
    copyright: '© 2024 Nomadic Studio. Wszelkie prawa zastrzeżone. Prawo Jazdy™ oraz cała powiązana zawartość, wyjaśnienia i bazy danych są chronione prawem autorskim i innymi prawami własności intelektualnej.',
  },
  en: {
    backToHome: 'Back to home',
    effectiveDate: 'Effective Date',
    contact: 'Contact',
    title: 'Terms of Service',
    section1: {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using the Prawo Jazdy application and website (collectively, "the Service"), you agree to be bound by these Terms of Service. The Service is owned and operated by Nomadic Studio. If you do not agree to these terms, you must not use the Service.',
    },
    section2: {
      title: '2. Description of Service',
      content1: 'Prawo Jazdy provides a comprehensive platform for studying Polish driving license theory test questions, including:',
      list: [
        'Official exam questions with images and videos',
        'Proprietary explanations and educational content',
        'Practice tests and exam simulations',
        'Progress tracking and statistics',
        'Multi-language support (Polish, English, Ukrainian, German)',
      ],
      content2: 'The Service is provided for personal educational use only. While we strive for accuracy, we recommend users verify information with official sources when preparing for actual driving examinations.',
    },
    section3: {
      title: '3. Intellectual Property and Copyright Protection',
      warning: '⚠️ Important Copyright Notice',
      warningText: 'All content in this Service is protected by copyright and other intellectual property laws.',
      subtitle1: '3.1 Protected Content',
      content1: 'The following materials are proprietary and protected by copyright:',
      protectedList: [
        'Question explanations - Original educational content created by Nomadic Studio',
        'Database compilation - The selection, coordination, and arrangement of questions',
        'Translations - All multi-language translations and localizations',
        'Software and code - The application source code and algorithms',
        'User interface design - Visual design, layouts, and graphics',
        'Branding - Trademarks, logos, and brand identity',
      ],
      subtitle2: '3.2 Prohibited Activities',
      content2: 'Users are strictly prohibited from:',
      prohibitedList: [
        'Copying, scraping, or extracting questions, explanations, or database content',
        'Reproducing, distributing, or republishing any protected content',
        'Creating derivative works or compilations based on our content',
        'Using automated tools (bots, scrapers, crawlers) to access or download content',
        'Reverse engineering the application or database structure',
        'Selling, licensing, or commercially exploiting any content from the Service',
        'Removing or obscuring copyright notices or attribution',
      ],
      subtitle3: '3.3 Permitted Use',
      content3: 'You may only use the Service for personal, non-commercial study purposes through the official application and website interfaces. Any use beyond personal study requires explicit written permission from Nomadic Studio.',
    },
    section4: {
      title: '4. User Conduct and Acceptable Use',
      content: 'Users agree to:',
      list: [
        'Use the Service only for lawful purposes and in accordance with these Terms',
        'Not attempt to gain unauthorized access to any systems or networks',
        'Not interfere with or disrupt the Service or servers',
        'Comply with all applicable local, national, and international laws',
        'Respect the intellectual property rights of Nomadic Studio and third parties',
      ],
    },
    section5: {
      title: '5. Premium Features and In-App Purchases',
      content: 'The Service offers both free and premium features:',
      list: [
        'Free users can earn credits by watching advertisements',
        'Premium subscriptions provide unlimited access to all features',
        'All purchases are processed through official app stores (Google Play, Apple App Store)',
        'Refunds are subject to app store policies',
      ],
    },
    section6: {
      title: '6. User Data and Privacy',
      content: 'Your use of the Service is also governed by our',
      privacyLink: 'Privacy Policy',
      content2: '. We collect anonymous analytics data and use third-party services for advertising. User progress, bookmarks, and answers are stored locally on your device.',
    },
    section7: {
      title: '7. Disclaimer of Warranties',
      content1: 'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.',
      content2: 'We do not guarantee that the Service will be error-free, uninterrupted, secure, or virus-free. While we strive for accuracy, we make no warranties about the completeness or accuracy of content. Users should verify all information with official government sources before taking actual driving examinations.',
    },
    section8: {
      title: '8. Limitation of Liability',
      content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOMADIC STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.',
    },
    section9: {
      title: '9. Copyright Infringement and Enforcement',
      content1: 'We take intellectual property protection seriously. Violations of copyright or these Terms may result in:',
      list: [
        'Immediate termination of access to the Service',
        'Legal action seeking damages and injunctive relief',
        'Reporting to relevant authorities and app stores',
      ],
      content2: 'If you believe your work has been copied in a way that constitutes copyright infringement, please contact us immediately at',
    },
    section10: {
      title: '10. Modifications to Service and Terms',
      content: 'We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time. We may also update these Terms periodically. Continued use of the Service after changes constitutes acceptance of the modified Terms.',
    },
    section11: {
      title: '11. Governing Law and Jurisdiction',
      content: 'These Terms are governed by the laws of Poland. Any disputes arising from these Terms or use of the Service shall be subject to the exclusive jurisdiction of the courts of Poland.',
    },
    section12: {
      title: '12. Severability',
      content: 'If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.',
    },
    section13: {
      title: '13. Entire Agreement',
      content: 'These Terms, together with our Privacy Policy, constitute the entire agreement between you and Nomadic Studio regarding the Service and supersede all prior agreements and understandings.',
    },
    section14: {
      title: '14. Contact Information',
      content: 'For questions about these Terms or to report copyright infringement, please contact:',
      companyName: 'Nomadic Studio',
      email: 'Email',
    },
    copyright: '© 2024 Nomadic Studio. All rights reserved. Prawo Jazdy™ and all associated content, explanations, and databases are protected by copyright and other intellectual property laws.',
  },
  uk: {
    backToHome: 'Повернутися на головну',
    effectiveDate: 'Дата набуття чинності',
    contact: 'Контакт',
    title: 'Умови використання',
    section1: {
      title: '1. Прийняття Умов',
      content: 'Отримуючи доступ або використовуючи додаток і веб-сайт Prawo Jazdy (спільно "Сервіс"), ви погоджуєтеся дотримуватися цих Умов використання. Сервіс належить і керується Nomadic Studio. Якщо ви не погоджуєтеся з цими умовами, ви не повинні використовувати Сервіс.',
    },
    section2: {
      title: '2. Опис Сервісу',
      content1: 'Prawo Jazdy надає комплексну платформу для вивчення питань теорії водійських прав, включаючи:',
      list: [
        'Офіційні екзаменаційні питання із зображеннями та відео',
        'Власні пояснення та навчальний контент',
        'Практичні тести та симуляції екзаменів',
        'Відстеження прогресу та статистика',
        'Підтримка кількох мов (польська, англійська, українська, німецька)',
      ],
      content2: 'Сервіс надається виключно для особистого навчального використання. Хоча ми прагнемо до точності, ми рекомендуємо користувачам перевіряти інформацію з офіційними джерелами при підготовці до справжніх екзаменів на водійські права.',
    },
    section3: {
      title: '3. Інтелектуальна Власність та Захист Авторських Прав',
      warning: '⚠️ Важливе Повідомлення про Авторські Права',
      warningText: 'Весь контент у цьому Сервісі захищений авторським правом та іншими законами про інтелектуальну власність.',
      subtitle1: '3.1 Захищений Контент',
      content1: 'Наступні матеріали є власністю та захищені авторським правом:',
      protectedList: [
        'Пояснення питань - Оригінальний навчальний контент, створений Nomadic Studio',
        'Компіляція бази даних - Вибір, координація та розташування питань',
        'Переклади - Всі багатомовні переклади та локалізації',
        'Програмне забезпечення та код - Вихідний код додатка та алгоритми',
        'Дизайн інтерфейсу користувача - Візуальний дизайн, макети та графіка',
        'Брендинг - Торгові марки, логотипи та ідентичність бренду',
      ],
      subtitle2: '3.2 Заборонені Дії',
      content2: 'Користувачам суворо заборонено:',
      prohibitedList: [
        'Копіювати, скрапити або видобувати питання, пояснення або вміст бази даних',
        'Відтворювати, поширювати або повторно публікувати будь-який захищений контент',
        'Створювати похідні роботи або компіляції на основі нашого контенту',
        'Використовувати автоматизовані інструменти (боти, скрапери, краулери) для доступу або завантаження контенту',
        'Зворотну інженерію додатка або структури бази даних',
        'Продавати, ліцензувати або комерційно експлуатувати будь-який контент із Сервісу',
        'Видаляти або приховувати повідомлення про авторські права або атрибуцію',
      ],
      subtitle3: '3.3 Дозволене Використання',
      content3: 'Ви можете використовувати Сервіс лише для особистих, некомерційних навчальних цілей через офіційні інтерфейси додатка та веб-сайту. Будь-яке використання понад особисте навчання вимагає явного письмового дозволу від Nomadic Studio.',
    },
    section4: {
      title: '4. Поведінка Користувача та Прийнятне Використання',
      content: 'Користувачі погоджуються:',
      list: [
        'Використовувати Сервіс лише для законних цілей та відповідно до цих Умов',
        'Не намагатися отримати несанкціонований доступ до будь-яких систем або мереж',
        'Не втручатися або не порушувати роботу Сервісу або серверів',
        'Дотримуватися всіх застосовних місцевих, національних та міжнародних законів',
        'Поважати права інтелектуальної власності Nomadic Studio та третіх сторін',
      ],
    },
    section5: {
      title: '5. Преміум Функції та Покупки в Додатку',
      content: 'Сервіс пропонує як безкоштовні, так і преміум функції:',
      list: [
        'Безкоштовні користувачі можуть заробляти кредити, переглядаючи рекламу',
        'Преміум підписки забезпечують необмежений доступ до всіх функцій',
        'Всі покупки обробляються через офіційні магазини додатків (Google Play, Apple App Store)',
        'Повернення коштів підпадають під політику магазинів додатків',
      ],
    },
    section6: {
      title: '6. Дані Користувача та Конфіденційність',
      content: 'Ваше використання Сервісу також регулюється нашою',
      privacyLink: 'Політикою Конфіденційності',
      content2: '. Ми збираємо анонімні аналітичні дані та використовуємо сторонні сервіси для реклами. Прогрес користувача, закладки та відповіді зберігаються локально на вашому пристрої.',
    },
    section7: {
      title: '7. Відмова від Гарантій',
      content1: 'СЕРВІС НАДАЄТЬСЯ "ЯК Є" ТА "ЯК ДОСТУПНИЙ" БЕЗ БУДЬ-ЯКИХ ГАРАНТІЙ.',
      content2: 'Ми не гарантуємо, що Сервіс буде безпомилковим, безперервним, безпечним або вільним від вірусів. Хоча ми прагнемо до точності, ми не даємо гарантій щодо повноти або точності контенту. Користувачі повинні перевіряти всю інформацію з офіційними державними джерелами перед складанням справжніх екзаменів на водійські права.',
    },
    section8: {
      title: '8. Обмеження Відповідальності',
      content: 'В МАКСИМАЛЬНІЙ МІРІ, ДОЗВОЛЕНІЙ ЗАКОНОМ, NOMADIC STUDIO НЕ НЕСЕ ВІДПОВІДАЛЬНОСТІ ЗА БУДЬ-ЯКІ НЕПРЯМІ, ВИПАДКОВІ, СПЕЦІАЛЬНІ, НАСЛІДКОВІ АБО КАРАЛЬНІ ЗБИТКИ, ВКЛЮЧАЮЧИ, АЛЕ НЕ ОБМЕЖУЮЧИСЬ ВТРАТОЮ ПРИБУТКУ, ДАНИХ, ВИКОРИСТАННЯ АБО ДОБРОЇ ВОЛІ, ЩО ВИНИКАЮТЬ З ВАШОГО ВИКОРИСТАННЯ СЕРВІСУ.',
    },
    section9: {
      title: '9. Порушення Авторських Прав та Виконання',
      content1: 'Ми серйозно ставимося до захисту інтелектуальної власності. Порушення авторських прав або цих Умов можуть призвести до:',
      list: [
        'Негайного припинення доступу до Сервісу',
        'Судових дій з метою відшкодування збитків та судової заборони',
        'Повідомлення відповідних органів та магазинів додатків',
      ],
      content2: 'Якщо ви вважаєте, що ваша робота була скопійована способом, що становить порушення авторських прав, будь ласка, негайно зв\'яжіться з нами за адресою',
    },
    section10: {
      title: '10. Зміни Сервісу та Умов',
      content: 'Ми залишаємо за собою право змінювати, призупиняти або припиняти Сервіс (або будь-яку його частину) в будь-який час. Ми також можемо періодично оновлювати ці Умови. Подальше використання Сервісу після змін означає прийняття змінених Умов.',
    },
    section11: {
      title: '11. Застосовне Право та Юрисдикція',
      content: 'Ці Умови регулюються законами Польщі. Будь-які спори, що виникають з цих Умов або використання Сервісу, підпадають під виключну юрисдикцію судів Польщі.',
    },
    section12: {
      title: '12. Роздільність',
      content: 'Якщо будь-яке положення цих Умов буде визнано невиконуваним або недійсним, решта положень залишаються в повній силі.',
    },
    section13: {
      title: '13. Повна Угода',
      content: 'Ці Умови разом з нашою Політикою Конфіденційності становлять повну угоду між вами та Nomadic Studio щодо Сервісу та замінюють всі попередні угоди та домовленості.',
    },
    section14: {
      title: '14. Контактна Інформація',
      content: 'З питань про ці Умови або для повідомлення про порушення авторських прав, будь ласка, зв\'яжіться з:',
      companyName: 'Nomadic Studio',
      email: 'Email',
    },
    copyright: '© 2024 Nomadic Studio. Всі права захищені. Prawo Jazdy™ та весь пов\'язаний контент, пояснення та бази даних захищені авторським правом та іншими законами про інтелектуальну власність.',
  },
  de: {
    backToHome: 'Zurück zur Startseite',
    effectiveDate: 'Gültigkeitsdatum',
    contact: 'Kontakt',
    title: 'Nutzungsbedingungen',
    section1: {
      title: '1. Annahme der Bedingungen',
      content: 'Durch den Zugriff oder die Nutzung der Prawo Jazdy-Anwendung und -Website (zusammen "der Dienst") erklären Sie sich damit einverstanden, an diese Nutzungsbedingungen gebunden zu sein. Der Dienst ist Eigentum von und wird betrieben von Nomadic Studio. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, dürfen Sie den Dienst nicht nutzen.',
    },
    section2: {
      title: '2. Beschreibung des Dienstes',
      content1: 'Prawo Jazdy bietet eine umfassende Plattform zum Lernen von Theoriefragen für die polnische Führerscheinprüfung, einschließlich:',
      list: [
        'Offizielle Prüfungsfragen mit Bildern und Videos',
        'Proprietäre Erklärungen und Bildungsinhalte',
        'Übungstests und Prüfungssimulationen',
        'Fortschrittsverfolgung und Statistiken',
        'Mehrsprachige Unterstützung (Polnisch, Englisch, Ukrainisch, Deutsch)',
      ],
      content2: 'Der Dienst wird ausschließlich für persönliche Bildungszwecke bereitgestellt. Obwohl wir uns um Genauigkeit bemühen, empfehlen wir Benutzern, Informationen bei offiziellen Quellen zu überprüfen, wenn sie sich auf tatsächliche Fahrprüfungen vorbereiten.',
    },
    section3: {
      title: '3. Geistiges Eigentum und Urheberrechtsschutz',
      warning: '⚠️ Wichtiger Urheberrechtshinweis',
      warningText: 'Alle Inhalte in diesem Dienst sind durch Urheberrecht und andere Gesetze zum Schutz geistigen Eigentums geschützt.',
      subtitle1: '3.1 Geschützter Inhalt',
      content1: 'Die folgenden Materialien sind proprietär und urheberrechtlich geschützt:',
      protectedList: [
        'Fragenerklärungen - Originaler Bildungsinhalt von Nomadic Studio erstellt',
        'Datenbankkompilation - Die Auswahl, Koordination und Anordnung von Fragen',
        'Übersetzungen - Alle mehrsprachigen Übersetzungen und Lokalisierungen',
        'Software und Code - Der Quellcode der Anwendung und Algorithmen',
        'Benutzeroberflächen-Design - Visuelles Design, Layouts und Grafiken',
        'Branding - Marken, Logos und Markenidentität',
      ],
      subtitle2: '3.2 Verbotene Aktivitäten',
      content2: 'Benutzern ist es strengstens untersagt:',
      prohibitedList: [
        'Kopieren, Scrapen oder Extrahieren von Fragen, Erklärungen oder Datenbankinhalten',
        'Reproduzieren, Verteilen oder erneutes Veröffentlichen geschützter Inhalte',
        'Erstellen abgeleiteter Werke oder Zusammenstellungen basierend auf unseren Inhalten',
        'Verwenden automatisierter Tools (Bots, Scraper, Crawler) zum Zugriff oder Download von Inhalten',
        'Reverse Engineering der Anwendung oder Datenbankstruktur',
        'Verkaufen, Lizenzieren oder kommerzielle Nutzung von Inhalten aus dem Dienst',
        'Entfernen oder Verschleiern von Urheberrechtshinweisen oder Zuordnungen',
      ],
      subtitle3: '3.3 Zulässige Nutzung',
      content3: 'Sie dürfen den Dienst nur für persönliche, nicht-kommerzielle Studienzwecke über die offiziellen Anwendungs- und Website-Schnittstellen nutzen. Jede Nutzung über das persönliche Studium hinaus erfordert eine ausdrückliche schriftliche Genehmigung von Nomadic Studio.',
    },
    section4: {
      title: '4. Benutzerverhalten und Akzeptable Nutzung',
      content: 'Benutzer stimmen zu:',
      list: [
        'Den Dienst nur für rechtmäßige Zwecke und in Übereinstimmung mit diesen Bedingungen zu nutzen',
        'Nicht zu versuchen, unbefugten Zugang zu Systemen oder Netzwerken zu erlangen',
        'Den Dienst oder Server nicht zu stören oder zu unterbrechen',
        'Alle anwendbaren lokalen, nationalen und internationalen Gesetze einzuhalten',
        'Die geistigen Eigentumsrechte von Nomadic Studio und Dritten zu respektieren',
      ],
    },
    section5: {
      title: '5. Premium-Funktionen und In-App-Käufe',
      content: 'Der Dienst bietet sowohl kostenlose als auch Premium-Funktionen:',
      list: [
        'Kostenlose Benutzer können Guthaben durch Ansehen von Werbung verdienen',
        'Premium-Abonnements bieten unbegrenzten Zugriff auf alle Funktionen',
        'Alle Käufe werden über offizielle App-Stores abgewickelt (Google Play, Apple App Store)',
        'Rückerstattungen unterliegen den Richtlinien der App-Stores',
      ],
    },
    section6: {
      title: '6. Benutzerdaten und Datenschutz',
      content: 'Ihre Nutzung des Dienstes unterliegt auch unserer',
      privacyLink: 'Datenschutzrichtlinie',
      content2: '. Wir sammeln anonyme Analysedaten und verwenden Drittanbieterdienste für Werbung. Benutzerfortschritt, Lesezeichen und Antworten werden lokal auf Ihrem Gerät gespeichert.',
    },
    section7: {
      title: '7. Haftungsausschluss',
      content1: 'DER DIENST WIRD "WIE BESEHEN" UND "WIE VERFÜGBAR" OHNE JEGLICHE GARANTIEN BEREITGESTELLT.',
      content2: 'Wir garantieren nicht, dass der Dienst fehlerfrei, ununterbrochen, sicher oder virenfrei sein wird. Obwohl wir uns um Genauigkeit bemühen, geben wir keine Garantien hinsichtlich der Vollständigkeit oder Richtigkeit des Inhalts ab. Benutzer sollten alle Informationen mit offiziellen Regierungsquellen überprüfen, bevor sie tatsächliche Fahrprüfungen ablegen.',
    },
    section8: {
      title: '8. Haftungsbeschränkung',
      content: 'IM MAXIMAL GESETZLICH ZULÄSSIGEN UMFANG HAFTET NOMADIC STUDIO NICHT FÜR INDIREKTE, ZUFÄLLIGE, BESONDERE, FOLGE- ODER STRAFSCHÄDEN, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF VERLUST VON GEWINNEN, DATEN, NUTZUNG ODER GOODWILL, DIE SICH AUS IHRER NUTZUNG DES DIENSTES ERGEBEN.',
    },
    section9: {
      title: '9. Urheberrechtsverletzung und Durchsetzung',
      content1: 'Wir nehmen den Schutz geistigen Eigentums ernst. Verstöße gegen Urheberrechte oder diese Bedingungen können zur Folge haben:',
      list: [
        'Sofortige Beendigung des Zugangs zum Dienst',
        'Rechtliche Schritte zur Schadensersatz und einstweiligen Verfügung',
        'Meldung an zuständige Behörden und App-Stores',
      ],
      content2: 'Wenn Sie glauben, dass Ihre Arbeit in einer Weise kopiert wurde, die eine Urheberrechtsverletzung darstellt, kontaktieren Sie uns bitte umgehend unter',
    },
    section10: {
      title: '10. Änderungen am Dienst und den Bedingungen',
      content: 'Wir behalten uns das Recht vor, den Dienst (oder Teile davon) jederzeit zu ändern, auszusetzen oder einzustellen. Wir können diese Bedingungen auch regelmäßig aktualisieren. Die fortgesetzte Nutzung des Dienstes nach Änderungen gilt als Annahme der geänderten Bedingungen.',
    },
    section11: {
      title: '11. Anwendbares Recht und Gerichtsstand',
      content: 'Diese Bedingungen unterliegen den Gesetzen Polens. Alle Streitigkeiten, die sich aus diesen Bedingungen oder der Nutzung des Dienstes ergeben, unterliegen der ausschließlichen Gerichtsbarkeit der polnischen Gerichte.',
    },
    section12: {
      title: '12. Salvatorische Klausel',
      content: 'Sollte eine Bestimmung dieser Bedingungen für nicht durchsetzbar oder ungültig befunden werden, bleiben die übrigen Bestimmungen in vollem Umfang in Kraft.',
    },
    section13: {
      title: '13. Gesamtvereinbarung',
      content: 'Diese Bedingungen stellen zusammen mit unserer Datenschutzrichtlinie die vollständige Vereinbarung zwischen Ihnen und Nomadic Studio bezüglich des Dienstes dar und ersetzen alle vorherigen Vereinbarungen und Verständigungen.',
    },
    section14: {
      title: '14. Kontaktinformationen',
      content: 'Bei Fragen zu diesen Bedingungen oder zur Meldung von Urheberrechtsverletzungen kontaktieren Sie bitte:',
      companyName: 'Nomadic Studio',
      email: 'E-Mail',
    },
    copyright: '© 2024 Nomadic Studio. Alle Rechte vorbehalten. Prawo Jazdy™ und alle zugehörigen Inhalte, Erklärungen und Datenbanken sind durch Urheberrecht und andere Gesetze zum Schutz geistigen Eigentums geschützt.',
  },
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations.pl;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/${locale}`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 inline-block"
          >
            ← {t.backToHome}
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="w-7 h-7 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {t.title}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t.effectiveDate}: December 12, 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
          <TermsContent locale={locale as Locale} translations={t} />
        </div>
      </div>
    </div>
  );
}
