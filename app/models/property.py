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
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute(
                """INSERT INTO Property 
                   (PropertyTypeId, OwnerId, Number, Address, Area, ConstructionArea) 
                   VALUES (%s, %s, %s, %s, %s, %s) RETURNING Id""",
                (propertyTypeId, ownerId, number, address, area, constructionArea)
            )
            dbInstance.connection.commit()
            propertyId = cursor.fetchone()[0]
            return propertyId
        except Exception as e:
            print(f"Error al crear Property: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def getById(propertyId):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("SELECT * FROM Property WHERE Id = %s", (propertyId,))
            result = cursor.fetchone()
            return result
        except Exception as e:
            print(f"Error al obtener Property por Id: {e}")
        finally:
            cursor.close()

    @staticmethod
    def update(propertyId, propertyTypeId, ownerId, number, address, area, constructionArea):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute(
                """UPDATE Property 
                   SET PropertyTypeId = %s, OwnerId = %s, Number = %s, Address = %s, 
                       Area = %s, ConstructionArea = %s 
                   WHERE Id = %s""",
                (propertyTypeId, ownerId, number, address, area, constructionArea, propertyId)
            )
            dbInstance.connection.commit()
        except Exception as e:
            print(f"Error al actualizar Property: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def delete(propertyId):
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("DELETE FROM Property WHERE Id = %s", (propertyId,))
            dbInstance.connection.commit()
        except Exception as e:
            print(f"Error al eliminar Property: {e}")
            dbInstance.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def getAll():
        dbInstance = Database()
        cursor = dbInstance.get_cursor()
        try:
            cursor.execute("SELECT * FROM Property")
            results = cursor.fetchall()
            return results
        except Exception as e:
            print(f"Error al obtener todos los Properties: {e}")
        finally:
            cursor.close()



