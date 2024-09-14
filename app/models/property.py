from database.db import Database

class Property:
    def __init__(self, propertyTypeId, ownerId, number, address, area, constructionArea):
        self.propertyTypeId = propertyTypeId
        self.ownerId = ownerId
        self.number = number
        self.address = address
        self.area = area
        self.constructionArea = constructionArea

    @staticmethod
    def create(propertyTypeId, ownerId, number, address, area, constructionArea):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute(
            """INSERT INTO Property 
               (PropertyTypeId, OwnerId, Number, Address, Area, ConstructionArea) 
               VALUES (%s, %s, %s, %s, %s, %s) RETURNING Id""",
            (propertyTypeId, ownerId, number, address, area, constructionArea)
        )
        dbInstance.connection.commit()
        propertyId = cursor.fetchone()[0]
        dbInstance.disconnect()
        return propertyId

    @staticmethod
    def getById(propertyId):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("SELECT * FROM Property WHERE Id = %s", (propertyId,))
        result = cursor.fetchone()
        dbInstance.disconnect()
        return result

    @staticmethod
    def update(propertyId, propertyTypeId, ownerId, number, address, area, constructionArea):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute(
            """UPDATE Property 
               SET PropertyTypeId = %s, OwnerId = %s, Number = %s, Address = %s, 
                   Area = %s, ConstructionArea = %s 
               WHERE Id = %s""",
            (propertyTypeId, ownerId, number, address, area, constructionArea, propertyId)
        )
        dbInstance.connection.commit()
        dbInstance.disconnect()

    @staticmethod
    def delete(propertyId):
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("DELETE FROM Property WHERE Id = %s", (propertyId,))
        dbInstance.connection.commit()
        dbInstance.disconnect()

    @staticmethod
    def getAll():
        dbInstance = Database()
        dbInstance.connect()
        cursor = dbInstance.cursor
        cursor.execute("SELECT * FROM Property")
        results = cursor.fetchall()
        dbInstance.disconnect()
        return results

