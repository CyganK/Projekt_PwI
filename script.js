// zmienna reprezentująca planszę
const plansza = Array(9).fill(null);

// zmienne przechowujące tryb gry i aktualnego gracza
let tryb = 'jeden';
let aktualny_gracz = 'X';

// funkcja rysująca planszę na stronie
function Tablica() {
  const komórka = document.querySelectorAll('.komórka');
  plansza.forEach((value, index) => {
    komórka[index].textContent = value;
  });
}

// funkcja sprawdzająca, czy dany gracz wygrał
function czy_wygana(player) {
  const wygrane = [
    // poziomo
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // pionowo
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // na skos
    [0, 4, 8],
    [2, 4, 6]
  ];
  return wygrane.some(combo => {
    return combo.every(index => plansza[index] === player);
  });
}

// funkcja obsługująca kliknięcie na pole planszy
function kliknięcie(event) {
  const index = Array.from(event.target.parentNode.children).indexOf(event.target);
  if (plansza[index] !== null) {
    return;
  }
  plansza[index] = aktualny_gracz;
  Tablica();
  if (czy_wygana(aktualny_gracz)) {
    alert(`${aktualny_gracz} wygrał!`);
    Reset();
    return;
  }
  if (!plansza.includes(null)) {
    alert('Remis!');
    Reset();
    return;
  }
  aktualny_gracz = aktualny_gracz === 'X' ? 'O' : 'X';
  if (tryb === 'jeden' && aktualny_gracz === 'O') {
    setTimeout(NPC, 500);
  }
}

// funkcja wykonywana, gdy gra jest w trybie jednoosobowym i ruch wykonuje komputer
function NPC() {
  const emptyCells = plansza.reduce((acc, value, index) => {
    if (value === null) {
      acc.push(index);
    }
    return acc;
  }, []);
  const Random = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  plansza[Random] = aktualny_gracz;
  Tablica();
  if (czy_wygana(aktualny_gracz)) {
    alert(`${aktualny_gracz} wygrał!`);
    Reset();
    return;
  }
  if (!plansza.includes(null)) {
    alert('Remis!');
    Reset();
    return;
  }
  aktualny_gracz = 'X';
}

// funkcja resetująca planszę i zmienne gry
function Reset() {
    plansza.fill(null);
  Tablica();
  aktualny_gracz = 'X';
}

// dodajemy obsługę kliknięcia na przycisk "Uruchom grę"
const Przycisk_Start = document.getElementById('start-game');
Przycisk_Start.addEventListener('click', () => {
  tryb = document.querySelector('input[name="tryb"]:checked').id;
  Tablica();
});

// dodajemy obsługę kliknięcia na pola planszy
const komórka = document.querySelectorAll('.komórka');
komórka.forEach(komórka => {
    komórka.addEventListener('click', kliknięcie);
});
