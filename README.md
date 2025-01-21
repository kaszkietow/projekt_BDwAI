# ShareYourCar 🚜

### Jak uruchomić aplikację w Pycharm?

1. Sklonuj repozytorium z github:

```bash
git clone https://github.com/kaszkietow/ShareYourCar.git
```

2. Przejdz do folderu głownego projektu:

```bash
cd ShareYourCar
```

3. Przejdź do strony backendu:

```bash
cd backend
```

4. Zainstaluj wymagane repozytoria:

-   Na macOS i Linux:

```bash
pip3 install -r requirements.txt
```

-   Na Windows:

```bash
pip install -r requirements.txt
```

5. Przejdz do strony frontendu:

```bash
cd ../frontend
```

6. Zainstaluj potrzebne repozytoria:

```bash
npm install
```

7. Zbuduj frontend aplikacji:

```bash
npm run build
```

8. Przejdz do strony backendu:

```bash
cd ../backend
```

9. Uruchom aplikację Flask:

```bash
flask run --reload
```

10. Otwórz przeglądarkę i wpisz `http://localhost:3000/` żeby zobaczyć aplikację.
Backend działa na URL `http://Localhost:5000` warto skorzystać ze swaggera, który znajduje
sie na URL `http://localhost:5000/swagger`

