from database.db import Database

class Owner:
    def __init__(self, name, telephone, email, identificationNumber, address):
        self.name = name
        self.telephone = telephone
        self.email = email
        self.identificationNumber = identificationNumber
        self.address = address

    @staticmethod
    def create(name, telephone, email, identificationNumber, address):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute(
            """INSERT INTO Owner (Name, Telephone, Email, IdentificationNumber, Address) 
               VALUES (%s, %s, %s, %s, %s) RETURNING Id""", 
            (name, telephone, email, identificationNumber, address)
        )
        dbInstance.connection.commit()
        ownerId = cursor.fetchone()[0]
        dbInstance.disconnect()
        return ownerId

    @staticmethod
    def getById(ownerId):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("SELECT * FROM Owner WHERE Id = %s", (ownerId,))
        result = cursor.fetchone()
        dbInstance.disconnect()
        return result

    @staticmethod
    def update(ownerId, name, telephone, email, identificationNumber, address):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute(
            """UPDATE Owner 
               SET Name = %s, Telephone = %s, Email = %s, IdentificationNumber = %s, Address = %s 
               WHERE Id = %s""", 
            (name, telephone, email, identificationNumber, address, ownerId)
        )
        dbInstance.connection.commit()
        dbInstance.disconnect()

    @staticmethod
    def delete(ownerId):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("DELETE FROM Owner WHERE Id = %s", (ownerId,))
        dbInstance.connection.commit()
        dbInstance.disconnect()

    @staticmethod
    def getAll():
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("SELECT * FROM Owner")
        results = cursor.fetchall()
        dbInstance.disconnect()
        return results
