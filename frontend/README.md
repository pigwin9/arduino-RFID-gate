
# Arduino RFID Gate

System bramki RFID zbudowany przy użyciu Arduino, Node.js i Next.js.

## 🧩 Opis projektu

Projekt umożliwia sterowanie bramką RFID za pomocą karty/breloka, z rejestracją dostępu w bazie danych. Komunikacja z Arduino odbywa się przez port szeregowy. System składa się z dwóch części:

- **Backend** – obsługuje komunikację z Arduino oraz zapis do bazy danych.
- **Frontend** – aplikacja webowa umożliwiająca przeglądanie historii wejść i konfigurację systemu.

## 📦 Struktura katalogów

```
arduino-RFID-gate-main/
├── backend/      # Node.js API + obsługa portu szeregowego + baza danych
└── frontend/     # Next.js frontend
```

---

## ⚙️ Wymagania

### Sprzęt
- Arduino z modułem RFID (np. RC522)
- Czytnik RFID + tagi/karty
- Komputer z Node.js

### Oprogramowanie
- Node.js v16+ (dla backendu i frontend)
- npm lub yarn
- MySQL lub MariaDB (do uruchomienia bazy danych z `arduino.sql`)

---

## 🚀 Uruchomienie

### Backend

```bash
cd backend
npm install
# Utwórz bazę danych i załaduj plik arduino.sql
node dbSetup.js  # opcjonalnie, jeśli baza wymaga inicjalizacji
node app.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Domyślnie frontend będzie dostępny pod `http://localhost:3000`.

---

## 📡 Komunikacja z Arduino

Backend nasłuchuje danych z portu szeregowego. Gdy odczyta kartę RFID, sprawdza jej ID w bazie danych, rejestruje zdarzenie i może otworzyć bramkę (poprzez sygnał na pin Arduino).

---

## 📚 Baza danych

Plik `arduino.sql` zawiera strukturę bazy danych, która przechowuje:
- użytkowników
- identyfikatory RFID
- logi dostępu

---

## 🛠 Autorzy i licencja

Projekt edukacyjny – autor nie ponosi odpowiedzialności za zastosowania komercyjne. Możesz dowolnie modyfikować kod w celach edukacyjnych.

---

## 📷 Zrzuty ekranu

Zrzuty dostępne w katalogu `backend/photos/`.
