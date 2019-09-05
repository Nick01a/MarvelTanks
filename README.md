# MarvelTanks
Гра Marvel Tanks -- це модифікована версія класичної гри ***Tank 90***, але в тематиці всесвіту Marvel.??

***Короткий опис***
    Це мультиплеєрна гра, орієнтована на двох гравців (гратимуть з одного комп'ютера). Перед початком гри, кожен з гравців вибирає свого
    героя Marvel з запропонованих і розпочинається гра. Кожен з героїв має свою унікальну ультимативну здібність, і класичний,  
    одинаковий у всіх вистріл. Крім героїв (гравців) по мапі бігають нейтральні істоти, які як і
    герої мають класичний вистріл, але навідміну не мають ультимативної здібності. За вбивство певної кількості нейтральних істот
    герой получатиме ультимативну здібність. Переможець буде той, хто останній з героїв залишиться в живих.
    
    
***Етапи реалізації***
    1. Створення іконок (вигляд) героїв. Створення іконок (вигляд) ігрового поля. За допомогою Photoshop сторити іконки для всіх  
       можливих об'єктів гри. 
    2. Зробити вступне меню й меню вибору персонажів. Перед початком гри, для зацікавлення користувачів під час обирання персонажа варто
       обробити меню.
    3. Створення мапи. На мапі будуть заспаунені головні герої й нейтральні моби, крім того будуть розміщені три види блоків
        a) *Важкий блок* -- цей блок неможливо знищити. Вони на мапі будуть мати константне положення. Їх неможливо буде знищити.
        b) *Легкий блок* -- цей блок буде генеруватися випадково на початку гри. Його можна знищити класичним вистрілом чи в деяких з 
            героїв, ультимативною здібністю.  
        c) *Підлога* -- цей блок це є "підлога" по якій будуть рухатися всі юніти в грі. При знищенні *Легкого блоку* поле стає
           *Підлогою*.
    4. Отримання координат об'єкту. Для того, щоб знати стан об'кту класу в певний період часу потрібно знати його координати, звідки 
       робиться вистріл, куди летить вистріл, чи можна пересуватися на сусідні поля і т.д.
    5. Створення персонажів. Потрібно реалізувати рух по карті й класичну стрільбу кодного з героїв й нейтральних істот. Уся механіка, 
        крім ультимативних здібностей в них буде одинакова (за уваги звісно, що нейтральні істоти переміщаються випадково).
    6. Ультимативні здібності героїв. Кожна з ультимативних здібностей буде унікальною. Отже потрібно буде в Photoshop розробити 
       візуалізацю кожної з них й прописати механіку, яка буде відповідати балансу гри. Вартує протестувати кожну з здібностей на блоках
       й нейтральних істотах. Прописати логіку получення ультимативної здібності при вбивстві мобів. Потрібно поставити лічильник для 
       кожного персонажа з класу *герой*. При використанні ульмативної здібности зануляти лічильник.
    7. Протестувати гру й виправити баги.
    8. При необхідності чи по можливості додати чи розширити функціонал (мапа, здібності...).
    
    
***Ціль до наступоного етапу***
    Реалізувати перші 4 етапи, описані вище й пересуваня персонажа (1 частина 5 етапу).

# Звіт, проміжний етап  
    Крім запланованого (4 етапи й перша частина 5 етапу), виконана механіка класичної стрільби (вниз) для героїв. Виникла проблема, що
    до модального вікна при запуску гри (потрібно знати про ультимативні здібності кожного з персонажів). Після реалізації ультимативних
    здібностей модальне вікно буде цілісним.
    Реалізована вся базова механіка, за виключенням стичок персонажів.
    
***Ціль до фінальної версії проекту***
    6, 7 етапи і пост ігрове вікно(статистика, результати) - дедлайн 1 вересня.
    8 етап - дедлайн 5 вересня.

# Фінальний звіт
    Усі перелічені пункти виконані, багато було нюансів з механікою гри, тому дуже часто доводилося переписувати або модифікувати деякі здібності й властивості задля балансу.
    Опис гри можна подивитися нижче, в секції *Геймплей*

# Геймплей
    !(Переконайтеся, що у вас включена англійська розкладка клавіатури: W, A, S, D)!
    Перед початком гри, учасники вибирають собі персонажів (кліком лівої кнопки миші по іконці героя й кнопкою *START*). Також у стартовому вікні є ознайомлення з керуванням.
    Після ознайомлення й вибору персонажів генерується мапа (у верхній лівій частині спаун першого гравця, у нижній правій -- другого, моби випадковим чином розкиданій по мапі).
    Зліва й права, від мапи знаходяться лічильники вбивст мрбів для кожного з гравців. При досягненні числа 5, протягом чотирьох секунд стає доступна ультимативна здібність для відповідного героя, 
    після чого лічильник зануляється. Ще є один важливий нюанс, кожні 12 секунд йде перевірка на те, чи герой вбив моба, як ні, то автоматичний програш, за неактивність.
    Тому саме моби будуть найважливішим ресурсом в грі, за який обидва персонажа боротимуться, паралельно пробуючи застрелити один одного.
    Постріл летить в залежності від напрямку останнього руху персонажа.
    Ультимативні здібності: 
        1) Spiderman -- ультимативна здібність виглядає як простий вистріл, допоки не зіткнеться з *Важким блоком* (інший гравець не зможе відрізнити її від звичайного вистрілу, до зіткнення). При зіткненні з'являється павутинна сітка. 
            При пострілі в сітку, гравець автоматично програє.
        2) Ironman -- ультимативна здібність дозволяє будувати важкий блок на мапі в напрямку останнього руху персонажа (мілліган: ізолювати суперника, щоб він протягом 12 секунд не зміг вбити моба).
        3) Daredevil -- ультимативна здібність дозволяє стріляти у всіх можливих напрямках (прекрасна для ізоляції й раптового вбивства -- не потребує робити зайвий крок в потрібному напрямку).
        4) Hawkeye -- ультимативна здібність -- це постріл, який може знищувати важкі блоки (дуже хороший проти Ironman, також дозволяє створювати схованки від пострілів на краях карти). 
    Після закінчення гри, створиться вікно з назвою переможця й кнопка *START AGAIN* для початку нової гри.
