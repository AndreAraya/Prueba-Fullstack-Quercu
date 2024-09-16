import psycopg2
from psycopg2 import Error

class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.connection = None
            cls._instance.cursor = None
        return cls._instance

    def connect(self):
        if self.connection is None:
            try:
                self.connection = psycopg2.connect(
                    host='bd-prueba-quercu-prueba-quercu.i.aivencloud.com',
                    user='avnadmin',
                    port= '19642',
                    password='AVNS_jKJCQ2A0F3AviUmz5d8',
                    database='defaultdb'
                )
                self.cursor = self.connection.cursor()
                print("Conexión a MySQL exitosa")
            except Error as e:
                print(f"Error al conectar a PostgreSQL: {e}")

    def disconnect(self):
        if self.connection:
            if self.cursor: #Se añadio para que no se cierre el cursor
                self.cursor.close()
            self.connection.close()
            print("Conexión cerrada")
            
    def get_cursor(self):
        if not self.connection:
            self.connect()
        return self.connection.cursor()

    def create_tables(self):
        try:
            create_tables_query = '''
            CREATE TABLE IF NOT EXISTS PropertyType (
                Id SERIAL PRIMARY KEY,
                Description VARCHAR(255) NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS Owner (
                Id SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                Telephone VARCHAR(255) NOT NULL,
                Email VARCHAR(255),
                IdentificationNumber VARCHAR(255) NOT NULL,
                Address VARCHAR(255)
            );

            CREATE TABLE IF NOT EXISTS Property (
                Id SERIAL PRIMARY KEY,
                PropertyTypeId INTEGER REFERENCES PropertyType(Id),
                OwnerId INTEGER REFERENCES Owner(Id),
                Number VARCHAR(255) NOT NULL,
                Address VARCHAR(255) NOT NULL,
                Area DECIMAL NOT NULL,
                ConstructionArea DECIMAL
            );
            '''
            cursor = self.get_cursor()
            cursor.execute(create_tables_query)
            self.connection.commit()
            print("Tablas creadas correctamente")
        except Error as e:
            print(f"Error al crear las tablas: {e}")
        finally:
            if cursor:
                cursor.close()

# Uso del singleton para la conexión y creación de tablas
def main():
    dbInstance = Database()
    dbInstance.connect()
    dbInstance.createTables()  # Crear las tablas
    dbInstance.disconnect()

if __name__ == "__main__":
    main()