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

4.Upewnij się, że masz venv w folderze backend jeśli nie to utwórz. 

5. Zainstaluj wymagane repozytoria:

-   Na macOS i Linux:

```bash
pip3 install -r requirements.txt
```

-   Na Windows:

```bash
pip install -r requirements.txt
```

6. Przejdz do strony frontendu:

```bash
cd ../frontend
```

7. Zainstaluj potrzebne repozytoria:

```bash
npm install
```

8. Zbuduj frontend aplikacji:

```bash
npm run build
```

9. Przejdz do strony backendu:

```bash
cd ../backend
```

10. Uruchom aplikację Flask:

```bash
flask run --reload
```

11. Otwórz przeglądarkę i wpisz `http://localhost:3000/` żeby zobaczyć aplikację.
Backend działa na URL `http://Localhost:5000` warto skorzystać ze swaggera, który znajduje
sie na URL `http://localhost:5000/swagger`

