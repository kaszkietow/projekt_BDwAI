from app import app, db
from flask import request, jsonify, Flask, redirect, send_from_directory
from models import Car, User
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_swagger_ui import get_swaggerui_blueprint

app.config['JWT_SECRET_KEY'] = 'A6BF4B5839CA8C4F7872DE2F854BE'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600
jwt = JWTManager(app)
app.config["JWT_VERIFY_SUB"] = False

# Get all cars
@app.route("/api/cars", methods=["GET"])
@jwt_required()
def get_cars():
    try:
        cars = Car.query.all()  # Pobierz wszystkie samochody z bazy danych
        cars_json = [car.to_json_car_with_owner() for car in cars]  # Serializuj samochody
        return jsonify(cars_json), 200
    except Exception as e:
        print(f"Error fetching cars: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


# Add new card
@app.route("/api/cars", methods=["POST"])
@jwt_required()
def create_car():
    try:
        data = request.json
        print(f"Received data: {data}")  # Logowanie danych wejściowych
        required_fields = ["model", "description", "available", "img_url", "price"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        id = data.get("id")
        model = data.get("model")
        description = data.get("description")
        available = data.get("available")
        img_url = data.get("img_url")
        price = data.get("price")
        owner_id = data.get("owner_id")

        new_car = Car(
            id=id, model=model, description=description,
            available=available, img_url=img_url, price=price, owner_id=owner_id
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify(new_car.to_json_car_with_owner()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")  # Logowanie błędów
        return jsonify({"error": str(e)}), 500


# Delete car
@app.route("/api/cars/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_car(id):
    try:
        car = Car.query.get(id)
        if car is None:
            return jsonify({"error": "Car doen't exist"}), 404
        db.session.delete(car)
        db.session.commit()
        return jsonify({"message": "Car deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/api/cars/<int:id>", methods=["PATCH"])
@jwt_required()
def update_car(id):
    try:
        car = Car.query.get(id)
        if car is None:
            return jsonify({"error": "Car not found"}), 404

        data = request.json

        car.model = data.get("model", car.model)
        car.description = data.get("description", car.description)
        car.available = data.get("available", car.available)
        car.img_url = data.get("img_url", car.img_url)
        car.price = data.get("price", car.price)

        db.session.commit()
        return jsonify(car.to_json_car_with_owner()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/api/users", methods=["GET"])
# @jwt_required()
def get_users():
    users = User.query.all()
    result = [user.to_json_user() for user in users]
    return jsonify(result)


@app.route("/api/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()

        # Walidacja wymaganych pól
        required_fields = ["username", "password", "gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        username = data.get("username")
        password = data.get("password")
        gender = data.get("gender")

        # Walidacja długości nazwy użytkownika
        if not username or len(username.strip()) < 3:
            return jsonify({"error": "Username must be at least 3 characters long"}), 400

        # Walidacja hasła
        if not password or len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters long"}), 400

        # Walidacja płci
        if gender not in ["male", "female"]:
            return jsonify({"error": "Gender must be either 'male' or 'female'"}), 400

        # Sprawdzenie, czy użytkownik już istnieje
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        # Generowanie URL avatara na podstawie płci
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={username}"
        else:
            img_url = f"https://avatar.iran.liara.run/public/girl?username={username}"

        # Tworzenie nowego użytkownika
        new_user = User(username=username, password=password, gender=gender, img_url=img_url)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



@app.route("/api/users/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    try:
        user = User.query.get(id)
        if user is None:
            return jsonify({"error": "User doesn't exist"}), 404
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/<int:id>", methods=["PATCH"])
@jwt_required()
def update_user(id):
    try:
        user = User.query.get(id)
        if user is None:
            return jsonify({"error": "User not found"}), 404

        data = request.json

        user.username = data.get("username", user.username)
        user.password = data.get("password", user.password)
        user.img_url = data.get("img_url", user.img_url)

        db.session.commit()
        return jsonify(user.to_json_user()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login_user():
    try:
        # Pobierz dane logowania z żądania
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # Znajdź użytkownika w bazie danych
        user = User.query.filter_by(username=username).first()

        # Sprawdź poprawność hasła (uwaga: lepiej użyć hashowania, np. bcrypt)
        if user and user.password == password:
            # Tworzenie tokena z identyfikatorem użytkownika
            access_token = create_access_token(identity={"id": user.id, "username": user.username})

            # Zwróć token w odpowiedzi
            return jsonify({"access_token": access_token}), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


blacklist = set()


@app.route("/logout", methods=["POST"])
@jwt_required()
def logout_user():
    jti = get_jwt()["jti"]  # JTI to unikalny identyfikator tokena
    blacklist.add(jti)
    return jsonify({"message": "Logged out successfully"}), 200


@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in blacklist


@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    try:
        # Pobierz cały obiekt `sub` z tokena
        user_identity = get_jwt_identity()
        user_id = user_identity["id"]
        user = User.query.get(user_id)
        user_json = user.to_json_user()
        # Zwrot danych użytkownika (dostosuj według potrzeb)
        return jsonify(user_json), 200
    except Exception as e:
        print(f"Error fetching currentUser: {e}")
        return jsonify({"error": "Internal Server Error"}), 500



