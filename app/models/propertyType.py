from database.db import Database

class PropertyType:
    def __init__(self, description):
        self.description = description

    @staticmethod
    def create(description):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute(
                "INSERT INTO PropertyType (Description) VALUES (%s) RETURNING Id", 
                (description,)
            )
            dbInstance.connection.commit()
            propertyTypeId = cursor.fetchone()[0]
            return propertyTypeId
        except Exception as e:
            print(f"Error al crear PropertyType: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def get(propertyTypeId):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("SELECT * FROM PropertyType WHERE Id = %s", (propertyTypeId,))
            result = cursor.fetchone()
            return result
        except Exception as e:
            print(f"Error al obtener PropertyType por Id: {e}")
        finally:
            cursor.close()

    @staticmethod
    def update(propertyTypeId, description):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute(
                "UPDATE PropertyType SET Description = %s WHERE Id = %s", 
                (description, propertyTypeId)
            )
            dbInstance.connection.commit()
        except Exception as e:
            print(f"Error al actualizar PropertyType: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def delete(propertyTypeId):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("DELETE FROM PropertyType WHERE Id = %s", (propertyTypeId,))
            dbInstance.connection.commit()
        except Exception as e:
            print(f"Error al eliminar PropertyType: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def getAll():
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("SELECT * FROM PropertyType")
            results = cursor.fetchall()
            return results
        except Exception as e:
            print(f"Error al obtener todos los PropertyTypes: {e}")
        finally:
            cursor.close()


