from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(200), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    cars = db.relationship('Car', backref='owner', lazy=True)

    def to_json_user(self):
        return {
            "id": self.id,
            "username": self.username,
            "imgUrl": self.img_url,
            "gender": self.gender,
        }


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    available = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)



    def to_json_car_with_owner(self):
        return {
            "id": self.id,
            "model": self.model,
            "description": self.description,
            "available": self.available,
            "imgUrl": self.img_url,
            "price": self.price,
            "owner": {
                "id": self.owner_id,
                "username": self.owner.username,
                "imgUrl": self.owner.img_url,
            }
        }




