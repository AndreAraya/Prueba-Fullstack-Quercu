from flask import Flask
from controller.controller import Controller

app = Flask(__name__)

# Rutas para Owner
app.add_url_rule('/owners', 'getOwners', Controller.getOwners, methods=['GET'])
app.add_url_rule('/owners/<int:ownerId>', 'getOwner', Controller.getOwner, methods=['GET'])
app.add_url_rule('/owners', 'createOwner', Controller.createOwner, methods=['POST'])
app.add_url_rule('/owners/<int:ownerId>', 'updateOwner', Controller.updateOwner, methods=['PUT'])
app.add_url_rule('/owners/<int:ownerId>', 'deleteOwner', Controller.deleteOwner, methods=['DELETE'])

# Rutas para Property
app.add_url_rule('/properties', 'getProperties', Controller.getProperties, methods=['GET'])
app.add_url_rule('/properties/<int:propertyId>', 'getProperty', Controller.getProperty, methods=['GET'])
app.add_url_rule('/properties', 'createProperty', Controller.createProperty, methods=['POST'])
app.add_url_rule('/properties/<int:propertyId>', 'updateProperty', Controller.updateProperty, methods=['PUT'])
app.add_url_rule('/properties/<int:propertyId>', 'deleteProperty', Controller.deleteProperty, methods=['DELETE'])

# Rutas para PropertyType
app.add_url_rule('/propertyTypes', 'getPropertyTypes', Controller.getPropertyTypes, methods=['GET'])
app.add_url_rule('/propertyTypes/<int:propertyTypeId>', 'getPropertyType', Controller.getPropertyType, methods=['GET'])
app.add_url_rule('/propertyTypes', 'createPropertyType', Controller.createPropertyType, methods=['POST'])
app.add_url_rule('/propertyTypes/<int:propertyTypeId>', 'updatePropertyType', Controller.updatePropertyType, methods=['PUT'])
app.add_url_rule('/propertyTypes/<int:propertyTypeId>', 'deletePropertyType', Controller.deletePropertyType, methods=['DELETE'])

if __name__ == '__main__':
    app.run(debug=True)
