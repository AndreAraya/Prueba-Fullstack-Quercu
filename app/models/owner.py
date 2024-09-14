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
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute(
                """INSERT INTO Owner (Name, Telephone, Email, IdentificationNumber, Address) 
                   VALUES (%s, %s, %s, %s, %s) RETURNING Id""",
                (name, telephone, email, identificationNumber, address)
            )
            dbInstance.connection.commit()
            ownerId = cursor.fetchone()[0]
            return ownerId
        except Exception as e:
            print(f"Error al crear Owner: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def getById(ownerId):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("SELECT * FROM Owner WHERE Id = %s", (ownerId,))
            result = cursor.fetchone()
            return result
        except Exception as e:
            print(f"Error al obtener Owner por Id: {e}")
        finally:
            cursor.close()

    @staticmethod
    def update(ownerId, name, telephone, email, identificationNumber, address):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute(
                """UPDATE Owner 
                   SET Name = %s, Telephone = %s, Email = %s, IdentificationNumber = %s, Address = %s 
                   WHERE Id = %s""",
                (name, telephone, email, identificationNumber, address, ownerId)
            )
            dbInstance.connection.commit()
        except Exception as e:
            print(f"Error al actualizar Owner: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def delete(ownerId):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("DELETE FROM Owner WHERE Id = %s", (ownerId,))
            dbInstance.connection.commit()
        except Exception as e:
            print(f"Error al eliminar Owner: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def getAll():
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("SELECT * FROM Owner")
            results = cursor.fetchall()
            return results
        except Exception as e:
            print(f"Error al obtener todos los Owners: {e}")
        finally:
            cursor.close()

