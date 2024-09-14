from database.db import Database

class PropertyType:
    def __init__(self, description):
        self.description = description

    @staticmethod
    def create(description):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute(
            "INSERT INTO PropertyType (Description) VALUES (%s) RETURNING Id", 
            (description,)
        )
        dbInstance.connection.commit()
        propertyTypeId = cursor.fetchone()[0]
        dbInstance.disconnect()
        return propertyTypeId

    @staticmethod
    def get(propertyTypeId):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("SELECT * FROM PropertyType WHERE Id = %s", (propertyTypeId,))
        result = cursor.fetchone()
        dbInstance.disconnect()
        return result

    @staticmethod
    def update(propertyTypeId, description):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute(
            "UPDATE PropertyType SET Description = %s WHERE Id = %s", 
            (description, propertyTypeId)
        )
        dbInstance.connection.commit()
        dbInstance.disconnect()

    @staticmethod
    def delete(propertyTypeId):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("DELETE FROM PropertyType WHERE Id = %s", (propertyTypeId,))
        dbInstance.connection.commit()
        dbInstance.disconnect()

    @staticmethod
    def getAll():
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("SELECT * FROM PropertyType")
        results = cursor.fetchall()
        dbInstance.disconnect()
        return results

