# ZadanieRekrutacja
Mapa została stworzona z ikon kółka, zapewnionej przez "bootstrap". 

Na początku za pomocą stworzonego w pythonie skryptu, wygenerowano plik json z dwu-wymiarową tablicą. Każdy element tablicy miał wartość
0 lub jeden gdzie 1 - zamalowane kółko, a 0 - przejrzyste kółko

Javascript pobiera plik json, a następnie rysuje mapę na ekranie. 
Algorytm rysowania działa następująco:

Jeśli program w pętli napotka jedynkę to wstawia kółeczko o zadanym kolorze na stronę.
Jeśli napotka 0 to rozpoczyna zliczanie. W momencie napotkania jedynki lub końca linii program dodaje na stronę element,
którego szerokość = licznik * szerokość_kółka, a margines = licznik * margines_kółka. Jest to optymalizacja elementów na stronie
pozwalająca na płynne użytkowanie.




Program pobiera z obiektu json firmy razem z danymi i pakuje je w obiekty w klasie 'Company'. W klasie tej znajduje się funkcja zwracająca element
reprezentujący nazwę firmy, razem ze wszystkimi potrzebnymi zdarzeniami.

Funkcja load_companies korzystając z klasy Company, wypełnia listę firm, które możemy klikać w wersji mobilnej lub najeżdżać na nie
w wersji desctop.


Funkcja adjust_screen dla o poprawne wyświatlanie się elementów w zależności od szerokości ekranu oraz resetuje stan naciśnięcia
nazwy firmy ,w momencie z zmiany szerokości ekranu


