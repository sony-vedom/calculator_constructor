# **Описание работы**:

### Калькулятор

_Оператор "+" я буду использовать для примера. Он в данной "документации" абстрактен. Все остальные имеющиеся арифметические операторы работают таким же образом._

1. Калькулятор умеет выполнять свою главную функцию: операции типа а + b = result. Слишком большие дроби он округляет до целого;
2. Если пользователь хочет продолжать работать с result, можно продолжать делать операции, используя клавишу равно, т.е. newA(result) + newB = newResult, дальше newA1(newResult) + newB1 = newResult 1 и т. д.;

> _2.1._ result (или newResult22, например) изменять нельзя, точнее можно, но только через операторы. Дописывать к нему нельзя ничего (поведение взято из Windows-калькулятора);
3. Если пользователь не хочет дальше продолжать работать с result(или newResult22, например), то можно нажать на любую цифровую клавишу, значение result сбросится;
4. Если пользователь получил хотя бы один раз result, потом не нажал "=", а решил дальше использовать операторы, то поведение идентично Windows-калькулятору. Чтобы сбросить результат, нужно в конце любой операции нажать "=", а потом поступить, как в пункте 3;
> _4.1:_ Нажать "=" можно, даже если пользователь нажал последовательно a(result/newResult22), +, newB, + (или любой другой оператор, не идентичный абстрактному +), только в этом случае результат не изменится, он останется равен a(result/newResult22) + newB;

> _4.2_: Кнопок "C" и "СЕ" здесь нет, поэтому при нажатии на "=", операции сбросятся (в Windows после выполнения пункта 4 операции повторяются снова);

Калькулятор, конечно, пока маленький и ему ещё расти и расти до Windows-версии, но он очень старается на нее походить.

### Конструктор

Здесь ничего необычного, но нужно уточнить, что:
- конструктор реализован без библиотек;
- при переносе с Sidebar дисплей всегда будет на первом месте, даже если его переносили не первым. Пользователь это поймет по отображению вектора. По крайней мере, так мной была понята суть макета.


# **Используемые технологии:**

- HTML5 DND API;
- React (только хуки и функциональные компоненты) и весь пакет cra (в т. ч. ESLint);
- Redux, React-Redux, Redux-Thunk;
- Библиотека classnames.
