from flask import Flask, jsonify, request
from models import owner, property, propertyType

app = Flask(__name__)

class Controller:

    @staticmethod
    def getOwners():
        owners = owner.getAll()
        return jsonify(owners)

    @staticmethod
    def getOwner(ownerId):
        owner = owner.get(ownerId)
        if owner:
            return jsonify(owner)
        else:
            return jsonify({'message': 'Owner not found'}), 404

    @staticmethod
    def createOwner():
        data = request.get_json()
        newOwner = owner(name=data['name'], telephone=data['telephone'], email=data['email'], identificationNumber=data['identificationNumber'], address=data['address'])
        owner.createOwner(newOwner)
        return jsonify({'message': 'Owner created successfully'}), 201

    @staticmethod
    def updateOwner(ownerId):
        data = request.get_json()
        updatedOwner = owner.update(ownerId, data)
        if updatedOwner:
            return jsonify({'message': 'Owner updated successfully'})
        else:
            return jsonify({'message': 'Owner not found'}), 404

    @staticmethod
    def deleteOwner(ownerId):
        result = owner.delete(ownerId)
        if result:
            return jsonify({'message': 'Owner deleted successfully'})
        else:
            return jsonify({'message': 'Owner not found'}), 404

    @staticmethod
    def getProperties():
        properties = property.getAll()
        return jsonify(properties)

    @staticmethod
    def getProperty(propertyId):
        property = property.get(propertyId)
        if property:
            return jsonify(property)
        else:
            return jsonify({'message': 'Property not found'}), 404

    @staticmethod
    def createProperty():
        data = request.get_json()
        newProperty = property(propertyTypeId=data['propertyTypeId'], ownerId=data['ownerId'], number=data['number'], address=data['address'], area=data['area'], constructionArea=data['constructionArea'])
        property.create(newProperty)
        return jsonify({'message': 'Property created successfully'}), 201

    @staticmethod
    def updateProperty(propertyId):
        data = request.get_json()
        updatedProperty = property.update(propertyId, data)
        if updatedProperty:
            return jsonify({'message': 'Property updated successfully'})
        else:
            return jsonify({'message': 'Property not found'}), 404

    @staticmethod
    def deleteProperty(propertyId):
        result = property.delete(propertyId)
        if result:
            return jsonify({'message': 'Property deleted successfully'})
        else:
            return jsonify({'message': 'Property not found'}), 404

    @staticmethod
    def getPropertyTypes():
        propertyTypes = propertyType.getAll()
        return jsonify(propertyTypes)

    @staticmethod
    def getPropertyType(propertyTypeId):
        propertyType = propertyType.get(propertyTypeId)
        if propertyType:
            return jsonify(propertyType)
        else:
            return jsonify({'message': 'PropertyType not found'}), 404

    @staticmethod
    def createPropertyType():
        data = request.get_json()
        newPropertyType = propertyType(description=data['description'])
        propertyType.create(newPropertyType)
        return jsonify({'message': 'PropertyType created successfully'}), 201

    @staticmethod
    def updatePropertyType(propertyTypeId):
        data = request.get_json()
        updatedPropertyType = propertyType.update(propertyTypeId, data)
        if updatedPropertyType:
            return jsonify({'message': 'PropertyType updated successfully'})
        else:
            return jsonify({'message': 'PropertyType not found'}), 404

    @staticmethod
    def deletePropertyType(propertyTypeId):
        result = propertyType.delete(propertyTypeId)
        if result:
            return jsonify({'message': 'PropertyType deleted successfully'})
        else:
            return jsonify({'message': 'PropertyType not found'}), 404


