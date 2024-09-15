from flask import Flask, jsonify, request
from models.owner import Owner
from models.property import Property
from models.propertyType import PropertyType

app = Flask(__name__)

class Controller:

    @staticmethod
    def getOwners():
        owners = Owner.getAll()
        return jsonify(owners)

    @staticmethod
    def getOwner(ownerId):
        owner = Owner.get(ownerId)
        if owner:
            return jsonify(owner)
        else:
            return jsonify({'message': 'Owner not found'}), 404

    @staticmethod
    def createOwner():
        data = request.get_json()
        newOwner = Owner(name=data['name'], telephone=data['telephone'], email=data['email'], identificationNumber=data['identificationNumber'], address=data['address'])
        Owner.createOwner(newOwner)
        return jsonify({'message': 'Owner created successfully'}), 201

    @staticmethod
    def updateOwner(ownerId):
        data = request.get_json()
        updatedOwner = Owner.update(ownerId, data)
        if updatedOwner:
            return jsonify({'message': 'Owner updated successfully'})
        else:
            return jsonify({'message': 'Owner not found'}), 404

    @staticmethod
    def deleteOwner(ownerId):
        result = Owner.delete(ownerId)
        if result:
            return jsonify({'message': 'Owner deleted successfully'})
        else:
            return jsonify({'message': 'Owner not found'}), 404

    @staticmethod
    def getProperties():
        properties = Property.getAll()
        return jsonify(properties)

    @staticmethod
    def getProperty(propertyId):
        property = Property.getById(propertyId)
        if property:
            return jsonify(property)
        else:
            return jsonify({'message': 'Property not found'}), 404

    @staticmethod
    def createProperty():
        data = request.get_json()

        propertyTypeId = data['propertyTypeId']
        ownerId = data['ownerId']
        number = data['number']
        address = data['address']
        area = data['area']
        constructionArea = data.get('constructionArea')
        
        Property.create(propertyTypeId, ownerId, number, address, area, constructionArea)
        return jsonify({'message': 'Property created successfully'}), 201

    @staticmethod
    def updateProperty(propertyId):
        data = request.get_json()
        if not data or 'propertyTypeId' not in data or 'ownerId' not in data or 'number' not in data or 'address' not in data or 'area' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        propertyTypeId = data['propertyTypeId']
        ownerId = data['ownerId']
        number = data['number']
        address = data['address']
        area = data['area']
        constructionArea = data.get('constructionArea')
        updatedProperty = Property.update(propertyId, propertyTypeId, ownerId, number, address, area, constructionArea)
        if updatedProperty:
            return jsonify({'message': 'Property updated successfully'})
        else:
            return jsonify({'message': 'Property not found'}), 404

    @staticmethod
    def deleteProperty(propertyId):
        result = Property.delete(propertyId)
        if result:
            return jsonify({'message': 'Property deleted successfully'})
        else:
            return jsonify({'message': 'Property not found'}), 404

    @staticmethod
    def getPropertyTypes():
        propertyTypes = PropertyType.getAll()
        return jsonify(propertyTypes)

    @staticmethod
    def getPropertyType(propertyTypeId):
        propertyType = PropertyType.get(propertyTypeId)
        if propertyType:
            return jsonify(propertyType)
        else:
            return jsonify({'message': 'PropertyType not found'}), 404

    @staticmethod
    def createPropertyType():
        data = request.get_json()
        newPropertyType = PropertyType(description=data['description'])
        PropertyType.create(newPropertyType)
        return jsonify({'message': 'PropertyType created successfully'}), 201

    @staticmethod
    def updatePropertyType(propertyTypeId):
        data = request.get_json()
        updatedPropertyType = PropertyType.update(propertyTypeId, data)
        if updatedPropertyType:
            return jsonify({'message': 'PropertyType updated successfully'})
        else:
            return jsonify({'message': 'PropertyType not found'}), 404

    @staticmethod
    def deletePropertyType(propertyTypeId):
        result = PropertyType.delete(propertyTypeId)
        if result:
            return jsonify({'message': 'PropertyType deleted successfully'})
        else:
            return jsonify({'message': 'PropertyType not found'}), 404


